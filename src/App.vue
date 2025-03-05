<template>
  <div class="w-screen">
    <header class="text-white py-4">
      <div class="wrapper" >

      <nav class="">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/events" class="mr-4">Events</RouterLink>
        <RouterLink to="/auth" class="mr-4">Auth</RouterLink>
        <RouterLink to="/admin" class="mr-4">Admin</RouterLink>

        <!-- RouterLink to products, Auth, Admin & and logout button -->


        <!-- toggle cart button -->


        <!-- Routerlink to orders -->

      </nav>
    </div>
  </header>


<RouterView />

<!-- CartBasket component -->
</div>

</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
