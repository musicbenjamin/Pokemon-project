<template>
  <div :class="backgroundClass">
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "App",
  setup() {
    const route = useRoute();

    const backgroundClass = computed(() => {
      switch (route.name) {
        case "Home":
          return "bg-home";
        case "Legendaries":
          return "bg-legendaries";
        case "Pokedex":
          return "bg-pokedex";
        case "Documentation":
          return "bg-documentation";
        case "ErrorPage":
          return"bg-ErrorPage"
        default:
          return "bg-default";
      }
    });

    return {
      backgroundClass,
    };
  },
};
</script>

<style>

.bg-home {
  background: linear-gradient(180deg, #F5DB13 0%, #F2B807 100%);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.bg-legendaries {
  background-color:#212121 ;
  height: 2250px;
}

.bg-pokedex {
  background-color: rgb(255, 255, 255);
}

.bg-documentation {
  background-color: rgb(255, 0, 0);
  height: 1049px;
}

.bg-ErrorPage {
  background-color: red;
  height: 1049px;
}

.bg-default {
  background: linear-gradient(180deg, #f51313 0%, #F2B807 100%);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

</style>
