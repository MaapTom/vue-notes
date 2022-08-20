<script>
  import Book from './icons/Book.vue';
  import Menu from './icons/Menu.vue';

  export default {
    props: ['initAnimate'],
    emits: ['toggleModal'],
    data() {
      return {
      }
    },
    components: {
      Book,
      Menu,
    },
    watch: {
      initAnimate: {
        handler(currentState) {
          if (currentState)
            return this.hideHeader();
          
          return this.initialHeader();
        }
      }
    },
    methods: {
      emitToggleModal() {
        this.$emit('toggleModal');
      },
      hideHeader() {
        this.$refs.headerElement.classList.remove('animate-header-init');
        this.$refs.headerElement.classList.add('animate-header-hide');
      },
      initialHeader() {
        this.$refs.headerElement.classList.remove('animate-header-hide');
        this.$refs.headerElement.classList.add('animate-header-init');
      }
    }
  }
</script>
<template>
  <header
    id="container"
    ref="headerElement"
  >
    <nav id="navigation-container">
      <ul id="list-items">
        <span></span>
        <li class="nav-item">
          <Book/>
        </li>
        <li
          class="nav-item"
          @click="emitToggleModal"
        >
          <Menu/>
        </li>
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

    background-color: var(--color-background);
    transition: all .3s;
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

  .nav-item:first-child {
    display: flex;
    margin: 0 auto;
    background-color: tomato;
  }

  span {
    margin-left: 30px;
  }

  .nav-item {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .animate-header-hide {
    animation: hideToTop .3s forwards;
  }

  .animate-header-init {
    animation: slideTop .3s backwards;
  }

</style>