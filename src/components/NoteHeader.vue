<script setup>
  import { useRouter } from 'vue-router';
  import Menu from './icons/Menu.vue';
  import Check from './icons/Check.vue';
  import LeftArrow from './icons/LeftArrow.vue';

  const props = defineProps({
    isNoteSaved: Boolean,
    isNoteEdited: Boolean
  });
  const emits = defineEmits([
    'handleSaveNote',
    'handleChangeNote',
    'handleToggleModal'
  ]);

  const router = useRouter();

  function goHome() {
    props.isNoteSaved ? emits('handleChangeNote') : emits('handleSaveNote');

    setTimeout(() => {
      router.push('/');
    })
  }

</script>
<template>
  <header id="container">
    <nav id="navigation-container">
      <ul id="list-items">
        <li class="nav-item">
          <LeftArrow @click="goHome"/>
        </li>
        <template v-if="isNoteEdited">
          <li
            class="nav-item"
            @click="isNoteSaved ? $emit('handleChangeNote') : $emit('handleSaveNote')"
          >
            <Check/>
          </li>
        </template>
        <template v-else>
          <li
            class="nav-item"
            @click="$emit('handleToggleModal')"
          >
            <Menu/>
          </li>
        </template>
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
    
    background-color: var(--color-base);
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

  .nav-item {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
</style>