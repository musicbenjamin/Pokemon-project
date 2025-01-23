<template>
  <div>
    <NavBar />
    <LegendarySection sectionTitle="Legendaries - Section 1" />
    <CommonSection sectionTitle="Common - section 2"/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import LegendarySection from '../components/LegendarySection.vue';
import CommonSection from "../components/CommonSection.vue"

export default {
  components: {
    LegendarySection,
    NavBar,
    CommonSection,
  },
};
</script>
