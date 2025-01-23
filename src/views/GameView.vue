<script setup lang="ts">
import {Hand} from 'pokersolver';

var hand1 = Hand.solve(["Ad", "As", "Jc", "Th", "2d", "3c", "Kd"]);
var hand2 = Hand.solve(["Ad", "As", "Jc", "Th", "2d", "Qs", "Qd"]);
// var hand3 = Hand.solve(["Ad", "As", "Jc", "Th", "2d", "2s", "2c"]);
var winner = Hand.winners([hand1, hand2]); // hand2
// var winner = Hand.winners([hand1, hand2, hand3]); // hand2
console.log(winner)
</script>

<template>
  <div>
    <h1>Game</h1>
  </div>
</template>

<style>

</style>
