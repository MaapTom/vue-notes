<script>
  import filterDate from '../utils/filterDate';
  import { formatTitleNote, formatTextNote } from '../utils/formatText';

  export default {
    props: ['idNote','titleNote', 'textNote', 'date', 'paramSearch', 'mode'],
    data() {
      return {
        currentDate: '',
        currentTextNote: '',
        currentTitleNote: '',
        mirrorTextNote: '',
        mirrorTitleNote: '',
      }
    },
    mounted() {
      this.currentDate = filterDate(this.date);
      this.currentTextNote = formatTextNote(this.titleNote, this.textNote);
      this.currentTitleNote = formatTitleNote(this.titleNote, this.textNote);

      this.mirrorTextNote = formatTextNote(this.titleNote, this.textNote);
      this.mirrorTitleNote = formatTitleNote(this.titleNote, this.textNote);

      this.setAcentColor(this.paramSearch);
    },
    watch: {
      paramSearch(currentParam) {
        this.setAcentColor(currentParam);
      }
    },
    computed: {
      noteMode() {
        const options = {
          'Grid': 'grid-mode',
          'List': 'list-mode',
        }

        return options[this.mode];
      }
    },
    methods: {
      setAnimate() {
        this.$refs.noteItem.classList.add('animate-note');
      },
      setEndAnimate() {
        this.$refs.noteItem.classList.remove('animate-note');
      },
      goNote(receivedIdNote) {
        this.setAnimate();
        setTimeout(() => {
          this.$router.push(`/note/${receivedIdNote}`);
        }, 300)
      },
      setAcentColor(compareText) {
        if (compareText.trim() == '') {
          return (
            this.currentTitleNote = this.mirrorTitleNote,
            this.currentTextNote = this.mirrorTextNote
          );
        }

        this.currentTitleNote = 
          this.mirrorTitleNote
            ?
            this.mirrorTitleNote.replace(compareText, `<span style="color: red">${compareText}</span>`)
            : 
            this.mirrorTitleNote;
          
        this.currentTextNote = 
          this.mirrorTextNote 
            ?
            this.mirrorTextNote.replace(compareText, `<span style="color: red">${compareText}</span>`)
            : 
            this.mirrorTextNote;
      }
    }
  }
</script>

<template>
  <li
    class="note-item"
    :class="noteMode"
    @click="goNote(this.idNote)"
    @touchmove="setAnimate()" 
    @touchend="setEndAnimate()"
    ref="noteItem"
  >
    <h1 v-html="currentTitleNote"></h1>
    <p v-html="currentTextNote"></p>
    <span>
      {{ currentDate }}
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