<template>
  <div class="hero">
    <img src="/src/assets/img/hero.jpg" alt="Simpsons Image" class="hero-image">
    <div class="hero-text">
      <h1 class="text-6xl font-simpsons text-yellow-500">Velkommen til Simpsons Events!</h1>
      <p class="text-white text-2xl">Find de fedeste events i Springfield!</p>
      <button @click="goToEvents" class="mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition">
        Gå til Events
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToEvents() {
  router.push('/events');
}
</script>

<style scoped>
@font-face {
  font-family: 'SimpsonsFont';
  src: url('/src/assets/fonts/simpsons.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('/src/assets/img/hero.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  overflow: hidden;

}

.hero-image {
  max-width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-text {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
  padding: 0 20px;
}

.font-simpsons {
  font-family: 'SimpsonsFont', sans-serif;
}
</style>
