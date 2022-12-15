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
    'saveNote',
    'changeNote',
    'toggleModal'
  ]);

  const router = useRouter();

  function goHome() {
    if(props.isNoteSaved)
      emits('changeNote');
    
    emits('saveNote');

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
            @click="isNoteSaved ? $emit('changeNote') : $emit('saveNote')"
          >
            <Check/>
          </li>
        </template>
        <template v-else>
          <li
            class="nav-item"
            @click="$emit('toggleModal')"
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