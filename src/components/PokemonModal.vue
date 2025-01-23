<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">
        <img src="/src/assets/closeIcon.png" alt="" />
      </button>
      <div class="modal-table">
        <div class="left-side" :style="{ backgroundColor: getBackgroundColor }">
          <img :src="pokemon.image" :alt="pokemon.name" />
        </div>
        <div class="right-side" :style="{ backgroundColor: getBackgroundColor2 }">
          <div class="name-generation">
            <h1>{{ pokemon.name }}</h1>
            <p>{{ pokemon.generation || 'N/A' }}</p>
          </div>
          <div class="abilities">
            <p>Abilities</p>
            <p>{{ pokemon.abilities ? pokemon.abilities.join(', ') : 'N/A' }}</p>
          </div>
          <div class="hp-xp">
            <div class="stat1">
              <p>Healthy Points</p>
              <p>{{ pokemon.hp }}</p>
              <img src="/src/assets/CardCharge.png" alt="" />
            </div>
            <div class="stat1">
              <p>Experience</p>
              <p>{{ pokemon.experience }}</p>
              <img src="/src/assets/ChargeCard.png" alt="" />
            </div>
          </div>
          <div class="other">
            <div class="stat">
              <p>{{ pokemon.spDefense }}</p>
              <span>Sp Defense</span>
            </div>
            <div class="stat">
              <p>{{ pokemon.attack }}</p>
              <span>Attack</span>
            </div>
            <div class="stat">
              <p>{{ pokemon.defense }}</p>
              <span>Defense</span>
            </div>
            <div class="stat">
              <p>{{ pokemon.spAttack }}</p>
              <span>Sp Attack</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    pokemon: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close");
    };

    const getBackgroundColor = computed(() => {
      if (props.pokemon.types.includes("fire")) return "#B23327";
      if (props.pokemon.types.includes("water")) return "#3498DB";
      if (props.pokemon.types.includes("grass")) return "#73D677";
      if (props.pokemon.types.includes("electric")) return "#F89EAE";
    });

    const getBackgroundColor2 = computed(() => {
      if (props.pokemon.types.includes("fire")) return "#732119";
      if (props.pokemon.types.includes("water")) return "#023361";
      if (props.pokemon.types.includes("grass")) return "#038815";
      if (props.pokemon.types.includes("electric")) return "#6e0554";
      return "#1d1c1c";
    });

    return {
      closeModal,
      getBackgroundColor,
      getBackgroundColor2,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  height: 371px;
  max-width: 800px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-table {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 20px;
}

.left-side {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 371px;
  box-shadow: 0px 2px 1px rgba(0, 0, 3, 0.09), 0px 4px 2px rgba(0, 0, 3, 0.09),
    0px 8px 4px rgba(0, 0, 0, 0.09), 0px 16px 8px rgba(0, 0, 0, 0.09),
    0px 32px 16px rgba(0, 0, 0, 0.09);
}

.abilities,
.hp-xp {
  background-color: white;
  border-radius: 10px;
  margin: 15px;
  font-family: "Karla", sans-serif;
}

.abilities p,
.stat1 p {
  margin: 0;
}

.abilities p{
  padding: 5px;
}

.other {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 0;
}

.stat {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  max-width: 75px;
  width: 100%;
  padding: 5px;
}

.stat p {
  border: 3px solid black;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Karla", sans-serif;
}

.stat1 {
  margin: 10px;
}

.name-generation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 0 20px;
}

.left-side img {
  width: 340px;
  height: 300px;
}

.right-side {
  width: 60%;
  height: 371px;
}

.hp-xp {
  display: flex;
  justify-content: space-between;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
