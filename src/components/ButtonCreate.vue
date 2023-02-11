<script setup>
  import { useWindowSize } from '@vueuse/core';
  import Plus from './icons/Plus.vue';

  defineProps({
    isActive: Boolean,
  });
  defineEmits(['handleClick']);
  
  const { width } = useWindowSize();

</script>

<template>
  <Teleport
    to="body"
    :disabled="width > 720"
  >
    <a
      class="button-add"
      v-show="isActive"
      @click="$emit('handleClick')"
    >
      <span v-if="width > 720">
        Nova anotação
      </span>
      <span class="plusIcon">
        <Plus/>
      </span>
    </a>
  </Teleport>
</template>

<style scoped>
@import '../assets/base.css';
.button-add {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;

  border: none;
  border-radius: 100%;
  background-color: var(--vt-yellow700);
  outline: transparent;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(255, 168, 63, 0.2);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: all .2s;
}

.button-add span {
  display: flex;
  align-items: center;
}

.button-add:hover {
  transform: scale(0.9);
}

@media(min-width: 720px) {
  .button-add {
    position: initial;
    justify-content: space-between;
    min-width: 180px;
    height: 50px;
    padding: 16px 16px 14px 16px;
    background-color: var(--vt-yellow700);
    border-radius: 30px;
    color: var(--vt-white200);
    font-weight: 600;
  }

  .button-add .plusIcon {
    display: flex;
    align-items: center;
    margin-left: 12px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--vt-yellow700);
  }

  .button-add:hover {
    background-color: var(--vt-yellow500);
    transform: scale(0.95)
  }
}

</style>