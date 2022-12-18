<script>
import { setNote, setChangeNote, setDeleteNote } from "../store/actions.js";

import Menu from "../components/icons/Menu.vue";
import Check from "../components/icons/Check.vue";
import LeftArrow from "../components/icons/LeftArrow.vue";

import TextInput from "../components/TextInput.vue";
import NoteHeader from "../components/NoteHeader.vue";
import TitleInput from "../components/TitleInput.vue";
import ContainerModal from "../components/ContainerModal.vue";

export default {
  data() {
    return {
      textNote: "",
      titleNote: "",
      currentNoteId: "",
      isNoteSaved: false,
      toggleModal: false,
      isActiveBtnConfirm: false,
    };
  },
  components: {
    Menu,
    Check,
    LeftArrow,
    TextInput,
    NoteHeader,
    TitleInput,
    ContainerModal,
  },
  mounted() {
    this.$watch(
      ($data) => [$data.titleNote, $data.textNote],
      () => {
        if (this.titleNote.trim() != "" || this.textNote.trim() != "") {
          this.isActiveBtnConfirm = true;
        } else {
          this.isActiveBtnConfirm = false;
        }
      }
    );
  },
  methods: {
    goHome() {
      setTimeout(() => {
        this.$router.push("/");
      });
    },
    setTextNote(content) {
      this.textNote = content;
    },
    setTitleNote(content) {
      this.titleNote = content;
    },
    setToggleModal() {
      this.toggleModal = !this.toggleModal;
    },
    async handleSaveNote() {
      const response = await setNote(this.titleNote, this.textNote);

      if (response.status) {
        this.isNoteSaved = true;
        this.isActiveBtnConfirm = false;
        this.currentNoteId = response.noteId;
      }
    },
    handleChangeNote() {
      const response = setChangeNote(
        this.currentNoteId,
        this.titleNote,
        this.textNote
      );

      if (response.status) this.isActiveBtnConfirm = false;
    },
    handleDeleteNote() {
      if (!this.isNoteSaved) return this.$router.push("/");

      const response = setDeleteNote(this.currentNoteId);

      if (response.status) {
        this.titleNote = "";
        this.textNote = "";
        this.goHome();
      }
    },
  },
};
</script>

<template>
  <div>
    <NoteHeader
      :isNoteSaved="isNoteSaved"
      :isNoteEdited="isActiveBtnConfirm"
      @handleToggleModal="setToggleModal"
      @handleSaveNote="handleSaveNote"
      @handleChangeNote="handleChangeNote"
    />

    <main class="inputs-container">
      <TitleInput :content="titleNote" @isChanged="setTitleNote" />
      <TextInput :content="textNote" @isChanged="setTextNote" />
    </main>

    <ContainerModal :isActive="toggleModal" @handleToggleModal="setToggleModal">
      <ul class="container-menu">
        <li>
          <a>Mover para</a>
        </li>
        <li @click="handleDeleteNote">
          <a>Excluir</a>
        </li>
      </ul>
    </ContainerModal>
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
  user-select: none;
}

.container-menu li:last-child a {
  padding: 16px 24px 20px 24px;
}

.container-menu li:hover {
  transition: all 0.2s;
  background: rgba(0, 0, 0, 0.2);
}
</style>
