import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
    const cardImage = ref<string>("");

    const setCardImage = (cardValue: string, cardSuit: string): void => {
        cardImage.value = `https://deckofcardsapi.com/static/img/${cardValue}${cardSuit}.png`;
    };

    return { cardImage, setCardImage };
});
