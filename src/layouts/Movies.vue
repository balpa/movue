<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { getMovieByTypeAndAlgorithm } from '../functions/fetchData.js'
    import MoviePoster from '../components/Content/MoviePoster.vue'
    import Header from '../components/Main/Header.vue'

    const options = ['rating descending', 'rating ascending', 'popularity ascending', 'popularity descending', 'title (a-z)']

    const selectedOption = ref(null);
    const loading = ref(false);
    const movies = ref(null);
    const error = ref(null);

    window.addEventListener('hashchange', () => fetchData())

    onMounted(() => fetchData());

    watch(selectedOption, sortMovies);

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

    function sortMovies() {
        switch (selectedOption.value) {
            case 'popularity ascending':
                movies.value.results = [...movies.value.results].sort((a, b) => a.popularity - b.popularity);
                break;
            case 'popularity descending':
                movies.value.results = [...movies.value.results].sort((a, b) => b.popularity - a.popularity);
                break;
            case 'rating ascending':
                movies.value.results = [...movies.value.results].sort((a, b) => a.vote_average - b.vote_average);
                break;
            case 'rating descending':
                movies.value.results = [...movies.value.results].sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'title (a-z)':
                movies.value.results = [...movies.value.results].sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }
    }
</script>

<template>
    <div class="bg-white w-screen min-h-screen">
        <Header />
        <div class="flex w-full h-full">
            <div class="w-[400px] bg-slate-100 min-h-screen flex flex-col gap-[10px] items-center pt-[20px]">
                <div class="sort-wrapper w-[90%] rounded border-black border-2 text-black bg-white p-[10px]">
                    <label for="options">Sort Results By</label>
                    <select class="bg-white border-black border-[1px] rounded" v-model="selectedOption" id="options">
                        <option v-for="option in options" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="filter-wrapper w-[90%] rounded border-black border-2 text-black bg-white p-[10px]">
                    <div class="genres-wrapper">
                        <div class="genres-title"></div>
                    </div>
                </div>
            </div>
            <div class="w-[100%] h-full flex flex-wrap gap-[25px] p-[30px]">
                <MoviePoster v-for="poster in movies?.results" :key="poster.id" :poster="poster"/>
            </div>
        </div>
    </div>
</template>