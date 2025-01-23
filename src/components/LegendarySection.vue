<template>
  <div>
    <div class="legendary-pokemon-section container">
      <h1>Legendaries</h1>
      <hr />
      <div class="featured-pokemon" v-if="!loading">
        <img :src="featuredPokemon.image" :alt="featuredPokemon.name" class="featured-image" />
        <div class="pokemon-details">
          <h2>{{ featuredPokemon.name }}</h2>
          <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
          </p>
          <div class="stats">
            <div v-for="(value, key) in featuredPokemon.stats" :key="key" class="stat">
              <p><strong>{{ key }}:</strong></p>
              <span>{{ value }}</span>
              <div class="progress-bar">
                <div :style="{ width: `${(value / 400) * 100}%` }" class="progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading">Loading...</div>

      <div class="pokemon-carousel">
        <button @click="scrollCarousel(-1)" class="arrow left">&lt;</button>
        <div class="carousel" ref="carouselRef">
          <div
            class="pokemon-card"
            v-for="pokemon in legendaryPokemons"
            :key="pokemon.name"
            @click="selectPokemon(pokemon)"
          >
            <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
            <div class="name-container">
              <p>{{ pokemon.name }}</p>
              <img src="/src/assets/poke-ball.png" alt="">
            </div>
          </div>
        </div>
        <button @click="scrollCarousel(1)" class="arrow right">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import { ref, onMounted } from 'vue';
import axios from '../axios.js';

export default {
  components: {
    NavBar,
  },
  setup() {
    const legendaryPokemons = ref([]);
    const featuredPokemon = ref(null);
    const loading = ref(true);
    const carouselRef = ref(null);

    const fetchLegendaryPokemons = async () => {
      try {
        const response = await axios.get('pokemon?limit=300');
        const allPokemons = response.data.results;

        const detailedPokemonPromises = allPokemons.map(pokemon =>
          axios.get(pokemon.url)
        );
        const detailedPokemonResponses = await Promise.all(detailedPokemonPromises);

        const speciesDataPromises = detailedPokemonResponses.map(res =>
          axios.get(res.data.species.url)
        );
        const speciesDataResponses = await Promise.all(speciesDataPromises);

        legendaryPokemons.value = detailedPokemonResponses
          .map((res, index) => {
            const speciesData = speciesDataResponses[index].data;

            return {
              name: res.data.name,
              image:
                res.data.sprites.other.dream_world.front_default ||
                res.data.sprites.front_default,
              stats: {
                HP: res.data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
                Attack: res.data.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
                Defense: res.data.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
                'Special Attack': res.data.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat,
                'Special Defense': res.data.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat,
                Experience: res.data.base_experience,
              },
              isLegendary: speciesData.is_legendary,
            };
          })
          .filter(pokemon => pokemon.isLegendary);

        featuredPokemon.value = legendaryPokemons.value[0];
      } catch (error) {
        console.error('Error fetching legendary Pokémon data:', error);
      } finally {
        loading.value = false;
      }
    };

    const selectPokemon = pokemon => {
      featuredPokemon.value = pokemon;
    };

    const scrollCarousel = direction => {
      const carousel = carouselRef.value;
      if (carousel) {
        carousel.scrollBy({ left: direction * 300, behavior: 'smooth' });
      }
    };

    onMounted(() => {
      fetchLegendaryPokemons();
    });

    return {
      legendaryPokemons,
      featuredPokemon,
      loading,
      selectPokemon,
      scrollCarousel,
      carouselRef,
    };
  },
};
</script>

<style scoped>

.legendary-pokemon-section {
  color: white;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.legendary-pokemon-section h1 {
  font-size: 72px;
  font-family: 'Karla', sans-serif;
  font-weight: 400;
  text-align: start;
  color: #ffffff;
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  background: #ffffff;
  margin-bottom: 30px;
}

.featured-pokemon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 90px;
}

.featured-image {
  width: 400px;
  height: auto;
}

.pokemon-details {
  max-width: 500px;
}

.pokemon-details h2 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 10px;
}

.description {
  color: #ccc;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.progress-bar {
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  height: 8px;
  margin: 5px 0;
  max-width: 200px;
  width: 100%;
}

.progress {
  background-color: #fdd835;
  height: 100%;
}

.pokemon-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.name-container {
  position: absolute;
  background-color: white;
  bottom: -1%;
  left: 0;
  width: 163px;
  border-radius: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.name-container p {
  color: black;
  z-index: 10;
  font-family: 'Karla', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-left: 20px;
}

.name-container img {
  height: 24px;
  width: 24px;
  margin-right: 20px;
}

.pokemon-image {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 50%;
  top: 40%;
  transform: translate(50%, -50%);
  min-width: 160px;
  min-height: 160px;

}

.carousel {
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  gap: 25px;
  scroll-behavior: smooth;
  padding: 10px 0;
  min-width: 1000px;
}

.pokemon-card {
  background-color: #c0c266;
  position: relative;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  color: white;
  min-width:133px;
  height: 180px;
  cursor: pointer;
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: scale(1.1);
}

.pokemon-image {
  width: 80px;
  height: auto;
  margin-bottom: 10px;
}

.arrow {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 4rem;
  cursor: pointer;
  padding: 10px;
  margin: 20px;
}

.arrow:hover {
  color: #c8ff00;
}
</style>
