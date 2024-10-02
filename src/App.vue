<script setup>
    import { ref, computed } from 'vue';
    import Main from './layouts/Main.vue';
    import TVShows from './layouts/TVShows.vue';
    import Movies from './layouts/Movies.vue';
    import MovieDetails from './layouts/MovieDetails.vue';

    const routes = {
        '/': Main,
        '/movies': Main,
        '/tvshows': TVShows,
        '/movies/tv-shows/:algorithm': Movies,
        '/movies/movies/:algorithm': Movies,
        '/movies/movie-details/:movie': MovieDetails
    }

    const currentPath = ref(window.location.hash)

    window.addEventListener('hashchange', () => {
        currentPath.value = window.location.hash
    })

    const currentView = computed(() => {
        if (currentPath.value.includes('/movies/')) {
            return routes['/movies/movies/:algorithm']
        } else if (currentPath.value.includes('/tv-shows/')) {
            return routes['/movies/tv-shows/:algorithm']
        } else if (currentPath.value.includes('/movie-details/')) {
            return routes['/movies/movie-details/:movie']
        }

        return routes[currentPath.value.slice(1) || '/']
    })
</script>

<template>
    <component :is="currentView" />
</template>
