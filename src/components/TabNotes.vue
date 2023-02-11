<script setup>
  import { useRouter } from 'vue-router';
  import { useWindowSize } from '@vueuse/core';
  import { ref, watch, watchEffect, computed, inject } from 'vue';
  import NoNotes from './icons/NoNotes.vue';
  import NoteItem from './NoteItem.vue';
  import SearchBar from './SearchBar.vue';
  import FilterSelect from './ModeSelect.vue';
  import LineSeparator from './LineSeparator.vue';
  import ButtonCreate from '../components/ButtonCreate.vue';

  const emit = defineEmits(['handleToggleHeader']);

  let mirrorNotes = [];
  const router = useRouter(); 
  const currentNotes = ref([]);
  const paramSearchBar = ref('');
  const { width } = useWindowSize();
  const stateSearchBar = ref(false);
  const currentMode = inject('currentMode');
  const storageNotes = inject('storageNotes');
  const setToggleModalNote = inject('setToggleModalNote');

  watchEffect(() => {
    mirrorNotes = storageNotes.value;
    currentNotes.value = storageNotes.value ? mirrorNotes.reverse() : '';
  });

  watch(paramSearchBar, (currentParam) => {
    if(currentParam == '')
      return currentNotes.value = mirrorNotes;
    
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

  function goCreateNote() {
    if(width.value > 720)
      return setToggleModalNote();

    router.push('/create-note');
  }

</script>

<template>
  <section class="notes-container">
    <div class="content">
      <div class="sub-header">
        <SearchBar
          placeholder="anotação"
          @isFocused="handleToggleHeader"
          @isChanged="(currentText) => paramSearchBar = currentText"
        />
        <FilterSelect v-if="width >= 720"/>
      </div>
      <LineSeparator v-show="stateSearchBar && width < 720"/>
      <div class="wrapper-container">
        <template v-if="currentNotes.length">
          <ul :class="styleNoteMode">
            <NoteItem 
              v-for="note in currentNotes"
              :key="note.date"
              :date="note.date"
              :idNote="note.id"
              :textNote="note.textNote"
              :titleNote="note.titleNote"
              :paramSearch="paramSearchBar"
            /> 
            <span class="ghost-item"></span>
            <span class="ghost-item"></span>
          </ul>
        </template>
        <template v-else>
          <div class="message">
            <NoNotes/>
            <h3>Nenhuma anotação aqui ainda</h3>
          </div>
        </template>
        <ButtonCreate
          :isActive="!stateSearchBar"
          @handleClick="goCreateNote"
        />
      </div>
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
.content {
  height: 100%;
  padding-bottom: 50px;

  overflow-y: auto;
  scrollbar-color: transparent transparent;
}
.content::-webkit-scrollbar {
  display: none;
}

.sub-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

@media(min-width: 840px) {
  .ghost-item {
    flex: 1 1 245px !important;
  }
}

@media(min-width: 720px) {
  .content {
    overflow-y: unset;
  }

  .sub-header {
    margin-bottom: 32px;
  }

  .wrapper-container {
    display: flex;
    gap: 36px;
  }

  .message {
    flex: 1;
  }

  .wrapper-container ul {
    flex: 1;
    height: 80vh;
    margin-top: 0px;
    padding-bottom: 80px;
    overflow-y: auto;
  }

  .grid-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .ghost-item {
    display: flex;
    flex: 1 1 200px;
    background-color: aliceblue;
    margin: 0px 24px 16px 0px;
    visibility: hidden;
  }
}

</style>
