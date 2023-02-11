<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import Grid from './icons/Grid.vue';
import ArrowDown from './icons/ArrowDown.vue';

const toggleOptions = ref(false);
const elementSelect = ref(null);
const currentMode = inject('currentMode');
const setToggleNoteMode = inject('setToggleNoteMode');

onMounted(() => {
  window.addEventListener('click', (event) => {
    const parentNode = event.target.parentNode;
    if (parentNode != elementSelect.value)
      toggleOptions.value = false;
  })
})

const currentChoose = computed(() => {
  const options = {
    'Grid': 'grade',
    'List': 'lista'
  }
  return options[currentMode.value];
});

function handleToggleNoteMode(mode) {
  if (mode != currentMode.value)
    setToggleNoteMode();
}

</script>
<template>
  <div>
    <nav>
      <div
        ref="elementSelect"
        class="select"
        @click="toggleOptions = !toggleOptions"
      >
        <span><Grid/></span>
        <li>
          Visualização em {{ currentChoose }}
        </li>
        <span><ArrowDown /></span>
      </div>
      <Transition name="fade">
        <ul
          class="containerOptions"
          v-if="toggleOptions"
        >
          <li
            @click="handleToggleNoteMode('Grid')"
            class="list-option"
            :class="{ active: currentMode == 'Grid'}"
          >
            Grade
          </li>
          <li
            @click="handleToggleNoteMode('List')"
            class="list-option"
            :class="{ active: currentMode == 'List'}"
          >
            Lista
          </li>
        </ul>
      </Transition>
    </nav>
  </div>
    
</template>
<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';

nav {
  display: flex;
  align-items: center;
}

.select {
  position: relative;
  display: flex;
  align-items: center;
}

.select span{
  padding: 0 10px 0 12px;
}

.containerOptions {
  position: absolute;
  top: 36px;
  right: 6px;
  width: 80%;
  
  padding: 16px 21px;
  background-color: var(--color-background-light);
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 99;
}

.list-option, li {
  color: var(--color-heading);
  font-size: 1.6rem;
  cursor: pointer;
}

.list-option {
  width: 100%;
}

.list-option:hover {
  color: var(--color-text);
}

.list-option + .list-option {
  margin-top: 12px;
}

.list-option.active::before{
  content: '';
  position: absolute;
  left: 14px;
  width: 2px;
  height: 16px;
  background-color: var(--vt-gray400);
}

</style>