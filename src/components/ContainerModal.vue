<script>
  export default {
    props: ['isOpen'],
    emits: ['changeStateModal'],
    data() {
      return {}
    },
    methods: {
      handleClickBgModal(){
        this.$emit('changeStateModal');
      }
    }
  }
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <section
        v-if="isOpen"
        ref="bgModal"
        class="bg-modal"
        @click.self="handleClickBgModal"
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