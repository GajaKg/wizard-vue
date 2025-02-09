<script setup lang="ts">
import { ref, watch, defineAsyncComponent, h } from "vue";
import { RouterLink } from "vue-router";

import Box from "@/components/ui/Box.vue";
import Card from "@/components/ui/Card.vue";
import Answer from "@/components/Answer.vue";
const JokeShow = defineAsyncComponent(() => import("@/components/JokeShow.vue"));

import type { Joke } from "@/models/Joke.interface";
import { jokeService } from "@/services/Joke.service";
import { useTimer } from "@/composables/timer";
import { useGameStore } from "@/stores/game";

//@ts-ignore
import { Hand } from "pokersolver";
import { game } from "@/utils/Engine";

const gameStore = useGameStore();
const timer = useTimer(100);

const { handSolved, getAnswers } = game.handAndAnswers();

const hand = ref<Hand>(handSolved);
const answers = ref<string[]>(getAnswers);
const isDirty = ref<boolean>(false);
const score = ref<number>(0);
const suddenDeath = 10;
const isCorrectAnswer = ref<boolean>();
const joke = ref<Joke>();

const onAnswerSelected = (answer: string): void => {
  if (timer.timesUp.value) return;

  joke.value = undefined;

  isDirty.value = true;

  if (hand.value.name === answer) {
    isCorrectAnswer.value = true;
    score.value++;
  } else {
    isCorrectAnswer.value = false;
  }

  timer.updateTime(isCorrectAnswer.value);

  // dont display new cards if times up
  if (timer.timesUp.value) {
    joke.value = undefined;
    return;
  }

  const { handSolved, getAnswers } = game.handAndAnswers();
  hand.value = handSolved;
  answers.value = getAnswers;
  loadJoke();
};

const loadJoke = async () => {
  const newJoke = await jokeService.getJoke();
  joke.value = newJoke;
};

// when time ups add score to store
watch(timer.timesUp, (isOver) => {
  if (isOver) {
    gameStore.addScore(score.value);
    joke.value = undefined;
  }
});
</script>

<template>
  <Box style="height: 80vh">
    <div>
      <!------------- Timer ---------------->
      <div
        class="mb-10 order-1 text-5xl font-extrabold leading-none text-blue-800 dark:text-blue-800 text-right"
        :class="timer.counter.value < suddenDeath ? 'text-red-800 dark:text-red-800' : ''"
      >
        {{ timer.counter }}
      </div>

      <!------------- Hand ---------------->
      <div class="flex flex-wrap gap-3 justify-center">
        <Card v-for="(card, index) in hand.cards" :card-type="card.suit" :key="index">
          {{ card.value }}
        </Card>
      </div>
      <div class="text-center mt-5 md:mt-20">
        <!------------- Info ---------------->
        <div
          class="font-bold h-5"
          :class="
            isCorrectAnswer && !timer.timesUp.value ? 'text-green-800' : 'text-red-800'
          "
        >
          <template v-if="isDirty && !timer.timesUp.value">
            {{
              isCorrectAnswer
                ? `Correct!! You gain ${timer.step} seconds`
                : `Wrong! You loose ${timer.step} seconds`
            }}
          </template>
          <template v-if="timer.timesUp.value"> Game over :( </template>
        </div>

        <!------------- Links ---------------->
        <div v-if="timer.timesUp.value" class="mt-4">
          <div>
            <RouterLink to="/leaderboard" class="text-blue-400">
              Go to Leaderboard
            </RouterLink>
          </div>
          <div class="mt-2">
            <RouterLink to="/" class="text-blue-400"> Start New Game </RouterLink>
          </div>
        </div>

        <!------------- Answers ---------------->
        <div
          class="mt-10 answers-list inline-block"
          :class="timer.timesUp.value ? 'game-over' : ''"
        >
          <Answer
            v-for="(answer, index) in answers"
            @click="onAnswerSelected(answer)"
            :key="index"
          >
            {{ answer }}
          </Answer>
        </div>

        <JokeShow
          v-if="joke"
          :setup="joke?.setup"
          :punchline="joke?.punchline"
          class="mt-6"
        />
        <div v-if="!joke && isDirty && !timer.timesUp.value" class="mt-6">...loading</div>
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
