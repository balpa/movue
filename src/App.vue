<script setup>
    import { ref, computed } from 'vue';
    import Main from './layouts/Main.vue';
    import TVShows from './layouts/TVShows.vue';

    const routes = {
        '/': Main,
        '/movies': Main,
        '/tvshows': TVShows,
    }

    const currentPath = ref(window.location.hash)

    window.addEventListener('hashchange', () => currentPath.value = window.location.hash)

    const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || Main)
</script>

<template>
    <component :is="currentView" />
</template>
