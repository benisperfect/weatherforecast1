<script setup>
import Topbar from './components/Topbar.vue'
import MainLayout from './components/MainLayout.vue'
import WeatherCard from './components/WeatherCard.vue'
import LoginForm from './components/LoginScreen&MainScreen.vue'
</script>

<template>
  <MainLayout>
    <Topbar />
    <WeatherCard />
    <LoginForm />
  </MainLayout>
</template>
