<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

import Box from "@/components/ui/Box.vue";
import Card from "@/components/ui/Card.vue";
import Answer from "@/components/Answer.vue";

import { useTimer } from "@/composables/timer";

//@ts-ignore
import { Hand } from "pokersolver";
import { game } from "@/utils/Game";

const timer = useTimer();

const { handSolved, getAnswers } = game.handAndAnswers();

const hand = ref<Hand>(handSolved);
const answers = ref<string[]>(getAnswers);
const isDirty = ref<boolean>(false);

const isCorrect = ref<boolean>();

const onAnswerSelected = (answer: string): void => {
  isDirty.value = true;
  isCorrect.value = hand.value.name === answer ? true : false;

  timer.updateTime(isCorrect.value);

  // dont display new cards if times up
  if (timer.gameOver.value) {
    console.log("Game over");
    return;
  }

  const { handSolved, getAnswers } = game.handAndAnswers();
  hand.value = handSolved;
  answers.value = getAnswers;
};
</script>

<template>
  <Box class="h-full m-auto min-w-xl border-2">
    <div>
      <div
        class="mb-10 order-1 text-5xl font-extrabold leading-none text-blue-800 dark:text-blue-800 text-right"
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
          :class="isCorrect && !timer.gameOver.value ? 'text-green-800' : 'text-red-800'"
        >
          <template v-if="isDirty && !timer.gameOver.value">
            {{
              isCorrect
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
