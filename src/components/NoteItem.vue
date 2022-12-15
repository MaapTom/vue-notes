<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import filterDate from '../utils/filterDate';
  import { formatTitleNote, formatTextNote } from '../utils/formatText';

  const props = defineProps({
    idNote: String,
    titleNote: String,
    textNote: String,
    date: Object,
    paramSearch: String,
    mode: String,
  });

  const router = useRouter();
  const li = ref(null);
  const dateCreated = ref('');
  const currentTextNote = ref('');
  const currentTitleNote = ref('');

  onMounted(() => {
    dateCreated.value = filterDate(props.date);
    currentTextNote.value = formatTextNote(props.titleNote, props.textNote);
    currentTitleNote.value = formatTitleNote(props.titleNote,props.textNote);

    setAcentColor(props.paramSearch);
  });

  watch(() => props.paramSearch, (currentParam) => {
    if(currentParam?.trim() == '') {
      return (
        currentTextNote.value = formatTextNote(props.titleNote, props.textNote),
        currentTitleNote.value = formatTitleNote(props.titleNote,props.textNote)
      );
    }
    setAcentColor(currentParam);
  });

  const noteMode = computed(() => {
    return props.mode == 'Grid' ? 'grid-mode' : 'list-mode';
  });

  function setAnimate() {
    li.value?.classList.add('animate-note');
  };

  function setEndAnimate() {
    li.value?.classList.remove('animate-note');
  }

  function goNote(receivedIdNote) {
    setAnimate();
    setTimeout(() => {
      router.push(`/note/${receivedIdNote}`);
    }, 300)
  }

  function setAcentColor(compareText) {
    const mirrorTextNote = formatTextNote(props.titleNote, props.textNote);
    const mirrorTitleNote = formatTitleNote(props.titleNote,props.textNote);

    currentTextNote.value = mirrorTextNote.
      replace(
        compareText,
        `<span style="color: red">${compareText}</span>`
      );
    currentTitleNote.value = mirrorTitleNote.
      replace(
        compareText,
        `<span style="color: red">${compareText}</span>`
      );
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
    <span>
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
  font-size: 1.75rem;
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
  font-weight: normal;
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
  -webkit-line-clamp: 4;
  font-weight: 500;
  line-height: 2.5rem;
}

.grid-mode span {
  margin-top: 17px;
}

.animate-note {
  animation: hoverAnimate .4s forwards;
}
</style>