<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import Box from "@/components/ui/Box.vue";
import Card from "@/components/ui/Card.vue";
import Answer from "@/components/Answer.vue";

import { useTimer } from "@/composables/timer";

import { useGameStore } from "@/stores/game";

//@ts-ignore
import { Hand } from "pokersolver";
import { game } from "@/utils/Engine";

const gameStore = useGameStore();
const timer = useTimer(15);

const { handSolved, getAnswers } = game.handAndAnswers();

const hand = ref<Hand>(handSolved);
const answers = ref<string[]>(getAnswers);
const isDirty = ref<boolean>(false);
const score = ref<number>(0);
const isCorrectAnswer = ref<boolean>();

const onAnswerSelected = (answer: string): void => {
  isDirty.value = true;

  if (hand.value.name === answer) {
    isCorrectAnswer.value = true;
    score.value++;
  } else {
    isCorrectAnswer.value = false;
  }

  timer.updateTime(isCorrectAnswer.value);

  // dont display new cards if times up
  if (timer.gameOver.value) return;

  const { handSolved, getAnswers } = game.handAndAnswers();
  hand.value = handSolved;
  answers.value = getAnswers;
};

// when time ups add score to store
watch(timer.gameOver, (isOver) => {
  if (isOver) gameStore.addScore(score.value);
});
</script>

<template>
  <Box class="h-full m-auto min-w-xl border-2">
    <div>
      <div
        class="mb-10 order-1 text-5xl font-extrabold leading-none text-blue-800 dark:text-blue-800 text-right"
        :class="timer.counter.value < 10 ? 'text-red-800 dark:text-red-800' : ''"
      >
        {{ timer.counter }}
      </div>
      <div class="flex gap-3 justify-center">
        <Card v-for="(card, index) in hand.cards" :card-type="card.suit" :key="index">
          {{ card.value }}
        </Card>
      </div>
      <div class="text-center mt-20">
        <div
          class="font-bold h-5"
          :class="isCorrectAnswer && !timer.gameOver.value ? 'text-green-800' : 'text-red-800'"
        >
          <template v-if="isDirty && !timer.gameOver.value">
            {{
              isCorrectAnswer
                ? `Correct!! You gain ${timer.step} seconds`
                : `Wrong! You loose ${timer.step} seconds`
            }}
          </template>
          <template v-if="timer.gameOver.value"> Game over :( </template>
        </div>
        <div>
          <template v-if="timer.gameOver.value">
            <RouterLink to="/leaderboard" class="block mt-4 text-blue-400">
              Go to Leaderboard
            </RouterLink>
            <RouterLink to="/" class="block mt-2 text-blue-400">
              Start New Game
            </RouterLink>
          </template>
        </div>
        <div
          class="mt-10 answers-list inline-block"
          :class="timer.gameOver.value ? 'game-over' : ''"
        >
          <Answer
            v-for="(answer, index) in answers"
            @click="onAnswerSelected(answer)"
            :key="index"
          >
            {{ answer }}
          </Answer>
        </div>
      </div>
    </div>
  </Box>
</template>

<style>
.answers-list > div:not(:last-child) {
  margin-bottom: 10px;
}
.game-over > div {
  cursor: default;
  opacity: 0.4;
}
</style>
