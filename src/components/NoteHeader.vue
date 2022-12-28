<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Menu from './icons/Menu.vue';
  import Check from './icons/Check.vue';
  import LeftArrow from './icons/LeftArrow.vue';
  import ContainerModal from './ContainerModal.vue';

  const props = defineProps({
    isNoteSaved: Boolean,
    isNoteEdited: Boolean
  });
  const emits = defineEmits([
    'handleSaveNote',
    'handleChangeNote',
    'handleDeleteNote'
  ]);

  const router = useRouter();
  const toggleModal = ref(false);

  function setToggleModal() {
    toggleModal.value = !toggleModal.value;
  }

  function goHome() {
    if (props.isNoteSaved == true && props.isNoteEdited == false)
      return router.push('/');
      
    props.isNoteSaved ? emits('handleChangeNote') : emits('handleSaveNote');
    router.push('/');
  }

</script>
<template>
  <header id="container">
    <nav id="navigation-container">
      <ul id="list-items">
        <li 
          class="nav-item"
          @click="goHome"
        >
          <LeftArrow/>
        </li>
        <template v-if="isNoteEdited">
          <li
            class="nav-item"
            @click="isNoteSaved ? $emit('handleChangeNote') : $emit('handleSaveNote')"
          >
            <Check/>
          </li>
        </template>
        <template v-else>
          <li
            class="nav-item"
            @click="setToggleModal"
          >
            <Menu/>
          </li>
        </template>
      </ul>
    </nav>
  </header>
  
  <ContainerModal 
    :isActive="toggleModal"
    @handleToggleModal="setToggleModal"
  >
    <ul class="container-menu">
      <li>
        <a>Mover para</a>
      </li>
      <li @click="$emit('handleDeleteNote')">
        <a>Excluir</a>
      </li>
    </ul>
  </ContainerModal>
</template>
<style scoped>
@import '../assets/base.css';
@import '../assets/transitions.css';

#container {
  width: 85%;
  margin: 0px auto;
  padding: 15px 0px;
  
  background-color: var(--color-base);
}

#navigation-container,
#list-items {
  display: flex;
}

#list-items {
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
  
/* Modal Styles */

.container-menu {
  position: absolute;
  top: 35px;
  right: calc(100% - 95%);

  background: var(--color-background-light);
  border-radius: 10px;
  overflow: hidden;
}

.container-menu li a {
  display: block;
  padding: 20px 24px 16px 24px;

  color: var(--color-heading);
  font-size: 1.4rem;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
}

.container-menu li:last-child a {
  padding: 16px 24px 20px 24px;
}

.container-menu li:hover {
  transition: all 0.2s;
  background: rgba(0, 0, 0, 0.2);
}
  
</style>