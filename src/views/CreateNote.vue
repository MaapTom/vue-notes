<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useChangeObserver } from "../utils/changeObserver.js";
import { setNote, setChangeNote, setDeleteNote } from "../store/actions.js";
import TextInput from "../components/TextInput.vue";
import TitleInput from "../components/TitleInput.vue";
import NoteHeader from "../components/NoteHeader.vue";

const router = useRouter();
const textNote = ref("");
const titleNote = ref("");
const lastSavedText = ref("");
const lastSavedTitle = ref("");
const currentNoteId = ref("");
const isNoteSaved = ref(false);
const {
  isNoteChanged
} = useChangeObserver(lastSavedTitle, lastSavedText, titleNote, textNote);

async function handleSaveNote() {
  const response = await setNote(titleNote.value, textNote.value);

  if (response.status) {
    isNoteSaved.value = true;
    isNoteChanged.value = false;
    currentNoteId.value = response.noteId;
    lastSavedText.value = textNote.value;
    lastSavedTitle.value = titleNote.value;
  }
}

function handleChangeNote() {
  const response = setChangeNote(
    currentNoteId.value,
    titleNote.value,
    textNote.value
  );

  if (response.status){
    return (
      isNoteChanged.value = false,
      lastSavedText.value = textNote.value,
      lastSavedTitle.value = titleNote.value
    );
  }
}

function handleDeleteNote() {
  if (isNoteSaved.value == false) return goHome();
  const response = setDeleteNote(currentNoteId.value);

  if (response.status) {
    titleNote.value = "";
    textNote.value = "";
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
      :isNoteSaved="isNoteSaved"
      :isNoteEdited="isNoteChanged"
      @handleSaveNote="handleSaveNote"
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
        focus
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

  background-color: var(--color-base);
}

/* Inputs */

.inputs-container {
  position: fixed;
  max-width: 85%;
  height: 100%;
  left: 8%;
  right: 8%;

  overflow: auto;
  scrollbar-color: transparent transparent;
}

::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}
</style>
