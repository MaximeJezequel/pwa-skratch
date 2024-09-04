// stores/cardStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
    const cardImage = ref<string>("");

    const setRandomCard = (): void => {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        cardImage.value = `https://deckofcardsapi.com/static/img/${randomValue}${randomSuit.charAt(0).toUpperCase()}.png`;
    };
    return { cardImage, setRandomCard };
});
