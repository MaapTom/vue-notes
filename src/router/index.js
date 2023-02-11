import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/Home.vue";
import Note from "../views/Note.vue";
import NotFound from "../views/NotFound.vue"
import CreateNote from "../views/CreateNote.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create-note',
    name: 'CreateNote',
    component: CreateNote,
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note,
  },
  {
    path: '/note-desktop/:id',
    name: 'Note-desktop',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
  {
    path: '/not-found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;