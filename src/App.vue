<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import TheCard from "@/components/ui/TheCard.vue";
</script>

<template>
  <main class="relative">
    <TheCard class="the-card flex items-center justify-center">
      <RouterView />
    </TheCard>
  </main>
</template>

<style scoped>

</style>
