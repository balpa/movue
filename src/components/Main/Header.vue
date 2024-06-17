<script setup>
    import { ref } from 'vue';

    const config = {
        headerIconURL: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
    };

    const menuItems = ref([
        {
            name: 'Movies',
            url: '#/movies'
        },
        {
            name: 'TV Shows',
            url: '#/tvshows'
        },
    ]);

    const { headerIconURL } = config;
</script>

<template>  
    <div class="header w-screen m-auto h-16 bg-[#032541] flex">
        <div class="header-left flex gap-5 items-center justify-center w-6/12 h-full">
            <img class="img h-5" :src="headerIconURL"/>
            <ul class="menu-item-wrapper" v-for="item in menuItems">
                <a
                    class="menu-item text-base font-bold cursor-pointer"
                    :href="item.url"
                >
                    {{ item.name }}
                </a>
            </ul>
        </div>
        <div class="header-right w-5/12 h-full"></div>
    </div>
</template>
