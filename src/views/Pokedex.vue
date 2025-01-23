<template>
  <div>
    <NavBar />
    <div class="pokedex-container">
      <h1>800 <span>Pokemons</span> for you to chose your favourite </h1>
      <input
        v-model="searchTerm"
        class="search-bar"
        placeholder="Search for a Pokémon..."
      />
      <div class="filters">
        <select v-model="selectedType">
          <option value="">Type</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="pokemon-grid">
        <div
          class="pokemon-card"
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.name"
          @click="openModal(pokemon)"
        >
          <div>
            <h3>{{ pokemon.name }}</h3>
            <div class="poke-atributes">
              <div class="attack1">
                <p>{{ pokemon.attack }}</p>
                <span>Attack</span>
              </div>
              <div class="attack2">
                <p>{{ pokemon.defense }}</p>
                <span>Defense</span>
              </div>
            </div>
          </div>
          <div class="type1">
            <span>Grass</span>
          </div>
          <div class="type2">
            <span>Poison</span>
          </div>
          <div
            class="right-side"
            :style="{ backgroundColor: getBackgroundColor(pokemon) }"
          >
            <img :src="pokemon.image" :alt="pokemon.name" />
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="button-pag"
          v-for="page in visiblePages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>
    </div>
    <PokemonModal
      v-if="modalOpen"
      :isOpen="modalOpen"
      :pokemon="selectedPokemon"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import PokemonModal from "../components/PokemonModal.vue";
import axios from "../axios.js";

export default {
  components: {
    NavBar,
    PokemonModal,
  },
  setup() {
    const pokemons = ref([]);
    const searchTerm = ref("");
    const selectedType = ref("");
    const types = ref(["fire", "water", "grass", "electric", "normal"]);
    const currentPage = ref(1);
    const pokemonsPerPage = ref(9);
    const modalOpen = ref(false);
    const selectedPokemon = ref(null);

    const fetchPokemons = async () => {
      try {
        const response = await axios.get("pokemon?limit=800&offset=0");
        const pokemonList = response.data.results;
        const detailedPokemonPromises = pokemonList.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const detailedPokemonResponses = await Promise.all(detailedPokemonPromises);
        pokemons.value = await Promise.all(
          detailedPokemonResponses.map(async (res) => {
            const pokemon = res.data;
            const speciesResponse = await axios.get(pokemon.species.url);
            const generation = speciesResponse.data.generation.name;
            const spAttack = pokemon.stats.find(
              (stat) => stat.stat.name === "special-attack"
            )?.base_stat;
            const spDefense = pokemon.stats.find(
              (stat) => stat.stat.name === "special-defense"
            )?.base_stat;
            const highQualityImage = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default;
            return {
              name: pokemon.name,
              image: highQualityImage,
              attack: pokemon.stats.find(
                (stat) => stat.stat.name === "attack"
              )?.base_stat,
              defense: pokemon.stats.find(
                (stat) => stat.stat.name === "defense"
              )?.base_stat,
              hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat,
              experience: pokemon.base_experience,
              abilities: pokemon.abilities.map((ability) => ability.ability.name),
              types: pokemon.types.map((type) => type.type.name),
              generation: generation,
              spAttack: spAttack,
              spDefense: spDefense,
              type: pokemon.types,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    const openModal = (pokemon) => {
      selectedPokemon.value = pokemon;
      modalOpen.value = true;
    };

    const closeModal = () => {
      modalOpen.value = false;
      selectedPokemon.value = null;
    };

    const changePage = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
      }
    };

    const getBackgroundColor = (pokemon) => {
      if (pokemon.types.includes("fire")) return "#B23327";
      if (pokemon.types.includes("water")) return "#3498DB";
      if (pokemon.types.includes("grass")) return "#73D677";
      if (pokemon.types.includes("electric")) return "#F89EAE";
    };

    const filteredPokemons = computed(() =>
      pokemons.value.filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase());
        const matchesType =
          !selectedType.value || pokemon.types.includes(selectedType.value);
        return matchesSearch && matchesType;
      })
    );

    const totalPages = computed(() =>
      Math.ceil(filteredPokemons.value.length / pokemonsPerPage.value)
    );

    const paginatedPokemons = computed(() => {
      const startIndex = (currentPage.value - 1) * pokemonsPerPage.value;
      const endIndex = startIndex + pokemonsPerPage.value;
      return filteredPokemons.value.slice(startIndex, endIndex);
    });

    const visiblePages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const pages = [];

      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (current < total - 2) {
          pages.push("...");
        }

        pages.push(total);
      }

      return pages;
    });

    onMounted(fetchPokemons);

    return {
      pokemons,
      searchTerm,
      selectedType,
      types,
      currentPage,
      pokemonsPerPage,
      modalOpen,
      selectedPokemon,
      fetchPokemons,
      openModal,
      closeModal,
      changePage,
      getBackgroundColor,
      filteredPokemons,
      totalPages,
      paginatedPokemons,
      visiblePages,
    };
  },
};
</script>


<style scoped>

.search-bar {
  width: 1110px;
  background-color: rgb(241, 239, 239);
}

.pokedex-container {
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
}

.search-bar {
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ddd;
}

.filters {
  margin: 20px 0;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  padding: 20px;
}

.pokemon-card .right-side {
  background-color: rgb(212, 204, 204);
  width: 70%;
  height: 100%;
  overflow: hidden;
}

.pokemon-card h3 {
  font-family: 'Karla', sans-serif;
  margin: 0;
  margin-bottom: 10px;
}

.type1 {
  position: absolute;
  bottom: 0;
  left: 7%;
  background-color: #73D677;
  ;
  z-index: 10;
  border-radius: 11px;
  box-shadow: 0px -2px 0px 0px #0000002E inset;
  width: 20%;
  margin-bottom: 10px;
}

.type2 {
  position: absolute;
  bottom: 0;
  left: 29%;
  background-color:#07D6F2;
  ;
  z-index: 10;
  border-radius: 11px;
  box-shadow: 0px -2px 0px 0px #0000002E inset;
  width: 20%;
  margin-bottom: 10px;
}

.poke-atributes p {
  border: 3px solid black;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-family: 'Karla', sans-serif;
}

.poke-atributes span {
  font-family: 'Karla', sans-serif;
}

.poke-atributes {
  padding-left: 10px;
  padding-top: 10px;
}

.pokedex-container h1 {
    font-family: 'Karla', sans-serif;
    font-weight: 400;
  }


.pokedex-container span {
    font-family: 'Karla', sans-serif;
    font-weight: 700;
  }

.pokemon-card {
  position: relative;
  cursor: pointer;
  display: flex;
  width: 352.25px;
  height: 136.86px;
  justify-content: space-between;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}

.pokemon-card-description {
  display: flex;
}

.pokemon-card img {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}

.poke-atributes {
  display: flex;
}

.attack1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.attack2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 44px;
}

.poke-atributes p {
  margin: 0;
  padding: 0;
  display: block;
}

.poke-atributes span {
  margin: 0;
  padding: 0;
  width: 49px;
  height: 14px;
  font-size: 12px;
  font-family: 'Karla', sans-serif;
}

.right-side {
  position: relative;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgb(179, 179, 179);
  cursor: pointer;
  border-radius: 8px;
}

.pagination button.active {
  background-color: black;
  color: white;
  cursor: default;
}

.filters select {
  width: 100px;
  text-align: center;
  border-radius: 5px;
  height: 30px;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

</style>
