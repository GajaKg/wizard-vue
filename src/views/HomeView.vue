<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const playHandler = () => {
  router.push("/game")
}
</script>

<template>
  <main class="relative">
    <div class="">
      <div class="font-bold text-xl mb-2 text-center">Guess the cards</div>
      <div class="text-center">
        <button
          @click="playHandler"
          class="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          PLAY
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>

</style>
