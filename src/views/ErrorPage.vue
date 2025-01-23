<template>
  <div>
    <img class="error-picture" src="/src/assets/eror-404.png" alt="">
    <router-link to="/" class="router-style"> <button class="return-button">Return</button> </router-link>
  </div>
  </template>

  <style scoped>

  .error-picture {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
  }

  .return-button {
    position: absolute;
    right: 50%;
    top: 85%;
    transform: translate(50%, -50%);
    width: 281px;
    height: 120px;
    background-color: #F2CB07;
    box-shadow: 0px -9px 0px 0px #0000002E inset;
    border-radius: 40px;
  }

  </style>