<script setup>
    const { welcomeText, welcomeSubText, searchBarInputPlaceholder, searchButtonText } = {
        welcomeText: 'Welcome.',
        welcomeSubText: 'Millions of movies, TV shows and people to discover. Explore now.',
        searchBarInputPlaceholder: 'Search for a movie, tv show, person...',
        searchButtonText: 'Search',
    };
</script>

<template>
    <div class="welcome-content-wrapper flex flex-col gap-12 items-center justify-center max-w-[1280px] h-[400px] bg-contain m-auto bg-[url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/pQvqGK6KQDILL7SJrhMQsRvJfLB.jpg')]">
        <div class="welcome-text-wrapper w-11/12 flex flex-col items-start">
            <h3 class="welcome-text text-5xl font-bold text-white">{{ welcomeText }}</h3>
            <h4 class="welcome-sub-text text-3xl font-bold text-white">{{ welcomeSubText }}</h4>
        </div>
        <div class="search-bar-wrapper w-11/12 flex relative">
            <input class="shadow appearance-none rounded-3xl w-full h-[46px] bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" :placeholder="searchBarInputPlaceholder">
            <button class="w-[100px] h-[46px] rounded-3xl absolute right-0 focus:outline-none bg-gradient-to-r from-[rgba(30,213,169,1)] to-[rgba(1,180,228,1)] hover:border-none hover:text-black transition duration-500">{{ searchButtonText }}</button>
        </div>
    </div>
    <div class="oscar-wrapper"></div>
</template>
