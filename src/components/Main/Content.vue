<script setup>
    import { ref, watch } from 'vue'
    import { getMovies } from '../../functions/fetchData.js'
    import MoviePoster from '../Content/MoviePoster.vue'
    import SearchBar from '../Content/SearchBar.vue'

    const { welcomeText, welcomeSubText, searchBarInputPlaceholder, searchButtonText } = {
        welcomeText: 'Welcome.',
        welcomeSubText: 'Millions of movies, TV shows and people to discover. Explore now.',
    };

    const currentPath = ref(window.location.hash);
    const loading = ref(false);
    const movies = ref(null);
    const error = ref(null);
    const algorithm = ref('popular');
    const popularButtonActive = ref(true);
    const topRatedButtonActive = ref(false);

    window.addEventListener('hashchange', () => currentPath.value = window.location.hash);

    watch(() => (currentPath.value.slice(1) ?? '/').replace('/', ''), fetchData, { immediate: true });
    watch(() => algorithm.value, fetchData, { immediate: true });

    async function fetchData (algorithm) {
        error.value = movies.value = null;
        loading.value = true;

        try {
            movies.value = await getMovies(algorithm);
        } catch (err) {
            error.value = err.toString();
        } finally {
            loading.value = false;
        }
    }

    function setSelectedAlgorithm (event) {
        algorithm.value = event.target.innerText;
        popularButtonActive.value = algorithm.value === 'popular';
        topRatedButtonActive.value = algorithm.value === 'top rated';
    }
</script>

<template>
    <div class="welcome-content-wrapper flex flex-col gap-12 items-center justify-center max-w-[1280px] h-[400px] bg-contain m-auto bg-[url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/pQvqGK6KQDILL7SJrhMQsRvJfLB.jpg')]">
        <div class="welcome-text-wrapper w-11/12 flex flex-col items-start">
            <h3 class="welcome-text text-5xl font-bold text-white">{{ welcomeText }}</h3>
            <h4 class="welcome-sub-text text-3xl font-bold text-white">{{ welcomeSubText }}</h4>
        </div>
        <div class="search-bar-wrapper w-11/12 flex relative">
            <SearchBar />
        </div>
    </div>
    <div class="oscar-wrapper"></div>
    <div class="posters-algorithm-wrapper flex max-w-[1280px] m-auto text-black p-[10px] gap-[20px] items-center">
        <div class="posters-algorithm-text text-[24px] font-bold">Popular</div>
        <div class="poster-algorihtm-options flex gap-[10px]">
            <div @click="setSelectedAlgorithm" :class="{ 'active': popularButtonActive }" class="poster-algorithm-option pt-[4px] pb-[4px] pl-[15px] pr-[15px] rounded-2xl text-black bg-white border border-black hover:cursor-pointer">popular</div>
            <div @click="setSelectedAlgorithm" :class="{ 'active': topRatedButtonActive }" class="poster-algorithm-option pt-[4px] pb-[4px] pl-[15px] pr-[15px] rounded-2xl text-black bg-white border border-black hover:cursor-pointer">top rated</div>
        </div>
    </div>
    <div class="posters-wrapper flex max-w-[1280px] m-auto overflow-x-scroll gap-5 bg-no-repeat bg-bottom bg-[url('https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg')]">
        <MoviePoster v-for="poster in movies?.results" :key="poster.id" :poster="poster"/>
    </div>
</template>
