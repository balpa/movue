<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { usePosterStore } from '../../stores/posterStore.js';

    const posterStore = usePosterStore();
    const props = defineProps(['poster']);

    const {
        poster_path, vote_average, release_date, first_air_date, original_title, name, id
    } = props.poster;

    const imagePrefix = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const posterURL = ref(`${ imagePrefix }${ poster_path }`);
    const vote = parseInt(vote_average * 10);
    const voteAverage = vote === 0 ? 'NR' : vote;
    const percentage = vote === 0 ? '' : '%';
    const formattedDate = convertDate(release_date ?? first_air_date);
    const title = original_title ?? name;

    const canvasElement = ref();
    const context = ref();
    const isCurrentPosterFavorited = ref(false);

    watch(() => isCurrentPosterFavorited.value, () => {
        isCurrentPosterFavorited.value = checkIsFavorited();
    }, { immediate: true });

    onMounted(() => {
        context.value = canvasElement.value?.getContext('2d');

        render();
    });

    function render() {
        const ctx = context.value;

        if (!ctx) {
            return;
        }

        ctx.beginPath();
        ctx.arc(19, 19, 16, 0, (2 * Math.PI) * (voteAverage / 100), false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = voteAverage >= 70 ? "green" : "yellow";
        ctx.stroke();
    }

    function convertDate(dateString) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}, ${year}`;
    }

    function addToFavorites() {
        if (!checkIsFavorited()) {
            posterStore.addItems(id);
        } else {
            posterStore.removeItems(id);
        }

        isCurrentPosterFavorited.value = checkIsFavorited();
    }

    function checkIsFavorited() {
        const favoritedPosters = posterStore.getItems;

        return favoritedPosters.includes(id);
    }
</script>

<template>
    <div class="poster-wrapper text-black min-w-[150px] font-sans text-left mb-[50px]">
        <div class="poster-content relative">
            <img class="w-[150px] h-[225px] rounded-lg mb-[25px]" :src="posterURL"/>
            <div fillColor="red" class="vote-percentage mt-[-40px] relative w-[38px] h-[38px] bg-[#081c22] rounded-[50%] text-white flex justify-center items-center">
                <span class="text-[13px] font-bold">{{ voteAverage }}</span>
                <span class="text-[6px] mt-[-5px]">{{ percentage }}</span>
                <canvas ref="canvasElement" class="percentage-canvas absolute rotate-[270deg]" width="38" height="38"></canvas>
            </div>
            <div class="poster-title text-base font-bold">{{ title }}</div>
            <div class="poster-release-date">{{ formattedDate }}</div>
            <div @click="addToFavorites"  :class="{ 'favorited': isCurrentPosterFavorited }" class="poster-star text-[24px] absolute top-0 right-[5px] text-white cursor-pointer">&#9733;</div>
        </div>
    </div>
</template>
