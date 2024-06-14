import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const usePosterStore = defineStore("posters", () => {
    const loadFromLocalStorage = () => {
        const storedItems = localStorage.getItem('posterItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };

    const posterItems = ref(loadFromLocalStorage());
    const getItems = computed(() => [...posterItems.value].sort((a, b) => b.id - a.id));
    const addItems = (item) => !posterItems.value.includes(item) && posterItems.value.push(item);
    const removeItems = (id) => posterItems.value = posterItems.value.filter((x) => x !== id);

    watch(posterItems, (newItems) => {
        localStorage.setItem('posterItems', JSON.stringify(newItems));
    }, { deep: true });

    return { posterItems, getItems, addItems, removeItems };
});
