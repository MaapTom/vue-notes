<script setup>
  import Plus from './icons/Plus.vue';

  defineProps({
    isActive: Boolean,
  });
  defineEmits(['handleClick']);
</script>

<template>
  <Teleport to="body">
    <a
      class="button-add"
      v-show="isActive"
      @click="$emit('handleClick')"
    >
      <Plus/>
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
  background-color: var(--vt-yellow-orange);
  outline: transparent;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(255, 168, 63, 0.2);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: all .2s;
}

.button-add:hover {
  transform: scale(0.9);
}
</style>