import { format, parseISO, isValid } from 'date-fns';
import { ref } from 'vue';
import type { Event } from '../interfaces/interfaces';

export const useEvents = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const events = ref<Event[]>([]);
  //const DATE_FORMAT_API = 'YYYY-MM-DDTHH:mm:ss';  // ISO 8601 uden 'Z'


  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch events
    // 🔹 Fetch events
    const fetchEvents = async (): Promise<void> => {
      loading.value = true;
      try {
          const response = await fetch(`${API_URL}/events`);
          const data: Event[] = await response.json();

          events.value = data.map(event => ({
            ...event,
            date: formatDateTimeForInput(typeof event.date === 'string' ? event.date : event.date.toISOString())
        }));

          console.log("Event Dates:", data.map(event => event.date));
          console.log("Events fetched", events.value);
      } catch (err) {
          error.value = (err as Error).message;
      } finally {
          loading.value = false;
      }
    };



    // 🚀 Konverter ISO 8601 til 'YYYY-MM-DDTHH:mm'
    const formatDateTimeForInput = (isoDate: string | null | undefined): string => {
      if (!isoDate) return '';

      const date = parseISO(isoDate); // Brug `parseISO` for at undgå fejl ved forskellige formater

      if (!isValid(date)) {
          console.error(`❌ Ugyldig dato modtaget: ${isoDate}`);
          return '';
      }

      return format(date, "yyyy-MM-dd");  // Returnerer dato i formatet til 'datetime-local'
  };


  // Get Token & User ID
  const getTokenAndUserId = (): { token: string; userId: string } => {
    const token = localStorage.getItem('lsToken');
    const userId = localStorage.getItem('userIDToken');

    if (!token) {
      throw new Error('No token available');
    }
    if (!userId) {
      throw new Error('No userId available');
    }
    return { token, userId };
  };

  // Validate event
  const validateEvent = (event: Partial<Event>): void => {
    if (!event.title) {
      throw new Error('Title is required');
    }
    if (!event.date) {
      throw new Error('Date is required');
    }
    if (!event.eventlocation) {
      throw new Error('Location is required');
    }
  };

  // Set Default Values
  const setDefaultValues = (event: Partial<Event>, userId: string): Event => {
    return {
      _id: event._id || crypto.randomUUID(),
      title: event.title!,
      date: event.date || new Date(),
      eventlocation: event.eventlocation || 'Unknown Location',
      description: event.description || 'No description provided',
      maxAttendees: event.maxAttendees || 100,
      attendees: event.attendees || '',
      imageURL: event.imageURL || 'https://picsum.photos/500/300',
      _createdBy: userId
    };
  };

  // Add an event
  const addEvent = async (event: Partial<Event>): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      validateEvent(event);
      const eventWithDefaults = setDefaultValues(event, userId);

      const response = await fetch(`${API_URL}events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(eventWithDefaults)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'No data available');
      }

      const newEvent: Event = await response.json();
      events.value.push(newEvent);
      console.log("Event added", newEvent);
      await fetchEvents();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  // Delete event from server
  const deleteEventFromServer = async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token
      }
    });

    if (!response.ok) {
      throw new Error('No data available');
    }
  };

  // Remove event from local state
  const removeEventFromState = (id: string): void => {
    events.value = events.value.filter(event => event._id !== id);
    console.log("Event deleted", id);
  };

  // Delete an event
  const deleteEvent = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      await deleteEventFromServer(id, token);
      removeEventFromState(id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  return { error, loading, events, fetchEvents, deleteEvent, addEvent, getTokenAndUserId };
};
