<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const menuButton = ref(null);
const sidebar = ref(null);
const isSidebarVisible = ref(true);
const darklight = ref(null);  //"./image/interactive_btn/nighticon.png";
const mainscreen = ref(null);
const profileText = ref(null);
const sidebarpic = ref(null);  //'./image/interactive_btn/menu-dark.png';
const isDark = ref(true);

const RotateAndShowMenuSideBar = () => {
    if (menuButton.value.style.transform === "rotate(90deg)") {
        menuButton.value.style.transition = "transform 0.3s ease";
        menuButton.value.style.transform = "rotate(0deg)";
        sidebar.value.style.left = "-250px";
    } else {
        isSidebarVisible.value = true;
        menuButton.value.style.transition = "transform 0.3s ease";
        menuButton.value.style.transform = "rotate(90deg)";
        sidebar.value.style.display = "block";
        sidebar.value.style.left = "0";
    }
}

const darkLightToggle = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        darklight.value = './image/interactive_btn/dayicon.png';
        mainscreen.value.style.backgroundColor = "#000000";
        profileText.value.style.color = "#ffffff";
        sidebar.value.style.backgroundColor = "#ffffff";
        sidebarpic.value = './image/interactive_btn/menu(light).png';
        const sidebarLinks = sidebar.value.querySelectorAll("a");
        sidebarLinks.forEach(link => {
            link.style.color = "#000000";
        });
    } else {
        isDark.value = false;
        darklight.value = './image/interactive_btn/nighticon.png';
        mainscreen.value.style.backgroundColor = "#ffffff";
        profileText.value.style.color = "#000000";
        sidebar.value.style.backgroundColor = "#000000";
        sidebarpic.value = './image/interactive_btn/menu(dark).png';
        const sidebarLinks = sidebar.value.querySelectorAll("a");
        sidebarLinks.forEach(a => {
            a.style.color = "#ffffff";
        });
    }
    console.log(darklight.value);
};

const ScrollToTop = () => {
    menuButton.value.style.top = -(window.scrollY - 15) + 'px';
}

onMounted(() => {
    window.addEventListener('scroll', ScrollToTop);
    darklight.value = './image/interactive_btn/nighticon.png';
    sidebarpic.value = './image/interactive_btn/menu(dark).png';
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', ScrollToTop);
});
</script>

<template>
    <img @click="RotateAndShowMenuSideBar" class="z-20"
    :src="sidebarpic"
    id="menubutton"
    width="30px" height="30px" ref="menuButton"/>
    <div v-if="isSidebarVisible" class="sidebar" id="sidebar" ref="sidebar">
        <a href="#" id="home">Home</a>
        <a href="#" id="about">About</a>
        <a  href="#" id="darklight">Dark/Light Toggle
            <img :src="darklight" @click="darkLightToggle"
            id="daynighticon"
            class="absolute w-10 h-10 top-28 left-50" />
        </a>
        <a href="#" id="contact">Contact</a>
    </div>
</template>
