import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { type Leaderboard } from '@/models/Leaderboard.interface'

export const useGameStore = defineStore('game', () => {

  const leaderboard = ref<Leaderboard[]>([]);
  // const leaderboard = ref<Leaderboard[]>([{ counter: 1, score: 5 }, { counter: 2, score: 3 }, { counter: 3, score: 4 }]);
  let attemptCounter = leaderboard.value.length;

  const addScore = (score: number) => {
    attemptCounter++;
    leaderboard.value?.push({ counter: attemptCounter, score });
  }

  return { leaderboard, addScore }
})
