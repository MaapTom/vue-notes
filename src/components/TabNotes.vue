<script setup>
  import { ref, watch, computed, onMounted, inject } from 'vue';
  import { getNewStorage } from '../store/actions.js';  
  import NoNotes from './icons/NoNotes.vue';
  import NoteItem from './NoteItem.vue';
  import SearchBar from './SearchBar.vue';
  import LineSeparator from './LineSeparator.vue';

  const emit = defineEmits(['handleToggleHeader']);

  let mirrorNotes = [];
  const currentNotes = ref([]);
  const paramSearchBar = ref('');
  const stateSearchBar = ref(false);
  const currentMode = inject('currentMode');

  onMounted(() => {
    const storageNotes = getNewStorage('#_content-notes_#');
    mirrorNotes = storageNotes;
    currentNotes.value = storageNotes.reverse();
  });

  watch(paramSearchBar, (currentParam) => {
    if(currentParam == '')
      return currentNotes.value = [...mirrorNotes].reverse();
    
    currentNotes.value = mirrorNotes.filter(({titleNote, textNote}) => {
      return (
        titleNote.indexOf(currentParam) != -1
        ||
        textNote.indexOf(currentParam) != -1
      );
    })
  });

  const styleNoteMode = computed(() => {
    return currentMode.value == 'Grid' ? 'grid-container' : 'list-container';
  });

  function handleToggleHeader(currentState) {
    emit('handleToggleHeader', currentState);
    stateSearchBar.value = currentState;
  }

</script>

<template>
  <section class="notes-container">
    <div class="list-notes">
      <SearchBar
        placeholder="anotações"
        @isFocused="handleToggleHeader"
        @isChanged="(currentText) => paramSearchBar = currentText"
      />
      <LineSeparator v-show="stateSearchBar"/>
      <template v-if="currentNotes.length">
        <ul :class="styleNoteMode">
          <NoteItem 
            v-for="note in currentNotes"
            :key="note.id"
            :date="note.date"
            :idNote="note.id"
            :textNote="note.textNote"
            :titleNote="note.titleNote"
            :paramSearch="paramSearchBar"
          />
        </ul>
      </template>
      <template v-else>
        <div class="message">
          <NoNotes/>
          <h3>Nenhuma anotação aqui ainda</h3>
        </div>
      </template>
    </div>
  </section>

</template>

<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';
.notes-container {
  position: absolute;
  width: 100%;
  height: 100vh;
}
.list-notes {
  height: 100%;
  padding-bottom: 50px;

  overflow-y: auto;
  scrollbar-color: transparent transparent;
}
.list-notes::-webkit-scrollbar {
  display: none;
}

.grid-container {
  margin: 15px 0px 80px 0px;
	column-count: 2;
}

.list-container {
  margin: 15px 0px 80px 0px;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;

  animation: fade .2s forwards;
}

h3 {
  max-width: 160px;
  margin-top: 10px;

  text-align: center;
  font-size: 1.4rem;
  font-weight: normal;
  color: var(--color-text);
}

</style>
