<template>
  <div class="hero">
    <!-- Hero baggrund -->
    <!-- //<img src="/assets/img/simpsons-fox.jpg" alt="Simpsons Hero" class="hero-image"> -->

    <!-- Login/Register Card -->
    <div class="card">
      <p class="text-2xl mb-4">Login / Logout</p>
      <input type="text" class="input-field" placeholder="Email" v-model="email" />
      <input type="password" class="input-field" placeholder="Password" v-model="password" />
      <button class="btn-primary" @click="fetchToken(email, password)">Login</button>
      <button class="btn-secondary" @click="logout()">Logout</button>

      <!-- Register -->
      <div class="register-block">
        <p class="text-xl mt-6 cursor-pointer underline" @click="toggleRegisterDialog">Click to register</p>
        <dialog ref="registerDialog">
          <form class="register-form">
            <input type="text" class="input-field" placeholder="Name" v-model="name" />
            <input type="text" class="input-field" placeholder="Email" v-model="email" />
            <input type="password" class="input-field" placeholder="Password" v-model="password" />
            <button class="btn-success" @click.prevent="registerUser(name, email, password)">Register</button>
          </form>
          <button class="btn-danger" @click="toggleRegisterDialog">Close</button>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '../../modules/auth/useUser'


const { fetchToken, registerUser, logout, name, email, password, user} = useUser()

console.log("user sstuff: ", user)

const registerDialog = ref<HTMLDialogElement | null>(null)

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    if (registerDialog.value.open) {
      registerDialog.value.close()
    } else {
      registerDialog.value.show()
    }
  }
}
</script>

<style scoped>
/* Hero Styling */
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('/src/assets/img/simpsons-fox.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

/* Hero Billede */
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Card Container */
.card {
  background-color: rgba(24, 24, 24, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

/* Input-felter */
.input-field {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border: 1px solid #666;
  border-radius: 5px;
  background: #222;
  color: white;
  outline: none;
}

/* Knapper */
.btn-primary {
  background-color: #1E40AF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #1E3A8A;
}

.btn-secondary {
  background-color: #4B5563;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.btn-secondary:hover {
  background-color: #374151;
}

.btn-success {
  background-color: #10B981;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.btn-success:hover {
  background-color: #059669;
}

.btn-danger {
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.btn-danger:hover {
  background-color: darkred;
}

/* Register Dialog */
dialog {
  background-color: #181818;
  border-left: 1px solid #9CA3AF;
  padding: 1rem;
  position: absolute;
  top: 8rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

dialog[open] {
  opacity: 1;
  pointer-events: inherit;
}

dialog::backdrop {
  background-color: rgba(0, 0, 255, 0.2);
}
</style>
