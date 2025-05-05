<script setup>
import Topbar from './components/Topbar.vue'
import Sidebar from './components/Sidebar.vue'
import MainLayout from './components/MainLayout.vue'
import WeatherCard from './components/WeatherCard.vue'
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <MainLayout>
    <Topbar />
    <Sidebar />
    <WeatherCard />
    <LoginForm />
  </MainLayout>
</template>
