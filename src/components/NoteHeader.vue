<script>
  import Menu from './icons/Menu.vue';
  import Check from './icons/Check.vue';
  import LeftArrow from './icons/LeftArrow.vue';

  export default {
    props: ['isNoteSaved', 'btnConfirmActive'],
    emits: ['saveNote', 'changeNote', 'deleteNote', 'toggleModal'],
    data() {
      return {}
    },
    components: {
      Menu,
      Check,
      LeftArrow
    },
    methods: {
      emitSaveNote() {
        this.$emit('saveNote');
      },
      emitChangeNote() {
        if (this.btnConfirmActive)
          this.$emit('changeNote');
      },
      emitDeleteNote() {
        this.$emit('deleteNote');
      },
      emitToggleModal() {
        this.$emit('toggleModal');
      },
      goHome() {
        setTimeout(() => {
          this.$router.push('/');
        })
      }
    }
  }
</script>
<template>
  <header id="container">
    <nav id="navigation-container">
      <ul id="list-items">
        <li
          class="nav-item"
          v-on="isNoteSaved ? {click: emitChangeNote} : {click: emitSaveNote}"
        >
          <LeftArrow @click="goHome"/>
        </li>
        <template v-if="btnConfirmActive">
          <li
            class="nav-item"
            v-on="isNoteSaved ? {click: emitChangeNote} : {click: emitSaveNote}"
          >
            <Check/>
          </li>
        </template>
        <template v-else>
          <li
            class="nav-item"
            @click="emitToggleModal"
          >
            <Menu/>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
  @import '../assets/base.css';
  @import '../assets/transitions.css';

  #container {
    width: 85%;
    margin: 0px auto;
    padding: 15px 0px;
    
    background-color: var(--color-base);
  }

  #navigation-container,
  #list-items {
    display: flex;
  }

  #list-items {
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }

  .nav-item {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
</style>