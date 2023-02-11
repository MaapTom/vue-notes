<script setup>
  import { useWindowSize } from '@vueuse/core';
  import { ref, watchEffect, computed, inject } from 'vue';
  import Logo from './icons/Logo.vue';
  import Book from './icons/Book.vue';
  import Menu from './icons/Menu.vue';
  import ContainerModal from './ContainerModal.vue';

  const props = defineProps({
    isActive: Boolean,
  });
  const emits = defineEmits([
    'handleToggleModal',
    'handleToggleNoteMode'
  ]);
  
  const header = ref(null);
  const toggleModal = ref(false);
  const { width } = useWindowSize();
  const currentMode = inject('currentMode');
  const setToggleNoteMode = inject('setToggleNoteMode');

  const nextMode = computed(() => {
    const options = {
      'List': 'grade',
      'Grid': 'lista'
    }

    return options[currentMode.value];
  });

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
  
  function setToggleModal() {
    toggleModal.value = !toggleModal.value;
  }

  function handleToggleNoteMode() {
    setToggleNoteMode();
    setToggleModal();
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
          <Book v-if="width < 720"/>
          <Logo v-else/>
        </li>
        <li
          class="nav-item"
          @click="setToggleModal"
          v-if="width < 720"
        >
          <Menu/>
        </li>
      </ul>
    </nav>
  </header>
  
  <ContainerModal
    :isActive="toggleModal"
    @handleToggleModal="setToggleModal"
  >
    <ul class="container-menu">
      <li @click="handleToggleNoteMode">
        <a>Visualização em {{ nextMode }}</a>
      </li>
      <li>
        <a>Feito por Marco &#60;3</a>
      </li>
    </ul>
  </ContainerModal>
</template>
<style scoped>
  @import '../assets/base.css';
  @import '../assets/transitions.css';

  #container {
    width: 90%;
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
  
  
  /* Modal Styles */

  .container-menu {
    position: absolute;
    top: 35px;
    right: calc(100% - 95%);

    background: var(--color-background-light);
    border-radius: 10px;
    overflow: hidden;
  }

  .container-menu li a {
    display: block;

    padding: 30px 24px 20px 24px;

    color: var(--color-heading);
    font-size: 1.4rem;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    user-select: none;
  }

  .container-menu li:last-child a {
    padding: 20px 24px 30px 24px;
  }

  .container-menu li:hover {
    transition: all .2s;

    background: rgba(0, 0, 0, 0.05)
  }

  @media(min-width: 720px) {
    #container {
      margin: 30px auto 0px;
    }

   #list-items span {
      display: none;
    }

  }

</style>