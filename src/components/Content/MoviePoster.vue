<script setup>
    import { ref, onMounted } from 'vue';

    const props = defineProps(['poster'])
    const imagePrefix = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const posterURL = ref(`${ imagePrefix }${ props.poster.poster_path }`)
    const voteAverage = parseInt(props.poster.vote_average * 10)
    const isEmptyAverage = voteAverage === 0

    const canvasElement = ref();
    const context = ref();

    onMounted(() => {
        context.value = canvasElement.value?.getContext('2d') ?? undefined;

        render();
    });

    function render() {
        const ctx = context.value

        if (!ctx) {
            return;
        }

        ctx.beginPath();
        ctx.arc(19, 19, 16, 0, (2 * Math.PI) * (voteAverage / 100), false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        ctx.stroke();
    }
</script>

<template>  
    <div class="poster-wrapper text-black min-w-[150px] font-sans text-left mb-[50px]">
        <img class="w-[150px] h-[225px] rounded-lg mb-[25px]" :src="posterURL"/>
        <div fillColor="red" class="vote-percentage relative w-[38px] h-[38px] bg-[#081c22] rounded-[50%] text-white flex justify-center items-center">
            <span class="text-[13px] font-bold">{{ isEmptyAverage ? 'NR' : voteAverage }}</span>
            <span class="text-[6px] mt-[-5px]">{{ isEmptyAverage ? '' : '%' }}</span>
            <canvas ref="canvasElement" class="percentage-canvas absolute rotate-[270deg]" width="38" height="38"></canvas>
        </div>
        <div class="poster-title text-base font-bold">{{ props.poster.original_title }}</div>
        <div class="poster-release-date">{{ props.poster.release_date }}</div>
    </div>
</template>
