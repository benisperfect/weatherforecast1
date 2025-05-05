<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const username = ref('');
const password = ref('');
const incorrectloginText = ref('');
const isLoginScreenVisible = ref(true);
const isMainScreenVisible = ref(false);
const userInfo = ref('');
const profileSrc = ref('');
const isSigninbarVisible = ref(false);
const signinbarRef = ref(null);
const UserInfoRef = ref(null);
const ProfileSrcRef = ref(null);

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
      profileSrc.value = '../image/user_profile/user1.png';
    }, 1000);
  } else {
    incorrectloginText.value = 'Incorrect username or password.';
  }
};

const RotateAndShowSettingSideBar = () => {
  isSigninbarVisible.value = !isSigninbarVisible.value;
};

const handleClickOutside = (event) => {
  if (signinbarRef.value && !signinbarRef.value.contains(event.target)) {
    isSigninbarVisible.value = false;
  }
};

const ScrollToTop = () => {
    UserInfoRef.value.style.top = -(window.scrollY - 15) + 'px';
    ProfileSrcRef.value.style.top = -(window.scrollY - 15) + 'px';
  }

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', ScrollToTop);
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

    <div v-if="isMainScreenVisible" id="mainscreen">
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
  </div>
  </template>

