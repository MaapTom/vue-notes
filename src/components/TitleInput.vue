<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  content: String,
});
const emit = defineEmits(["isChanged"]);

const textarea = ref(null);
const inputContent = ref("");

watchEffect(() => {
  props.content ? (inputContent.value = props.content) : inputContent.value;
  textarea.value
    ? (textarea.value.style.height = props.content.length + "px")
    : "";
});

function handleChangeContent(currentText) {
  emit("isChanged", currentText);
  inputContent.value = currentText;
  resizeInput();
}

function resizeInput() {
  let currentScrollHeight = textarea.value.scrollHeight;

  textarea.value.style.height = "5px";
  textarea.value.style.height = currentScrollHeight + "px";
}
</script>

<template>
  <textarea
    ref="textarea"
    class="input-title"
    placeholder="Title"
    @input="(event) => handleChangeContent(event.target.value)"
    v-model="inputContent"
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
  border: none;
  outline: none;
  resize: none;
}
</style>
