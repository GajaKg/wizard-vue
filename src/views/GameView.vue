<script setup lang="ts">
import { onUnmounted, ref, watch, useTemplateRef } from "vue";

import TheTimer from "@/components/TheTimer.vue";
import Box from "@/components/ui/Box.vue";
import Card from "@/components/ui/Card.vue";
import Answer from "@/components/Answer.vue";

//@ts-ignore
import { Hand } from "pokersolver";
import { game } from "@/utils/Game";

const newHand = game.getHand();
const handSolved = Hand.solve(newHand);
const answers = game.getAnswers(handSolved.name);

const hand = ref<Hand>(handSolved);

const isCorrect = ref<boolean>();
const theTimer = useTemplateRef("the-timer");

const onAnswerSelected = (answer: string) => {
  console.log(hand.value.name,"-", answer, hand.value.name === answer);
  isCorrect.value = hand.value.name === answer ? true : false;
  console.log(isCorrect.value);
  theTimer.value?.updateTime();
};
</script>

<template>
  <Box class="h-full m-auto min-w-xl border-2">
    <div>
      <TheTimer :is-correct="isCorrect" ref="the-timer" />

      <div class="flex gap-3 justify-center">
        <Card
          v-for="(card, index) in handSolved.cards"
          :card-type="card.suit"
          :key="index"
        >
          {{ card.value }}
        </Card>
      </div>
      <div class="text-center mt-20">
        <div class="inline-block">
          <Answer
            v-for="(answer, index) in answers"
            @click="onAnswerSelected(answer)"
            :key="index"
          >
            {{ answer }}
          </Answer>
        </div>
      </div>
      <!-- <button @click="answerHandler(true)">add</button>
      <button @click="answerHandler(false)">remove</button> -->
    </div>
  </Box>
</template>

<style>
.inline-block > div:not(:last-child) {
  margin-bottom: 10px;
}
</style>
