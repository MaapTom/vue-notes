<script setup>
  import { inject } from 'vue';
  
  import Check from './icons/Check.vue';
  import Trash from './icons/Trash.vue';
  import LeftArrow from './icons/LeftArrow.vue';

  const props = defineProps({
    isNoteSaved: Boolean,
    isNoteEdited: Boolean
  });
  const emits = defineEmits([
    'handleSaveNote',
    'handleChangeNote',
    'handleDeleteNote'
  ]);

  const setHandleCloseModal = inject('setHandleCloseModal');

  function handleCloseModal() {
    if(props.isNoteSaved) {
      emits('handleChangeNote');
    } else {
      emits('handleSaveNote');
    }
    
    setHandleCloseModal();
  }

</script>
<template>
  <header id="header-container">
    <nav>
      <ul id="list-items">
        <li
          class="nav-item"
        >
          <a @click="handleCloseModal">
            <LeftArrow/>
          </a>
        </li>
        <li
          class="nav-item rounded"
          v-if="isNoteSaved"
          @click="$emit('handleDeleteNote')"
        >
          <span>
            <Trash/>
          </span>
          Excluir
        </li>
        <li
          class="nav-item rounded"
          v-if="isNoteEdited"
          @click="isNoteSaved ? $emit('handleChangeNote') : $emit('handleSaveNote')"
        >
          <Check/>
        </li>
      </ul>
    </nav>
  </header>  
</template>
<style scoped>
  @import '../assets/base.css';
  @import '../assets/transitions.css';
  
  #header-container {
    margin-bottom: 32px;
  }

  #list-items {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .nav-item:first-child {
    flex: 1;
  }

  .nav-item a {
    cursor: pointer;
  }

  .nav-item.rounded {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0px 10px;
    margin-left: 24px;
    font-size: 1.5rem;
    color: var(--color-heading);
    background-color: var(--color-background);
    border-radius: 4px;
    cursor: pointer;
    transition: all .2s;
  }

  .nav-item.rounded span {
    margin-right: 6px;
  }

  .nav-item.rounded:hover {
    background-color: var(--color-background-soft);
  }

  @media (prefers-color-scheme: dark) {
    .nav-item.rounded {
      color: var(--color-heading);
      background-color: transparent;
      border: 2px solid var(--color-background-light);
    }

    .nav-item.rounded:hover {
      background-color: var(--color-background-light);
    }
  }

</style>

