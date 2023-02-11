<script setup>
  import { useResizeObserver } from '@vueuse/core';
  import { useChangeObserver } from '../utils/changeObserver';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, provide, inject, watchEffect, onMounted } from 'vue';
  import { getNewStorage, setChangeNote, setNote, setDeleteNote } from "../store/actions.js";
  import TextInput from './TextInput.vue';
  import TitleInput from './TitleInput.vue';
  import ContainerModal from './ContainerModal.vue';
  import HeaderModalNote from './HeaderModalNote.vue';

  const props = defineProps({
    isActive: Boolean,
  });

  const route = useRoute();
  const router = useRouter();
  const paramsNoteId = ref("");
  const currentNewId = ref("");
  const noteContent = {
    textNote: ref(""),
    titleNote: ref(""),
    lastSavedText: ref(""),
    lastSavedTitle: ref("")
  }
  const isNoteSaved = ref(false);
  const { isNoteChanged } = useChangeObserver(
    noteContent.lastSavedTitle,
    noteContent.lastSavedText,
    noteContent.titleNote,
    noteContent.textNote
  );
  const setToggleModalNote = inject('setToggleModalNote');
  const setInitializeStorage = inject('setInitializeStorage');
  provide('setHandleCloseModal', setHandleCloseModal);
  
  onMounted(() => {
    if(route.params.id != undefined) {
      setToggleModalNote();
    }
  })

  watchEffect(() => { 
    paramsNoteId.value = route.params.id;
    isNoteSaved.value = paramsNoteId.value ? true : false;

    const storageNotes = getNewStorage('#_content-notes_#');
    const filteredNotes = storageNotes.filter((eachNote) => {
      return eachNote.id == paramsNoteId.value;
    });
    
    if(paramsNoteId.value && filteredNotes.length == 0)
    return router.push('/note-found')
    
    if(filteredNotes.length && paramsNoteId.value) {
      noteContent.textNote.value = filteredNotes[0].textNote;
      noteContent.titleNote.value = filteredNotes[0].titleNote;
      noteContent.lastSavedText.value = filteredNotes[0].textNote;
      noteContent.lastSavedTitle.value = filteredNotes[0].titleNote;
    }
  })
  
  const view = document.querySelectorAll('html');
  useResizeObserver(view[0], (entries) => {
    const { width } = entries[0].contentRect;
      if(width <= 720 && props.isActive) {
        setPreviousSave();
      }
  })

  async function handleSaveNote() {
    const response = await setNote(noteContent.titleNote.value, noteContent.textNote.value);

    if (response.status) {
      isNoteSaved.value = true;
      isNoteChanged.value = false;
      currentNewId.value = response.noteId;

      router.push(`/note-desktop/${currentNewId.value}`);
      setInitializeStorage();
    }
  }

  function handleChangeNote() {
    const response = setChangeNote(
      paramsNoteId.value,
      noteContent.titleNote.value,
      noteContent.textNote.value
    );
    
    if (response.status) {
      isNoteChanged.value = false;
      noteContent.lastSavedText.value = noteContent.textNote.value;
      noteContent.lastSavedTitle.value = noteContent.titleNote.value;
      setInitializeStorage();
    }
  }

  function handleDeleteNote() {
    const response = setDeleteNote(paramsNoteId.value);
    
    if (response.status) {
      setHandleCloseModal();
      setInitializeStorage();
    }
  }

  function setHandleCloseModal() {
    noteContent.textNote.value = "";
    noteContent.titleNote.value = "";

    router.push('/');
    setToggleModalNote();
  }

  function setPreviousSave() {
    if(isNoteSaved.value) {
      handleChangeNote();
    } else {
      handleSaveNote();
    }
    
    setHandleCloseModal();
  }

</script>
<template>
  <ContainerModal
    :isActive="isActive"
    @handleToggleModal="setPreviousSave"
  >
    <section
      id="container"
      v-if="isActive"
    >
      <HeaderModalNote
        :isNoteEdited="isNoteChanged"
        :isNoteSaved="isNoteSaved"
        @handleSaveNote="handleSaveNote"
        @handleChangeNote="handleChangeNote"
        @handleDeleteNote="handleDeleteNote"
      />
      <TitleInput
        :content="noteContent.titleNote.value"
        @isChanged="(currentText) => noteContent.titleNote.value = currentText"
      />
      <TextInput
        :content="noteContent.textNote.value"
        @isChanged="(currentText) => noteContent.textNote.value = currentText"
        focus
      />
    </section>
  </ContainerModal>
</template>
<style scoped>
  @import '../assets/base.css';
  @import '../assets/transitions.css';

  #container {
    position: absolute;
    bottom: 0px;
    left: 40%;
    width: 40vmax;
    height: 77vh;
    padding: 40px;
    background-color: var(--color-base);
    border-radius: 4px;
    overflow: scroll;
    scrollbar-color: transparent transparent;
  }

  @media(max-width: 1440px) {
    #container {
      width: 50vw;
    }
  }

  @media (prefers-color-scheme: dark) {
    #container {
      background-color: var(--color-background-soft);
    }
  }

</style>