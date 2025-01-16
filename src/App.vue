<template>
  <div>
    <Navbar />
  </div>  
  </template>

<script>
  
  import Navbar from './components/NavBar.vue';

  export default {
    components: {
      Navbar, 
    }
  }

</script>

<style>
  body{
    background: linear-gradient(180deg, #F5DB13 0%, #F2B807 100%);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
  


</style>