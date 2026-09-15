import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import TasksPage from '../views/TasksPage.vue';
import AddTaskPage from '../views/AddTaskPage.vue';
import SubjectsPage from '../views/SubjectsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage,
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: AddTaskPage,
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: SubjectsPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;