<script>
  import { setNoteItemMode } from '../store/actions';

  import Book from '../components/icons/Book.vue';
  import Menu from '../components/icons/Menu.vue';

  import TabNotes from '../components/TabNotes.vue';
  import HomeHeader from '../components/HomeHeader.vue';
  import ButtonCreate from '../components/ButtonCreate.vue';
  import ContainerModal from '../components/ContainerModal.vue';

  export default {
    data() {
      return {
        currentMode: '',
        toggleModal: false,
        toggleHeader: false,
      }
    },
    components: {
      Book,
      Menu,
      TabNotes,
      HomeHeader,
      ButtonCreate,
      ContainerModal,
    },
    mounted() {
      const getMode = localStorage.getItem('#_note-mode_#');
      this.currentMode = getMode || 'Grid';
    },
    computed: {
      actualMode() {
        const options = {
          'Grid': 'lista',
          'List': 'grade'
        }
        return options[this.currentMode];
      }
    },
    methods: {
      setToggleModal() {
        this.toggleModal = !this.toggleModal;
      },
      setToggleNoteMode(currentMode) {
        const options = {
          'Grid': 'List',
          'List': 'Grid',
        }

        setNoteItemMode(options[currentMode]);
        this.currentMode = options[currentMode];
        this.setToggleModal();
      },
      setToggleHeader(searchBarState) {
        if(searchBarState)
          return this.toggleHeader = true;
        
        return this.toggleHeader = false;
      },
      goCreateNote() {
        this.$router.push('/create-note');
      },
    }
  }

</script>

<template>
  <div>
    <HomeHeader
      :is-active="toggleHeader"
      @toggleModal='setToggleModal'

    />

    <main class="container">
      <TabNotes
        :noteItemMode="currentMode"
        @toggleHeader="setToggleHeader"
      ></TabNotes>
    </main>

    <ButtonCreate
      :is-active="!toggleHeader"
      @handleClick="goCreateNote"
    />

    <ContainerModal
      :is-active="toggleModal"
      @changeStateModal="setToggleModal"
    >
      <ul class="container-menu">
        <li @click="setToggleNoteMode(currentMode)">
          <a>Visualização em {{actualMode}}</a>
        </li>
        <li>
          <a>Feito por Marco &#60;3</a>
        </li>
      </ul>
    </ContainerModal>
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
  width: 93%;
  margin: 0 auto;
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

  padding: 30px 24px 20px 24px;

  color: var(--color-heading);
  font-size: 1.4rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
}

.container-menu li:last-child a {
  padding: 20px 24px 30px 24px;
}

.container-menu li:hover {
  transition: all .2s;

  background: rgba(0, 0, 0, 0.05)
}
</style>