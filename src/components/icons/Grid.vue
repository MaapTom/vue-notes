<template>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <rect width="28" height="28" rx="4" class="color-box"/>
    <path d="M12.3334 5.66667H5.66669V12.3333H12.3334V5.66667Z" class="color-icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.3334 5.66667H15.6667V12.3333H22.3334V5.66667Z" class="color-icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.3334 15.6667H5.66669V22.3333H12.3334V15.6667Z" class="color-icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.3334 15.6667H15.6667V22.3333H22.3334V15.6667Z" class="color-icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<style scoped>
@import '../../assets/base.css';

.color-icon {
  stroke: var(--color-text);
  fill: transparent;
}

.color-box {
  /* fill: var(--color-background-soft); */
  /* stroke:  var(--color-text); */
  stroke-width: 1px;
}

@media(prefers-color-scheme: dark) {
  .color-box {
    stroke: none;
    fill: var(--color-background-light)
  }
}

</style>