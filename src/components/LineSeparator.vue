<script setup>
</script>

<template>
  <span class="line-separator"></span>
</template>

<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';

.line-separator {
  display: block;
  width: 80%;
  height: 0.5px;
  margin: 10px auto;

  background-color: var(--color-background-soft);
  animation: slideTop .2s forwards;
}
</style>