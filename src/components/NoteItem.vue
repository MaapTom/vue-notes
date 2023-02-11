<script setup>
  import { useRouter } from 'vue-router';
  import { useWindowSize } from '@vueuse/core';
  import { ref, onMounted, watch, computed, inject } from 'vue';
  import { formatTitleNote, formatTextNote } from '../utils/formatText';
  import filterDate from '../utils/filterDate';

  const props = defineProps({
    idNote: String,
    titleNote: String,
    textNote: String,
    date: Object,
    paramSearch: String
  });

  const li = ref(null);
  const router = useRouter();
  const dateCreated = ref('');
  const currentTextNote = ref('');
  const currentTitleNote = ref('');
  const { width } = useWindowSize();
  const currentMode = inject('currentMode');
  const setToggleModalNote = inject('setToggleModalNote');

  onMounted(() => {
    dateCreated.value = filterDate(props.date);
    currentTextNote.value = formatTextNote(props.titleNote, props.textNote);
    currentTitleNote.value = formatTitleNote(props.titleNote,props.textNote);

    console.log(currentTextNote.value?.length)
    setAcentColor(props.paramSearch);
  });

  watch(() => props.paramSearch, (currentParam) => {
    if(currentParam.trim() == '') {
      return (
        currentTextNote.value = formatTextNote(props.titleNote, props.textNote),
        currentTitleNote.value = formatTitleNote(props.titleNote,props.textNote)
      );
    }
    setAcentColor(currentParam);
  });

  const noteMode = computed(() => {
    return currentMode.value == 'Grid' ? 'grid-mode' : 'list-mode';
  });

  function setAcentColor(compareText) {
    const mirrorTextNote = formatTextNote(props.titleNote, props.textNote);
    const mirrorTitleNote = formatTitleNote(props.titleNote,props.textNote);

    currentTextNote.value = mirrorTextNote?.
      replace(
        compareText,
        `<span style="color: red">${compareText}</span>`
      );
    currentTitleNote.value = mirrorTitleNote?.
      replace(
        compareText,
        `<span style="color: red">${compareText}</span>`
      );
  }
  
  function setAnimate() {
    li.value?.classList.add('animate-note');
  };

  function setEndAnimate() {
    li.value?.classList.remove('animate-note');
  }

  function goNote(receivedIdNote) {
    setAnimate();

    if(width.value > 720) {
      setToggleModalNote();
      return router.push(`/note-desktop/${receivedIdNote}`);
    }

    setTimeout(() => {
      router.push(`/note/${receivedIdNote}`);
    }, 300);
  }

</script>

<template>
  <li
    class="note-item"
    :class="noteMode"
    @click="goNote(this.idNote)"
    @touchmove="setAnimate()" 
    @touchend="setEndAnimate()"
    ref="li"
  >
    <h1 v-html="currentTitleNote"></h1>
    <p v-html="currentTextNote"></p>
    <template v-if="noteMode == 'list-mode' && currentTextNote?.length >= 0">
      <span class="line-separator"></span>
    </template>
    <span class="note-date">
      {{ dateCreated }}
    </span>
  </li>
</template>

<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';

.note-item {
  margin: 0px 0px 11px 0px;

  background-color: var(--color-background-light);
  border-radius: 20px;
}
.note-item:last-child {
  margin-bottom: 50px;
}

.note-item h1 {
  margin-bottom: 6px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--color-heading); 
}

.note-item p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 6px;

  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 400;
  color: var(--color-text);
  overflow: hidden;
}

.note-item span {
  display: block;

  font-size: 1rem;
  color: var(--color-text);
}

.list-mode {
  padding: 17px 22px;
}

.grid-mode {
  padding: 17px 22px;
  break-inside: avoid-column;
  overflow: hidden;
}

.grid-mode h1 {
  display: -webkit-box;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.7rem;
  font-weight: 500;
  white-space: initial;
}

.grid-mode p {
  -webkit-line-clamp: 3;
  line-height: 2.5rem;
}

.grid-mode span {
  margin-top: 17px;
}

.animate-note {
  animation: hoverAnimate .4s forwards;
}

@media(min-width: 1137px) {
  .note-item.grid-mode {
    max-width: 245px !important;
  }
}

@media(min-width: 840px) {
  .note-item.grid-mode {
    flex: 1 1 245px !important;
  }
}

@media(min-width: 720px) {

  /* Geral */
  .animate-note {
    animation: none;
  }

  .note-item {
    transition: all .5s;
    border: 0.5px solid var(--color-background-light);
  }

  .note-item:hover {
    border: 0.5px solid var(--color-background-relight);
    box-sizing: border-box;
    background-color: var(--color-background-soft);
  }

  /*Grid Mode*/

  .note-item.grid-mode {
    display: flex;
    flex-direction: column;
    flex: 1 1 200px;
    max-width: 513px;
    height: 211px;
    margin: 0px 24px 16px 0px;
    padding: 24px;
  }

  .note-item.grid-mode:last-child {
    flex: 1 1 200px;
  }

  .note-item.grid-mode h1{
    margin-bottom: 12px;
  }

  .note-item.grid-mode span {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 1.2rem;
  }

  /* List Mode*/

  .note-item.list-mode {
    display: grid;
    grid-template-columns: max-content max-content 1fr;
    grid-template-areas: "title separator content" 
                          "date separator content";
    align-items: center;
    margin-bottom: 16px;
    padding: 24px;
    border-radius: 8px;
  }

  .note-item.list-mode h1 {
    grid-area: title;
    max-width: 30vw;
  }

  
  .line-separator {
    grid-area: separator;
    display: block;
    width: 1px;
    height: 38px;
    margin: 0px 12px;
    border: 1px dashed var(--vt-gray300);
  }
  
  .note-item.list-mode p {
    grid-area: content;
    line-height: 150%;
    margin-bottom: 0px;
  }
  .note-item.list-mode .note-date {
    grid-area: date;
    font-size: 1.2rem;
  }
}

</style>