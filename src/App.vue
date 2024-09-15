<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useCardStore } from "./stores/card";
import Scratch from "./components/Scratch.vue";
import SelectSuit from "./components/SelectSuit.vue";
import SelectValue from "./components/SelectValue.vue";

const cardStore = useCardStore();

const cardValue = ref<string>("Q");
const cardSuit = ref<string>("H");
const loadingValue = ref<boolean>(true);
const loadingSuit = ref<boolean>(false);

const selectValue = (selectedValue: string) => {
    cardValue.value = selectedValue;
    loadingValue.value = false;
    loadingSuit.value = true;
};

const selectSuit = (selectedSuit: string) => {
    cardSuit.value = selectedSuit;
    loadingSuit.value = false;
};

watch([cardValue, cardSuit], () => {
    cardStore.setCardImage(cardValue.value, cardSuit.value);
});

onMounted(() => {
    cardStore.setCardImage(cardValue.value, cardSuit.value);
});
</script>

<template>
    <div id="app">
        <div class="background" :style="{ backgroundImage: `url(${cardStore.cardImage})` }"></div>
        <Scratch v-if="!loadingValue && !loadingSuit" />
        <SelectValue v-if="loadingValue" @selectValue="selectValue" />
        <SelectSuit v-if="loadingSuit" @selectSuit="selectSuit" />
    </div>
</template>

<style scoped>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
#app {
    height: 100%;
    width: 100%;
    background-color: #000;
}
.background {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 110vw; /* 90% of viewport width */
    height: 110vh; /* 90% of viewport height */
    background-repeat: no-repeat;
    background-size: 80%; /* Ensures the entire image is visible */
    background-position: center; /* Centers the image */
    transform: translate(-50%, -50%); /* Centers the element */
    background-color: white;
}
</style>
