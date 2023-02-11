<script setup>
  import { ref, onMounted, provide } from 'vue';
  import { getNewStorage, setNoteItemMode } from '../store/actions';
  import TabNotes from '../components/TabNotes.vue';
  import ModalNote from '../components/ModalNote.vue';
  import HomeHeader from '../components/HomeHeader.vue';

  const currentMode = ref('');
  const storageNotes = ref('');
  const toggleHeader = ref(false);
  const toggleModalNote = ref(false);

  onMounted(() => {
    const getMode = localStorage.getItem('#_note-mode_#');
    currentMode.value = getMode || 'Grid';
    setInitializeStorage();
  });
  provide('currentMode', currentMode);
  provide('storageNotes', storageNotes);
  provide('setToggleNoteMode', setToggleNoteMode);
  provide('setToggleModalNote', setToggleModalNote);
  provide('setInitializeStorage', setInitializeStorage);

  function setInitializeStorage() {
    storageNotes.value = getNewStorage('#_content-notes_#');
  }

  function setToggleNoteMode() {
    const options = {
      'Grid': 'List',
      'List': 'Grid'
    }
    
    setNoteItemMode(options[currentMode.value]);
    currentMode.value = options[currentMode.value];
  }

  function setToggleHeader(currentState) {
    if(currentState)
      return toggleHeader.value = true;
    
    return toggleHeader.value = false;
  }

  function setToggleModalNote() {
    toggleModalNote.value = !toggleModalNote.value;
  }

</script>

<template>
  <div>
    <HomeHeader :isActive="toggleHeader"/>

    <main class="container">
      <TabNotes @handleToggleHeader="setToggleHeader"></TabNotes>
    </main>

    <ModalNote :isActive="toggleModalNote"/>
  </div>
</template>

<style>
@import '../assets/transitions.css';
@import '../assets/base.css';

div {
  position: relative;
}

.container {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

@media (min-width: 720px) {
  .container {
    margin: 60px auto 0;
  }
}

</style>