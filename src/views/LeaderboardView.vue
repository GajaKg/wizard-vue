<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { computed, ref } from "vue";

import Box from "@/components/ui/Box.vue";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();
const { leaderboard } = storeToRefs(gameStore);

const showLeaderboard = ref<boolean>(true);

const leaderboardList = computed(() => {
  if (showLeaderboard.value) {
    return leaderboard.value;
  } else {
    const copyLeaderboard = JSON.parse(JSON.stringify(leaderboard.value));
    return [...copyLeaderboard].sort((a, b) => b.score - a.score);
  }
});

const toggleLeaderboard = (show: boolean) => {
  showLeaderboard.value = show;
};
</script>

<template>
  <Box class="flex items-center justify-center h-full m-auto min-w-xl flex-col relative">
    <div class="flex mb-6">
      <button
        @click="toggleLeaderboard(true)"
        class="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Leaderboard
      </button>
      <button
        @click="toggleLeaderboard(false)"
        class="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Best of
      </button>
    </div>
    <h2 class="mb-2 text-2xl font-semibold">{{showLeaderboard ? "Leaderboard" : "Best of"}}: </h2>
    <ul
      v-if="leaderboardList.length"
      class="max-w-md text-xl space-y-1 text-green-900 list-disc list-inside dark:text-green-900"
    >
      <li v-for="(attempt, index) in leaderboardList" :key="index">
        Attempt {{ attempt.counter }} -
        <span>{{ attempt.score }} {{ attempt.score <= 1 ? "answer" : "answers" }}</span>
      </li>
    </ul>
    <p v-else>No attempts</p>

    <!-- <h2 class="mt-6 mb-2 text-2xl font-semibold">Best of:</h2>
    <ul
      v-if="leaderboard.length"
      class="max-w-md text-xl space-y-1 text-green-900 list-disc list-inside dark:text-green-900"
    >
      <li v-for="(attempt, index) in bestOf" :key="index">
        Attempt {{ attempt.counter }} -
        <span>{{ attempt.score }} {{ attempt.score <= 1 ? "answer" : "answers" }}</span>
      </li>
    </ul> -->

    <RouterLink to="/" class="block mt-10 text-blue-400"> New Game </RouterLink>
  </Box>
</template>
<style scoped></style>
