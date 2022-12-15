<script setup>
  import { ref, watchEffect } from 'vue';
  import Book from './icons/Book.vue';
  import Menu from './icons/Menu.vue';

  const props = defineProps({
    isActive: Boolean,
  });
  defineEmits(['toggleModal']);
  const header = ref(null);

  watchEffect(() => {
    if(props.isActive) 
      return hideHeader();
    
    return initialHeader();
  })

  function hideHeader() {
    header.value?.classList.remove('animate-header-init');
    header.value?.classList.add('animate-header-hide');
  }

  function initialHeader() {
    header.value?.classList.remove('animate-header-hide');
    header.value?.classList.add('animate-header-init');
  }

</script>
<template>
  <header
    id="container"
    ref="header"
  >
    <nav id="navigation-container">
      <ul id="list-items">
        <span></span>
        <li class="nav-item">
          <Book/>
        </li>
        <li
          class="nav-item"
          @click="$emit('toggleModal')"
        >
          <Menu/>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
  @import '../assets/base.css';
  @import '../assets/transitions.css';

  #container {
    width: 85%;
    margin: 0px auto;
    padding: 15px 0px;

    background-color: var(--color-background);
    transition: all .3s;
  }

  #navigation-container,
  #list-items {
    display: flex;
  }

  #list-items {
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }

  .nav-item:first-child {
    display: flex;
    margin: 0 auto;
    background-color: tomato;
  }

  span {
    margin-left: 30px;
  }

  .nav-item {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .animate-header-hide {
    animation: hideToTop .3s forwards;
  }

  .animate-header-init {
    animation: slideTop .3s backwards;
  }

</style>