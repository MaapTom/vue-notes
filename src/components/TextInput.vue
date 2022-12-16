<script setup>
import { ref, onMounted, watchEffect } from "vue";

const props = defineProps({
  content: String,
});
defineEmits(["isChanged"]);

const textarea = ref(null);
const inputContent = ref("");

onMounted(() => {
  setTimeout(() => {
    props.content == "" ? textarea.value.focus() : textarea;
  }, 300);
});

watchEffect(() => {
  props.content ? (inputContent.value = props.content) : inputContent.value;
});
</script>

<template>
  <textarea
    ref="textarea"
    class="input-textnote"
    @input="(event) => $emit('isChanged', event.target.value)"
    v-model="inputContent"
  >
  </textarea>
</template>

<style scoped>
@import "../assets/base.css";

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
