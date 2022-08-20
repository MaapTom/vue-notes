<script>
  import Close from './icons/Close.vue';

  export default {
    props: ['placeholder'],
    emits: ['changeSearchText', 'isFocused'],
    data() {
      return {
        searchBarText: '',
        isButtonCancelActive: false,
      }
    },
    components: {
      Close,
    },
    watch: {
      searchBarText(currentText) {
        this.$emit('changeSearchText', currentText)
      }
    },
    methods: {
      setClearInput() {
        this.searchBarText = '';
        this.$refs.inputSearchBar.value = '';
      },
      handleClickInput() {
        this.setAnimate();
        this.$emit('isFocused', true);
        this.isButtonCancelActive = true;
      },
      setCloseSearchBar() {
        this.setClearInput();
        this.setEndAnimate();
        this.$emit('isFocused', false);
        this.isButtonCancelActive = false;
      },
      setAnimate() {
        this.$refs.buttonCancel.classList.add('animate-button-cancel');
      },
      setEndAnimate() {
        this.$refs.buttonCancel.classList.remove('animate-button-cancel');
      }
    }
  }
</script>

<template>
  <div id="search-container">
    <span class="wrapper">
      <input
        type="text"
        id="input-search"
        ref="inputSearchBar"
        class="input-search-bar"
        @click="handleClickInput"
        :placeholder="'Procurar ' + placeholder"
        @input="event => searchBarText = event.target.value"
      >
      <label
        for="input-search"
        class="search-image"
      >
        <img src="./icons/search_icon.svg" alt="Search Icon">
      </label>
      <a
        v-show="searchBarText"
        class="button-clear"
        @click="setClearInput"
      >
        <Close/>
      </a>
    </span>
    <a
      ref="buttonCancel"
      class="button-cancel"
      @click="setCloseSearchBar"
    >
      Cancelar
    </a>
  </div>
</template>

<style scoped>
@import '../assets/base.css';

#search-container {
  display: flex;
  align-items: center;
  max-width: 100%;

  overflow: hidden;
}

.wrapper {
  width: 100%;
  position: relative;

  transition: all .3s;
}

.input-search-bar{
  width: 100%;
  padding: 12px 42px;

  color: var(--color-heading);
  font-size: 1.4rem;
  background-color: var(--color-background-soft);
  border-radius: 20px;
  border: none;
  outline: none;
}

.search-image {
  display: flex;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 12px;
}

.search-image img {
  width: 14px;
}

.button-clear {
  display: flex;
  align-items: center;
  position: absolute;
  top: 25%;
  right: 12px;
  
  background-color: var(--color-text);
  border-radius: 50%;
}

.button-cancel {
  margin-left: 5px;

  font-size: 1.4rem;
  color: var(--color-acent-2);
  cursor: pointer;
  transition: all .3s;
  animation: hideToRight .2s forwards;
  visibility: hidden;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.animate-button-cancel {
  animation: slideRight .2s forwards;
  visibility:visible;
}

</style>