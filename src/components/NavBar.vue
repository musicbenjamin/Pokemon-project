<template>
  <header>
      <div class="navbar container">
      <img src="../assets/Group.png" class="Pokemon" alt="Pokemon-Img">
      <ul class="list-nav">
        <li>Home</li>
        <li>Pokédex</li>
        <li>Legendaries</li>
        <li>Documentation</li>
      </ul>
    </div>
  </header>
</template>

<script>



</script>

<style>

  body{
    padding: 0;
    margin: 0;
  }

  .container {
    max-width: 1125px;
    margin: 0 auto ;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    background-color: #F5DB13;
    align-items: center;
  }

  .list-nav {
    display: flex;
  }

  .list-nav li {
    margin-left: 70px;
    list-style-type: none;
    font-family: 'Karla', sans-serif;
    font-size: 25px;
    font-weight: 400;
    position: relative;
    cursor: pointer;
  }

  header {
    background-color: #F5DB13;
    padding: 13px;
    box-shadow: 0px 4px 16px 0px #011C40;
  }

  .list-nav li::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -25%;
    width: 0;
    height: 2px;
    background-color: black;
    transition: width 0.3s ease;
  }

  .list-nav li:hover::after {
    width: 100%;
  }

  .Pokemon {
    width: 157.17px;
    height: 63px;
  }

</style>