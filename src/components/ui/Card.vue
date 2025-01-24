<script setup lang="ts">
interface Props {
  cardType: "s" | "h" | "d" | "c";
}

const props = defineProps<Props>();
</script>

<template>
  <div class="card">
    <div class="card-type">{{ cardType }}</div>
    <div class="card-details">
      <p class="text-2xl"><slot></slot></p>
    </div>
  </div>
</template>
<style lang="css" scoped>
.card {
  width: 90px;
  height: 150px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
}

.card-type {
  position: absolute;
  top: 7px;
  right: 10px;
}
</style>
