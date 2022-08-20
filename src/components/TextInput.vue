<script>
  export default {
    emits: ['changeContentTextBox'],
    props: ['content'],
    data() {
      return {
        inputContent: '',
      }
    },
    created() {
      setTimeout(() =>  {
        this.content == '' ? this.$refs.textNote.focus() : '';
      }, 300)
    },
    watch: {
      content: {
        handler() {
          this.inputContent = this.content;
        }
      }
    },
    methods: {
      emitChangeContent(inputEvent) {
        let contentInserted = inputEvent.target.value;

        this.$emit('changeContentTextBox', contentInserted);
      }
    }
  }
</script>

<template>
  <textarea
    ref="textNote"
    class="input-textnote"
    @input="event => emitChangeContent(event)"
    v-model="inputContent"
  >
  </textarea>
</template>

<style scoped>
  @import '../assets/base.css';

  ::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
  .input-textnote {
    width: 100%;
    min-height: 80%;
    margin-top: 20px;
    padding-bottom: 150px;
    
    font-size: 1.7rem;
    font-weight: normal;
    line-height: 3rem;
    background-color: var(--color-base);
    color: var(--color-heading);
    border: none;
    outline: none;
    resize: none;
  }
</style>