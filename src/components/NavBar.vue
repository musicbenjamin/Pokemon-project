<template>
  <header>
    <div class="navbar container">
      <img src="../assets/Group.png" class="Pokemon" alt="Pokemon-Img" />
      <ul class="list-nav">
        <li><router-link to="/" class="router-style">Home</router-link></li>
        <li><router-link to="/Pokedex" class="router-style">Pokédex</router-link></li>
        <li><router-link to="/legendaries" class="router-style">Legendaries</router-link></li>
        <li><router-link to="/Documentation" class="router-style">Documentation</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
body {
  margin: 0;
}

.container {
  max-width: 1125px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5db13;
}

.list-nav {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-nav li {
  margin-left: 70px;
  font-family: 'Karla', sans-serif;
  font-size: 25px;
  font-weight: 400;
  position: relative;
  cursor: pointer;
}

.router-style {
  text-decoration: none;
  color: black;
}

header {
  background-color: #f5db13;
  padding: 13px;
  box-shadow: 0px 4px 16px 0px #011c40;
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
