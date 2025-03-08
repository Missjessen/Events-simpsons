<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-4">Upcoming Events</h2>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else class="flex flex-wrap -mx-2">
      <div v-for="event in events" :key="event._id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <img :src="event.imageURL" alt="Event Image" class="w-full h-48 object-cover mb-4 rounded-lg">
          <h3 class="text-lg text-gray-700 font-semibold mb-2"> {{ event.title }} </h3>
          <p> class="text-gray-500 text-sm mb-2"> 📅 {{ formatDate(event.date) }} </p>
          <p class="text-gray-700"> 📍 {{ event.eventlocation }} </p>
          <p class="text-gray-600 mt-2"> {{ event.description }} </p>
          <p class="text-blue-500 font-bold mt-2">Max Attendees: {{ event.maxAttendees }} </p>
          
          <div class="flex justify-between mt-4">
            <button class="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600">View Details</button>
            <button class="bg-red-500 text-white px-1 py-2 rounded hover:bg-red-600" @click="deleteEvent(event._id)">Delete</button> <!-- Brug _id i stedet for title -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEvents } from '../modules/useEvents';

const { events, fetchEvents, loading, error, deleteEvent } = useEvents();

onMounted(() => {
  fetchEvents();
});

// Format dato til pæn visning
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<style scoped>
</style>
