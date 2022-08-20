<script>
  export default {
    props: ['state'],
  }
</script>
<template>
  <svg width="30" height="25" viewBox="0 0 36 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5C0 2.23858 2.23858 0 5 0H20C22.7614 0 25 2.23858 25 5V20C25 22.7614 22.7614 25 20 25H5C2.23858 25 0 22.7614 0 20V5Z" fill="#FFC540"/>
    <path d="M17 0H19V12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12V0Z" class="color-icon"/>
    <path d="M28.7 10.9792L31.7 14.2292C31.7333 14.25 31.7667 14.2708 31.8 14.2917C31.9667 14.3542 32.1667 14.3333 32.2667 14.2292L35.2667 10.9792C35.3333 10.9583 35.3333 10.9167 35.3333 10.875C35.3333 10.75 35.2 10.6667 35 10.6667H29C28.9333 10.6667 28.9 10.6667 28.8333 10.6875C28.6667 10.75 28.6333 10.875 28.7 10.9792Z" fill="#FFC540"/>
  </svg>
</template>

<style scoped>
  @import '../../assets/base.css';

  .color-icon {
    fill: var(--color-background);
  }

</style>