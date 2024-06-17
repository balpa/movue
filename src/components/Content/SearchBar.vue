<script setup>
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
    import { search } from '../../functions/fetchData.js'
    import debounce from "lodash.debounce";
    import SearchResult from './SearchResult.vue';

    const searchBarInputPlaceholder = 'Search for a movie, tv show, person...';
    const searchButtonText = 'Search';

    const inputValue = ref('');
    const searchResults = ref([]);

    const debouncedCallback = debounce(async () => {
	    if (inputValue.value.length > 3) {
            const response = await search(inputValue.value);

            searchResults.value = response.results;
        } else if (inputValue.value.length === 0) {
            searchResults.value = [];
        }
    }, 500)

    watch(inputValue, debouncedCallback)

    onBeforeUnmount(() => {
        debouncedCallback.cancel();
    })
</script>

<template>
    <div class="w-full">
        <input v-model="inputValue" class="shadow appearance-none rounded-3xl w-full h-[46px] bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" :placeholder="searchBarInputPlaceholder">
        <button class="w-[100px] h-[46px] rounded-3xl absolute right-0 focus:outline-none bg-gradient-to-r from-[rgba(30,213,169,1)] to-[rgba(1,180,228,1)] hover:border-none hover:text-black transition duration-500">{{ searchButtonText }}</button>
        <div class="search-results-wrapper w-full bg-[#fff] absolute z-10 rounded-3xl mt-[10px] shadow-xl overflow-hidden">
            <SearchResult v-if="searchResults.length > 0" v-for="searchedItem in searchResults" :key="searchedItem.id" :searchedItem="searchedItem"/>
        </div>
    </div>
</template>
