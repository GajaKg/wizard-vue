<script setup lang="ts">
import { useRouter } from "vue-router";
import Box from "@/components/ui/Box.vue";
const router = useRouter();

const playHandler = () => {
  router.push("/game");
};
</script>

<template>
  <!-- <TheCard class="flex items-center justify-center"> -->
  <Box class="flex items-center justify-center flex-col" style="height: 80vh;">
    <div class="font-bold text-xl stext-center mb-10">Guess the cards</div>
    <div class="text-center">
      <button
        @click="playHandler"
        class="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        PLAY
      </button>
    </div>
  </Box>
</template>
<style scoped></style>
