<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  content: String,
  focus: Boolean,
});
defineEmits(["isChanged"]);

const textarea = ref(null);

onMounted(() => {
  if (props.focus)
    setTimeout(() => {
      textarea.value.focus();
    }, 300);
});

</script>

<template>
  <textarea
    ref="textarea"
    class="input-textnote"
    @input="(event) => $emit('isChanged', event.target.value)"
    :value="content"
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
