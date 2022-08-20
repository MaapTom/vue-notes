<script>
  export default {  
    emits: ['changeContentTitleBox'],
    props: ['content'],
    data() {
      return {
        inputContent: '',
      }
    },
    watch: {
      content: {
        handler() {
          this.inputContent = this.content;
          this.$refs.inputTitle.style.height = this.content.length + "px";
        }
      }
    },
    methods: {
      emitChangeContent(inputEvent) {
        let contentInserted = inputEvent.target.value;

        this.$emit('changeContentTitleBox', contentInserted);
        this.setInputContent(contentInserted);
        this.resizeInput();
      },
      setInputContent(content) {
        this.inputContent = content;
      },
      resizeInput() {
        let currentScrollHeight = this.$refs.inputTitle.scrollHeight;

        this.$refs.inputTitle.style.height = "5px";
        this.$refs.inputTitle.style.height = currentScrollHeight + "px";
      }
    }
  }
</script>

<template>
  <textarea
    ref="inputTitle"
    class="input-title"
    placeholder="Title"
    @input="event => emitChangeContent(event)"
    v-model="inputContent"
    rows="1"
  >
  </textarea>  
</template>
<style scoped>
  @import '../assets/base.css';

  ::placeholder {
    opacity: 0.5;
  }

  .input-title {
    width: 100%;
    min-height: 24px;

    font-size: 2rem;
    font-weight: bold;
    background-color: var(--color-base);
    color: var(--color-heading);
    border: none;
    outline: none;
    resize: none;
  }
</style>