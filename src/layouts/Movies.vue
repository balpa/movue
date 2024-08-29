<script setup>
    import { ref, watch } from 'vue'
    import { getMovieByTypeAndAlgorithm } from '../functions/fetchData.js'
    import MoviePoster from '../components/Content/MoviePoster.vue'
    import Header from '../components/Main/Header.vue'

    const url = window.location.href;
    const params = ref(url.split('/').slice(4));
    const loading = ref(false);
    const movies = ref(null);
    const error = ref(null);

    watch(() => params.value, fetchData, { immediate: true });

    async function fetchData (parameters) {
        const movieType = parameters[0];
        const algorithm = parameters[1];

        error.value = movies.value = null;
        loading.value = true;

        try {
            movies.value = await getMovieByTypeAndAlgorithm(movieType, algorithm);
            console.log(movies.value)
        } catch (err) {
            error.value = err.toString();
        } finally {
            loading.value = false;
        }
    }
    
</script>

<template>
    <div class="bg-white w-screen h-screen">
        <Header />
        <MoviePoster v-for="poster in movies?.results" :key="poster.id" :poster="poster"/>
    </div>
</template>