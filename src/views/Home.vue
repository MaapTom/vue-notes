<script setup>
  import { ref, onMounted, computed, provide } from 'vue';
  import { useRouter } from 'vue-router';
  
  import { setNoteItemMode } from '../store/actions';
  import TabNotes from '../components/TabNotes.vue';
  import HomeHeader from '../components/HomeHeader.vue';
  import ButtonCreate from '../components/ButtonCreate.vue';

  const router = useRouter(); 
  const currentMode = ref('');
  const toggleHeader = ref(false);

  onMounted(() => {
    const getMode = localStorage.getItem('#_note-mode_#');
    currentMode.value = getMode || 'Grid';
  });
  
  provide('currentMode', currentMode);
  const formatNameMode = computed(() => {
    const options = {
      'Grid': 'lista',
      'List': 'grade'
    }
    return options[currentMode.value];
  });

  function setToggleNoteMode() {
    const options = {
      'Grid': 'List',
      'List': 'Grid'
    }
    
    setNoteItemMode(options[currentMode.value]);
    currentMode.value = options[currentMode.value];
  }

  function setToggleHeader(currentState) {
    if(currentState)
      return toggleHeader.value = true;
    
    return toggleHeader.value = false;
  }
  
  function goCreateNote() {
    router.push('/create-note');
  }

</script>

<template>
  <div>
    <HomeHeader
      :isActive="toggleHeader"
      :nextMode="formatNameMode"
      @handleToggleNoteMode="setToggleNoteMode"
    />

    <main class="container">
      <TabNotes @handleToggleHeader="setToggleHeader"></TabNotes>
    </main>

    <ButtonCreate
      :isActive="!toggleHeader"
      @handleClick="goCreateNote"
    />
  </div>
</template>

<style>
@import '../assets/transitions.css';
@import '../assets/base.css';

div {
  position: relative;
}

.container {
  position: relative;
  width: 93%;
  margin: 0 auto;
}
</style>