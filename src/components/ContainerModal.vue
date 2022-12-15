<script setup>
  
  defineProps({
    isActive: Boolean,
  });
  defineEmits(['changeStateModal']);
  
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <section
        v-if="isActive"
        class="bg-modal"
        @click.self="$emit('changeStateModal')"
      >
        <slot></slot>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import '../assets/transitions.css';

.bg-modal {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

</style>