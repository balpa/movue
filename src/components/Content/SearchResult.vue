<script setup>
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

    const props = defineProps(['searchedItem']);
    const { id, name } = props.searchedItem;
</script>

<template>
    <div class="w-full border-b pl-[30px] pt-[3px] pb-[3px] text-left cursor-pointer hover:bg-[#eee]">
        <div class="text-black">&#128270; {{ name }}</div>
    </div>
</template>
