<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChangeObserver } from "../utils/changeObserver.js";
import { setChangeNote, setDeleteNote, getNewStorage } from "../store/actions.js";
import TextInput from "../components/TextInput.vue";
import TitleInput from "../components/TitleInput.vue";
import NoteHeader from "../components/NoteHeader.vue";

const route = useRoute();
const router = useRouter();
const textNote = ref("");
const titleNote = ref("");
const lastSavedText = ref("");
const lastSavedTitle = ref("");
const currentNote = ref("");
const paramsNoteId = ref("");
const {
  isNoteChanged
} = useChangeObserver(lastSavedTitle, lastSavedText, titleNote, textNote);

onMounted(() => {
  paramsNoteId.value = route.params.id;
  const storageNotes = getNewStorage('#_content-notes_#');
  const filteredNotes = storageNotes.filter((eachNote) => {
    return eachNote.id == paramsNoteId.value;
  });
    
  if (filteredNotes == "") {
    return router.push("not-found");
  }
  
  currentNote.value = filteredNotes[0];
  textNote.value = currentNote.value.textNote;
  titleNote.value = currentNote.value.titleNote;
  lastSavedText.value = currentNote.value.textNote;
  lastSavedTitle.value = currentNote.value.titleNote;
})

function handleChangeNote() {
  const response = setChangeNote(
    paramsNoteId.value,
    titleNote.value,
    textNote.value
  );
  
  if (response.status) {
    isNoteChanged.value = false;
    lastSavedText.value = textNote.value;
    lastSavedTitle.value = titleNote.value;
  }
}

function handleDeleteNote() {
  const response = setDeleteNote(paramsNoteId.value);
  
  if (response.status) {
    goHome();
  }
}

function goHome() {
  router.push("/");
}
</script>

<template>
  <div>
    <NoteHeader
      :isNoteSaved="true"
      :isNoteEdited="isNoteChanged"
      @handleChangeNote="handleChangeNote"
      @handleDeleteNote="handleDeleteNote"
    />

    <main class="inputs-container">
      <TitleInput
        :content="titleNote"
        @isChanged="(currentText) => titleNote = currentText"
      />
      <TextInput
        :content="textNote"
        @isChanged="(currentText) => textNote = currentText"
      />
    </main>
  </div>
</template>

<style scoped>
@import "../assets/base.css";

div {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  overflow: scroll;
  background-color: var(--color-base);
  scrollbar-color: transparent transparent;
}

.inputs-container {
  position: fixed;
  max-width: 85%;
  height: 100%;
  left: 8%;
  right: 8%;

  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
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

  padding: 20px 24px 16px 24px;
  color: var(--color-heading);
  font-size: 1.4rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.container-menu li:last-child a {
  padding: 16px 24px 20px 24px;
}

.container-menu li:hover {
  transition: all 0.2s;
  background: rgba(0, 0, 0, 0.2);
}
</style>
