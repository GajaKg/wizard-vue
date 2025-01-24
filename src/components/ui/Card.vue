<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  cardType: "s" | "h" | "d" | "c";
}
const props = defineProps<Props>();

const typesCard = {
  "s": "spades.png",
  "h": "hearts.png",
  "d": "diamond.png",
  "c": "clubs.png",
}

const typeImg = computed(() =>`src/assets/icons/${typesCard[props.cardType]}`);
</script>

<template>
  <div class="relative w-24 h-32 md:h-42 border rounded-lg border-gray-500 bg-gray-50">
    <div class="absolute top-2 right-4 w-5"><img :src="typeImg" class="w-full h-auto" /></div>
    <div class="grid h-full justify-center content-center">
      <p class="text-2xl"><slot></slot></p>
    </div>
  </div>
</template>
