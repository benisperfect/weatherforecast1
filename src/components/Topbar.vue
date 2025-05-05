<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const TopBarRef = ref(null)
const ScrollToTop = () => {
    TopBarRef.value.style.top = -window.scrollY + 'px';
  }

onMounted(() => {
    window.addEventListener('scroll', ScrollToTop);
  });

onBeforeUnmount(() => {
    window.removeEventListener('scroll', ScrollToTop);
  })

</script>
<template>
    <div ref="TopBarRef" class="topbar" id="topbar"></div>
</template>
