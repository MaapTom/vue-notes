<script>
  export default {
    props: ['state'],
  }
</script>

<template>  
  <template v-if="state === 'TabNotes'">
    <svg width="24" height="24" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12.5L9.9372 15.9575C10.3111 16.4879 11.0832 16.5273 11.5091 16.0376L18.5 8" stroke="#999999" stroke-width="2" stroke-linecap="round"/>
      <rect x="1" y="1" width="23" height="23" rx="4" stroke="#909090" stroke-width="2"/>
    </svg>
  </template>

  <template v-else>
    <svg width="24" height="24" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="25" height="25" rx="5" fill="#FFA83F"/>
      <path d="M7 12.5L9.9372 15.9575C10.3111 16.4879 11.0832 16.5273 11.5091 16.0376L18.5 8" class="line-check-color" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </template>
</template>

<style scoped>
@import '../../assets/base.css';

.line-check-color {
  stroke: var(--color-background);
}
</style>
