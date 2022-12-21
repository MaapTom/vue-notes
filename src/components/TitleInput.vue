<script setup>
import { ref, watch, nextTick } from "vue";
import { useResizeObserver } from '@vueuse/core';

const props = defineProps({
  content: String,
});
const emit = defineEmits(["isChanged"]);

const textarea = ref(null);
const inputContent = ref("");

nextTick(() => {
  //Resize to initial render
  textarea.value.style.height = textarea.value.scrollHeight + "px";
});

watch(inputContent, () => {
  textarea.value.style.height = "auto";
  textarea.value.style.height = (textarea.value.scrollHeight) + "px";
});

useResizeObserver(textarea, () => {
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
});

function handleChangeContent(currentText) {
  emit("isChanged", currentText);
  inputContent.value = currentText;
}
</script>

<template>
  <textarea
    ref="textarea"
    class="input-title"
    placeholder="Title"
    @input="(event) => handleChangeContent(event.target.value)"
    v-model="content"
    rows="1"
  >
  </textarea>
</template>
<style scoped>
@import "../assets/base.css";

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
  outline: none;
  resize: none;
}
</style>
