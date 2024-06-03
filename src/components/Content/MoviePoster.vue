<script setup>
    import { ref } from 'vue';

    const props = defineProps(['poster'])
    const imagePrefix = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const posterURL = ref(`${ imagePrefix }${ props.poster.poster_path }`)
    const voteAverage = parseInt(props.poster.vote_average * 10)
</script>

<template>  
    <div class="poster-wrapper text-black min-w-[150px] font-sans text-left mb-[50px]">
        <img class="w-[150px] h-[225px] rounded-lg mb-[25px]" :src="posterURL"/>
        <div fillColor="red" class="vote-percentage before:content-['test'] before:absolute before:rounded-[50%] before:bg-[attr(fillColor)] before:w-[40px] before:h-[40px] w-[38px] h-[38px] bg-[#081c22] rounded-[50%] text-white flex justify-center items-center">
            <span class="text-[13px] font-bold">{{ voteAverage }}</span>
            <span class="text-[6px] mt-[-5px]">%</span>
        </div>
        <div class="poster-title text-base font-bold">{{ props.poster.original_title }}</div>
        <div class="poster-release-date">{{ props.poster.release_date }}</div>
    </div>
</template>
