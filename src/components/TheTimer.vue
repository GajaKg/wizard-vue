<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { defineExpose } from "vue";

interface Props {
  isCorrect?: boolean;
}

const props = defineProps<Props>();
const counter = ref<number>(100);

const interval = setInterval(function () {
  counter.value--;

  if (counter.value <= 0) {
    clearInterval(interval);
    counter.value = 100;
    // alert("idi na leader bord")
  }
}, 1000);

const updateTime = () => {
  counter.value = props.isCorrect ? counter.value + 5 : counter.value - 5;
};

defineExpose({
  updateTime,
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
<template>
  <p class="order-1 text-5xl font-extrabold leading-none text-blue-700 dark:text-blue-700">{{ counter }}</p>
</template>
<style lang="css" scoped></style>
