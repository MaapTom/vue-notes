<script>
  import { setChangeNote, setDeleteNote, getNewStorage } from '../store/actions.js';

  import Menu from '../components/icons/Menu.vue';
  import Check from '../components/icons/Check.vue';
  import LeftArrow from '../components/icons/LeftArrow.vue';
  
  import TextInput from '../components/TextInput.vue';
  import TitleInput from '../components/TitleInput.vue';
  import NoteHeader from '../components/NoteHeader.vue';
  import ContainerModal from '../components/ContainerModal.vue';

  export default {
    data() {
      return {
        textNote: '',
        titleNote: '',
        currentNote: '',
        paramsNoteId: '',
        toggleModal: false,
        isActiveBtnConfirm: false,
      }
    },
    components: {
      Menu,
      Check,
      LeftArrow,
      TextInput,
      TitleInput,
      NoteHeader,
      ContainerModal,
    },
    beforeMount() {
      this.paramsNoteId = this.$route.params.id;

      const getStorageNotes = getNewStorage("#_content-notes_#");
      const currentNote = getStorageNotes.filter((eachNote) => {
        return eachNote.id == this.paramsNoteId;
      })

      if (currentNote == '') {
        return this.$router.push('/not-found');
      }
      
      this.currentNote = currentNote[0];
    },
    mounted() {   
      this.textNote = this.currentNote.textNote;
      this.titleNote = this.currentNote.titleNote;

      this.$watch($data => [$data.titleNote, $data.textNote], () => {
        if (this.titleNote != this.currentNote.titleNote || this.currentNote.textNote != '') {
          this.isActiveBtnConfirm = true;
        } else {
          this.isActiveBtnConfirm = false;
        }
      })
    },
    methods: {
      goHome() {
        setTimeout(() => {
          this.$router.push('/');
        }, 0)
      },
      setToggleModal() {
        this.toggleModal = !this.toggleModal;
      },
      setTitleInput(content) {
        this.titleNote = content;
      },
      setTextNote(content) {
        this.textNote = content;
      },
      handleChangeNote() {
        const response = setChangeNote(this.paramsNoteId, this.titleNote, this.textNote);

        if (response.status) {
          this.isActiveBtnConfirm = false;
        }
      },
      handleDeleteNote() {
        const response = setDeleteNote(this.paramsNoteId);
        
        if (response.status) {
          this.goHome();
        }
      },
    }
  }
</script>

<template>
  <div>
    <NoteHeader
      :isNoteSaved="true"
      :isNoteEdited="isActiveBtnConfirm"
      @handleToggleModal="setToggleModal"
      @handleChangeNote="handleChangeNote"
    />

    <main class="inputs-container">
      <TitleInput
        :content="titleNote"
        @change-content-title-box="setTitleInput"
      />
      <TextInput
        :content="textNote"
        @change-content-text-box="setTextNote"
      />
    </main>

    <ContainerModal
      :isActive="toggleModal"
      @handleToggleModal="setToggleModal"
    >
      <ul class="container-menu">
        <li><a>Mover para</a></li>
        <li @click="handleDeleteNote"><a>Excluir</a></li>
      </ul>
    </ContainerModal>
  </div>
</template>

<style scoped>
@import '../assets/base.css';

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

.container-menu li a{
  display: block;

  padding: 20px 24px 16px 24px;
  color: var(--color-heading);
  font-size: 1.4rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.container-menu li:last-child a{
  padding: 16px 24px 20px 24px;
}

.container-menu li:hover {
  transition: all .2s;
  background: rgba(0, 0, 0, 0.2);
}
</style>