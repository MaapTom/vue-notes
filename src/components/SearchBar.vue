<script setup>
import { watch, ref } from "vue";
import Close from "./icons/Close.vue";
import Search from "./icons/Search.vue";

defineProps({
  placeholder: String,
});
const emits = defineEmits(['isChanged', 'isFocused']);

const input = ref(null);
const button = ref(null);
const searchBarText = ref("");

watch(searchBarText, (currentText) => {
  emits("isChanged", currentText);
});

function setClearInput() {
  searchBarText.value = "";
  input.value.value = "";
}

function handleClickInput() {
  setAnimate();
  emits("isFocused", true);
}

function setCloseSearchBar() {
  setClearInput();
  setEndAnimate();
  emits("isFocused", false);
}

function setAnimate() {
  button.value.classList.add("animate-button-cancel");
}

function setEndAnimate() {
  button.value.classList.remove("animate-button-cancel");
}
</script>

<template>
  <div id="search-container">
    <span class="wrapper">
      <input
        type="text"
        id="input-search"
        ref="input"
        class="input-search-bar"
        @click="handleClickInput"
        :placeholder="'Procure uma ' + placeholder"
        @input="(event) => (searchBarText = event.target.value)"
      />
      <label for="input-search" class="search-image">
        <Search />
      </label>
      <a v-show="searchBarText" class="button-clear" @click="setClearInput">
        <Close />
      </a>
    </span>
    <a ref="button" class="button-cancel" @click="setCloseSearchBar">
      Cancelar
    </a>
  </div>
</template>

<style scoped>
@import "../assets/base.css";

#search-container {
  display: flex;
  align-items: center;
  width: 100%;

  overflow: hidden;
}

.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  transition: all 0.3s;
}

.input-search-bar {
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
  width: 14px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 12px;
}

.button-clear {
  display: flex;
  align-items: center;
  position: absolute;
  right: 12px;

  background-color: var(--color-text);
  border-radius: 50%;
}

.button-cancel {
  margin-left: 5px;

  font-size: 1.4rem;
  color: var(--color-acent-2);
  cursor: pointer;
  transition: all 0.3s;
  animation: hideToRight 0.2s forwards;
  visibility: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.animate-button-cancel {
  animation: slideRight 0.2s forwards;
  visibility: visible;
}

@media (min-width: 720px) {
  #search-container {
    width: auto;
  }

  .wrapper {
    width: auto;
  }

  .input-search-bar {
    width: 100%;
    padding: 16px 58px;

    color: var(--color-text);
    font-size: 1.6rem;
    background-color: var(--color-background-soft);
    border-radius: 8px;
  }

  .input-search-bar:focus {
    border: 0.5px solid var(--color-background-relight);
  }

  .search-image{
    width: 16.4px;
    left: 24px;
  }

  .button-clear {
    right: 12px;
    width: 21px;
    background-color: transparent;
  }

}

</style>
