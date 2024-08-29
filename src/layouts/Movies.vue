<script setup>
    import { ref, onMounted } from 'vue'
    import { getMovieByTypeAndAlgorithm } from '../functions/fetchData.js'
    import MoviePoster from '../components/Content/MoviePoster.vue'
    import Header from '../components/Main/Header.vue'

    const loading = ref(false);
    const movies = ref(null);
    const error = ref(null);

    window.addEventListener('hashchange', () => fetchData())

    onMounted(() => fetchData());

    async function fetchData() {
        const url = window.location.href;
        const params = url.split('/').slice(4);
        const movieType = params[0];
        const algorithm = params[1];

        error.value = movies.value = null;
        loading.value = true;

        try {
            movies.value = await getMovieByTypeAndAlgorithm(movieType, algorithm);
        } catch (err) {
            error.value = err.toString();
        } finally {
            loading.value = false;
        }
    }

    function sortByPopularity() {
        movies.value.results = [...movies.value.results].sort((a, b) => b.popularity - a.popularity);
    }
</script>

<template>
    <div class="bg-white w-screen min-h-screen">
        <Header />
        <div class="flex w-full h-full">
            <div class="w-[200px] bg-red-500 min-h-screen">
                <div @click="sortByPopularity">popularity desc test</div>
            </div>
            <div class="w-[100%] h-full flex flex-wrap gap-[25px] p-[30px]">
                <MoviePoster v-for="poster in movies?.results" :key="poster.id" :poster="poster"/>
            </div>
        </div>
    </div>
</template>