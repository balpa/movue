<script setup>
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

    const props = defineProps(['searchedItem']);
    const { id, name } = props.searchedItem;

    async function search() {
        let result = {};

        await fetch(`https://api.themoviedb.org/3/find/${ id }?&api_key=${ import.meta.env.VITE_API_TOKEN }`)
            .then(response => response.json())
            .then(response => result = response)
            .catch(err => console.error(err))

        console.log(result);
    }
</script>

<template>
    <div class="w-full border-b pl-[30px] pt-[3px] pb-[3px] text-left cursor-pointer hover:bg-[#eee]">
        <div class="text-black">&#128270; {{ name }}</div>
    </div>
</template>