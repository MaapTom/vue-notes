<script>
  export default {
    data() {
      return {}
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