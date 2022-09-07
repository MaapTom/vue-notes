<script>
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
      setInitialNotes() {
        const storageNotes = localStorage.getItem('#_content-notes_#');
        let newDateToExpires = new Date(2090,0,1);
        let initialStorage = [
          { 
            id: 1,
            titleNote: 'Criando uma anotação',
            textNote: 'Clique em +, no canto inferior direito para criar uma anotação!',
            date: {"date": 6, "month": 8, "year": 2022, "hour": 19, "minutes": 5}
          },
          { 
            id: 10,
            titleNote: '',
            textNote: 'Experimente um novo estilo de layout das notas, alternando entre lista e grade no menu!',
            date: {"date": 6, "month": 8, "year": 2022, "hour":19, "minutes": 5}
          },
          { 
            id: 11,
            titleNote: 'Dica:',
            textNote: 'Experimente no modo "Design responsivo do navegador", :3',
            date: {"date": 6, "month": 8, "year": 2022, "hour":19, "minutes": 5}
          },
          ...storageNotes || []
        ];

        localStorage.setItem('#_content-notes_#', JSON.stringify(initialStorage));
        VueCookie.set('initialNotes', 'Yes', newDateToExpires.toGMTString());
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