<script>
  import { nanoid } from 'nanoid';
  import VueCookie from 'vue-cookie';

  export default {
    data() {
      return {}
    },
    created() {
      const initialNotesIsSetted = VueCookie.get('initialNotes');

      if (initialNotesIsSetted !== 'Yes')
        this.setInitialNotes();
    },
    methods: {
      async setInitialNotes() {
        const storageNotes = JSON.parse(localStorage.getItem('#_content-notes_#'));
        let newStorageNotes = [];

        newStorageNotes.push(
          { 
            id: await nanoid(),
            titleNote: 'Criando uma anotação',
            textNote: 'Clique em +, no canto inferior direito para criar uma anotação!',
            date: {"date": 6, "month": 8, "year": 2022, "hour": 19, "minutes": 5}
          },
          { 
            id: await nanoid(),
            titleNote: '',
            textNote: 'Experimente um novo estilo de layout das notas, alternando entre lista e grade no menu!',
            date: {"date": 6, "month": 8, "year": 2022, "hour":19, "minutes": 5}
          },
          { 
            id: await nanoid(),
            titleNote: 'Dica:',
            textNote: 'Experimente no modo "Design responsivo do navegador", :3',
            date: {"date": 6, "month": 8, "year": 2022, "hour":19, "minutes": 5}
          },
          ...storageNotes || [],
        );

        localStorage.setItem('#_content-notes_#', JSON.stringify(newStorageNotes));
        VueCookie.set('initialNotes', 'Yes', { expires: '1Y'});
      }
    }
  }
</script>

<template>
  <router-view v-slot="{Component}">
    <Transition :name="$route.name == 'Home' ? 'routeToRight' : 'routeToLeft'">
      <component :is="Component"/>
    </Transition>
  </router-view>
</template>

<style>
  @import './assets/transitions.css';
</style>