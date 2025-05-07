<script setup lang="js">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const username = ref('');
const password = ref('');
const incorrectloginText = ref('');
const isLoginScreenVisible = ref(true);
const isMainScreenVisible = ref(false);

const mainscreen = ref(null);
const userInfo = ref('');
const profileSrc = ref('');
const isSigninbarVisible = ref(false);
const signinbarRef = ref(null);
const UserInfoRef = ref(null);
const ProfileSrcRef = ref(null);

const menuButton = ref(null);
const sidebar = ref(null);
const isSidebarVisible = ref(true);
const darklight = ref(null);  //"./image/interactive_btn/nighticon.png";
const sidebarpic = ref(null);  //'./image/interactive_btn/menu-dark.png';
const isDark = ref(false);

const LoginButton = () => {
  incorrectloginText.value = '';

  if (!username.value.trim() || !password.value.trim()) {
    incorrectloginText.value = 'Please enter your username and password.';
    return;
  }

  if (username.value === 'benisperfect' && password.value === 'ben123') {
    incorrectloginText.value = 'Login successful!';
    setTimeout(() => {
      isLoginScreenVisible.value = false;
      isMainScreenVisible.value = true;
      userInfo.value = `Hello, ${username.value}.`;
      profileSrc.value = './image/user_profile/user1.png';
    }, 1000);
  } else {
    incorrectloginText.value = 'Incorrect username or password.';
  }
};

const RotateAndShowSettingSideBar = () => {
  isSigninbarVisible.value = !isSigninbarVisible.value;
};

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
    mainscreen.value.backgroundColor = "#000000";
    userInfo.value.color = "#ffffff";
    sidebar.value.backgroundColor = "#ffffff";
    menuButton.value = './image/interactive_btn/menu(light).png';
    const sidebarLinks = sidebar.value.querySelectorAll("a");
    sidebarLinks.forEach(a => {
      a.style.color = "#000000";
    });
  } else {
    isDark.value = false;
    darklight.value = './image/interactive_btn/nighticon.png';
    mainscreen.value.backgroundColor = "#ffffff";
    userInfo.value.color = "#000000";
    sidebar.value.backgroundColor = "#000000";
    menuButton.value = './image/interactive_btn/menu(dark).png';
    const sidebarLinks = sidebar.value.querySelectorAll("a");
    sidebarLinks.forEach(a => {
      a.style.color = "#ffffff";
    });
  }
  console.log(darklight.value);
};

const handleClickOutside = (event) => {
  if (signinbarRef.value && !signinbarRef.value.contains(event.target)) {
    isSigninbarVisible.value = false;
  }
};

const ScrollToTop = () => {
    UserInfoRef.value.style.top = -(window.scrollY - 15) + 'px';
    ProfileSrcRef.value.style.top = -(window.scrollY - 15) + 'px';
    menuButton.value.style.top = -(window.scrollY - 15) + 'px';
  }

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', ScrollToTop);
  darklight.value = './image/interactive_btn/nighticon.png';
  menuButton.value = './image/interactive_btn/menu(dark).png';
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', ScrollToTop);
});
</script>

<template>
    <div v-if="isLoginScreenVisible" class="loginoutscreen">
      <div id="loginscreentext">WEATHER</div>
      <div class="logsigninbutton">
        <div class="loginbox">
          <div id="logintext">LOG IN</div>
          <input v-model="username" type="text" placeholder="Username or Email" id="username" required />
          <input v-model="password" type="password" placeholder="Password" id="password" required />
          <div class="loginbuttonbox">
            <button @click="LoginButton" id="loginbutton">Login</button>
            <button id="signupbutton">Sign up</button>
          </div>
          <div id="incorrectlogintext" :style="{ color: incorrectloginText === 'Login successful!' ? 'green' : 'red' }">
            {{ incorrectloginText }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMainScreenVisible" id="mainscreen" ref="mainscreen">
      <p ref="UserInfoRef" id="user-info">{{ userInfo }}</p>
      <img
        @click.stop="RotateAndShowSettingSideBar"
        width="30px" height="30px"
        :src="profileSrc" alt="User Profile" id="profile" ref="ProfileSrcRef" />
      <div
        :class="['signinbar', { show: isSigninbarVisible }]"
        ref="signinbarRef">
        <a href="#" id="sign-in">Sign in</a>
        <a href="#" id="login">Log in</a>
        <a href="#" id="logout">Log out</a>
      </div>
      <img @click="RotateAndShowMenuSideBar" class="z-20"
        :src="sidebarpic"
        id="menubutton"
        width="30px" height="30px" ref="menuButton"/>
        <div v-if="isSidebarVisible" class="sidebar" id="sidebar" ref="sidebar">
            <a href="#" id="home">Home</a>
            <a href="#" id="about">About</a>
            <a  href="#" id="darklight">Dark/Light Toggle
                <img :src="darklight" @click="darkLightToggle"
                id="daynighticon" ref="darklight"
                class="absolute w-10 h-10 top-28 left-50" />
            </a>
            <a href="#" id="contact">Contact</a>
          </div>
    </div>
  </template>

