<script>
  import { getNewStorage } from '../store/actions.js';

  import NoNotes from "./icons/NoNotes.vue";

  import NoteItem from "./NoteItem.vue";
  import SearchBar from "./SearchBar.vue";
  import LineSeparator from "./LineSeparator.vue";

  export default {
    emits: ['toggleHeader'],
    props: ['noteItemMode'],
    data() {
      return {
        mirrorNotes: [],
        currentNotes: [],
        paramSearchBar: '',
        isSearchBarActive: false,
      }
    },
    components: {
      NoNotes,
      NoteItem,
      SearchBar,
      LineSeparator,
    },
    mounted() {
      this.mirrorNotes = getNewStorage('#_content-notes_#');
      const getStorageNotes = getNewStorage('#_content-notes_#');
      this.currentNotes = getStorageNotes ? getStorageNotes.reverse() : [];
    },
    computed: {
      styleNoteMode() {
        const options = {
          'Grid': 'grid-container',
          'List': 'list-container',
        }

        return options[this.noteItemMode];
      }
    },
    watch: {
      paramSearchBar(textSearched) {
        this.filterNotes(textSearched);
      }
    },
    methods: {
      setSearchText(currentParamSearch) {
        this.paramSearchBar = currentParamSearch;
      },
      filterNotes(currentParam) {
        if (currentParam == '')
          return this.currentNotes = this.mirrorNotes.reverse();

        this.currentNotes = this.mirrorNotes.filter((eachNote) => {
          return this.verifyExistsInNote(
            eachNote.titleNote,
            eachNote.textNote,
            currentParam
          );
        })
      },
      verifyExistsInNote(receivedTitleNote, receivedTextNote, compareText) {
        const NEGATIVE_NUM = -1;
        return (
          receivedTextNote.indexOf(compareText) != NEGATIVE_NUM
          ||
          receivedTitleNote.indexOf(compareText) != NEGATIVE_NUM
        );
      },
      handleSearchBar(stateSearchBar) {
        this.$emit('toggleHeader', stateSearchBar);
        this.isSearchBarActive = stateSearchBar;
      }
    }
  }
</script>

<template>
  <section class="notes-container">
    <div class="list-notes">
      <SearchBar
        placeholder="anotações"
        @isFocused="handleSearchBar"
        @changeSearchText="setSearchText"
      />
      <LineSeparator v-show="isSearchBarActive"/>
      <template v-if="currentNotes.length">
        <ul :class="styleNoteMode">
          <NoteItem 
            v-for="note in currentNotes"
            :key="note.id"
            :mode="noteItemMode"
            :date="note.date"
            :idNote="note.id"
            :textNote="note.textNote"
            :titleNote="note.titleNote"
            :paramSearch="paramSearchBar"
          />
        </ul>
      </template>
      <template v-else>
        <div class="message">
          <NoNotes/>
          <h3>Nenhuma anotação aqui ainda</h3>
        </div>
      </template>
    </div>
  </section>

</template>

<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';
.notes-container {
  position: absolute;
  width: 100%;
  height: 100vh;
}
.list-notes {
  height: 100%;
  padding-bottom: 50px;

  overflow-y: auto;
  scrollbar-color: transparent transparent;
}
.list-notes::-webkit-scrollbar {
  display: none;
}

.grid-container {
  margin: 15px 0px 80px 0px;
	column-count: 2;
}

.list-container {
  margin: 15px 0px 80px 0px;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;

  animation: fade .2s forwards;
}

h3 {
  max-width: 160px;
  margin-top: 10px;

  text-align: center;
  font-size: 1.4rem;
  font-weight: normal;
  color: var(--color-text);
}

</style>
