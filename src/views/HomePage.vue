<template>
  <div>
    <Navbar />
  <div class="hero container">
    <div class="text-section">
      <h1><span>Find</span> all your
        favorite <span>Pokemon</span>
      </h1>
      <h2>
        You can know the type of Pokemon,
        its strengths, disadvantages and abilities
      </h2>
      <router-link to="/Pokedex" class="router-style"> <button class="return-button">See Pokemons</button> </router-link>
    </div>
    <div>
      <img class="picture-pikachu" src="/src/assets/home-picture.png" alt="">
    </div>
  </div>
  <footer class="foot container">
    <h3>lorem ipsum</h3>
    <h3>lore</h3>
  </footer>
  </div>
</template>

<script>

  import Navbar from '../components/NavBar.vue';

  export default {
    components: {
      Navbar,
  },
};

</script>

<style>

  .hero {
    display: flex;
    position: relative;
    margin-top: 70px;
  }

  .text-section h1 {
    font-family: 'Karla', sans-serif;
    font-size: 72px;
    font-weight: 400;
    line-height: 84.17px;
    letter-spacing: 4px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .text-section h2 {
    font-family: 'Karla', sans-serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 37.41px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .text-section button {
    background-color: #73D677;
    box-shadow: 0px -9px 0px 0px rgba(0, 0, 0, 0.18) inset;
    width: 231px;
    height: 66px;
    gap: 0px;
    border-radius: 11px 8px 4px 4px;
    opacity: 0px;
    font-family: 'Karla', sans-serif;
    cursor: pointer;
    font-size: 23px;
    font-weight: 700;
    line-height: 26.89px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    border: none;
  }

  .text-section button:hover {
    background-color: #258a29;
  }

  .text-section span {
    font-family: 'Karla', sans-serif;
    font-weight: 700;
  }

  .text-section {
    position: relative;
    width: 50%;
  }

  .picture-pikachu {
    position: absolute;
    left: 50%;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    margin-top: 150px;
  }

  .foot h3 {
    font-family: 'Karla', sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.04px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

</style>