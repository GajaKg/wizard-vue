<script setup lang="ts">
withDefaults(defineProps<{setup?: string, punchline?: string}>(), {
  setup: "",
  punchline: "",
})
</script>

<template>
  <div>
    <div class="italic underline text-center cursor-pointer">
      {{ setup }}
    </div>
    <div class="text-center cursor-pointer">
      {{ punchline }}
    </div>
  </div>
</template>
<style lang="css" scoped></style>
