<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin - Manage Events</h1>

    <div v-if="loading" class="text-center">Loading...</div> <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div> <!-- Error message -->

    <!-- Add Event Form -->
    <div class="my-8 p-2 w-full">
      <h2 class="text-2xl font-semibold mb-4">Add Event</h2>
      <form @submit.prevent="addEventHandler">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="newEvent.title" placeholder="Event Title" class="p-2 border rounded" required />
          <input type="date" v-model="newEvent.date" class="p-2 border rounded" required />
          <input type="text" v-model="newEvent.eventlocation" placeholder="Location" class="p-2 border rounded" required />
          <textarea v-model="newEvent.description" placeholder="Description" class="p-2 border rounded" required></textarea>
          <input type="number" v-model="newEvent.maxAttendees" placeholder="Max Attendees" class="p-2 border rounded" required />

          <!-- Image Upload -->
          <input type="file" @change="handleFileUpload" class="file-input">
          <button type="button" @click="uploadImage" class="btn">Upload Image</button>

          <!-- Preview uploaded image -->
          <div v-if="newEvent.imageURL">
            <p>Uploaded Image:</p>
            <img :src="newEvent.imageURL" alt="Uploaded Image" class="preview">
          </div>
        </div>
        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create Event</button>
      </form>
    </div>

    <!-- Event List -->
    <div class="my-8 p-2 w-full">
      <h2 class="text-2xl font-semibold mb-4">Events</h2>
      <div class="mb-4 p-4 border rounded bg-[#181818]" v-for="event in events" :key="event._id">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="event.title" placeholder="Event Title" class="p-2 border rounded" />
          <input type="date" v-model="event.date" class="p-2 border rounded" />
          <input type="text" v-model="event.eventlocation" placeholder="Location" class="p-2 border rounded" />
          <textarea v-model="event.description" placeholder="Description" class="p-2 border rounded"></textarea>
          <input type="number" v-model="event.maxAttendees" placeholder="Max Attendees" class="p-2 border rounded" />

          <!-- Image URL -->
          <input type="text" v-model="event.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" />
          <div>
            <p>Thumbnail:</p>
            <img :src="event.imageURL" alt="Event Image" class="h-24 w-24 object-cover mb-4 rounded-lg">
          </div>
        </div>

        <!-- Delete Button -->
        <div class="mt-4 flex space-x-2">
          <button @click="deleteEvent(event._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEvents } from '../../modules/useEvents';


const { events, fetchEvents, addEvent, deleteEvent, error, loading } = useEvents();


const newEvent = ref({
  title: '',
  date: '',
  eventlocation: '',
  description: '',
  maxAttendees: 100,
  imageURL: '' // Updated after file upload
});

function formatDate(dateString: string) {
    if (!dateString) return '';  // Håndter tomme datoer

    // Hvis formatet allerede er korrekt (yyyy-MM-dd), returner det direkte
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }

    const date = new Date(dateString);

    // Tjek om datoen er gyldig
    if (isNaN(date.getTime())) {
        console.error('Ugyldig dato:', dateString);
        return '';
    }

    return date.toISOString().split('T')[0];
}

const addEventHandler = async () => {
    const formattedDate = formatDate(newEvent.value.date); // Konverter datoformat

    await addEvent({
        ...newEvent.value,
        date: formattedDate  // Brug det formaterede datoformat
    });

    newEvent.value = {
        title: '',
        date: '',
        eventlocation: '',
        description: '',
        maxAttendees: 100,
        imageURL: ''
    };

    await fetchEvents();
};

onMounted(() => {
  fetchEvents();
});


const file = ref<File | null>(null);

const handleFileUpload = (event: Event) => {

  const target = event.target as HTMLInputElement;
    if (target.files?.length) {
        file.value = target.files[0];
    }
};

const uploadImage = async () => {
    if (!file.value) {
        alert('Vælg en fil først!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('upload_preset', 'events_preset');
    formData.append('folder', 'events');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dwag6rqjf/image/upload', {
            method: 'POST',
            body: formData,
            mode: 'cors'
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Cloudinary returnerede ikke JSON. Tjek endpointet.');
        }

        const data = await response.json();

        if (data.secure_url) {
            newEvent.value.imageURL = data.secure_url;
            console.log('✅ Event oprettet med billede:', newEvent.value.imageURL);
        } else {
            console.error('❌ Fejl ved upload:', data);
            alert('Fejl ved upload: ' + data.error.message);
        }
    } catch (error) {
        console.error('❌ Upload fejlede:', error);
        alert('Fejl ved upload. Prøv igen.');
    }
};


</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.event-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-field, .file-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btn {
  padding: 10px;
  background-color: blue;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.btn-primary {
  background-color: green;
}
.btn-danger {
  background-color: red;
  color: white;
}
.preview {
  width: 100px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.event-card {
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.event-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
