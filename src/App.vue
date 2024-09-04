<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useCardStore } from "./stores/card";

const cardStore = useCardStore();
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

// Variables for touch gesture detection
let touchStartX = 0;
let touchEndX = 0;
const threshold = 50; // Minimum distance in pixels for a swipe to be considered
const edgeThreshold = 30; // Distance from the edge to start detecting the swipe

const initCanvas = () => {
    if (!canvas.value) return;

    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;

    const context = canvas.value.getContext("2d");
    if (context) {
        ctx.value = context;
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);

        // Initialize drawing context once
        context.strokeStyle = "white";
        context.lineWidth = 36;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.globalCompositeOperation = "destination-out"; // erazer mode
    }
};

const handleDrawing = () => {
    let lastX = 0;
    let lastY = 0;

    const drawStart = (event: TouchEvent) => {
        if (!ctx.value) return;

        const touch = event.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;

        ctx.value.beginPath();
        ctx.value.moveTo(lastX, lastY);
    };

    const drawMove = (event: TouchEvent) => {
        if (!ctx.value) return;

        const touch = event.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        ctx.value.lineTo(currentX, currentY);
        ctx.value.stroke();

        lastX = currentX;
        lastY = currentY;
    };

    const drawEnd = () => {
        ctx.value?.closePath();
    };

    return { drawStart, drawMove, drawEnd };
};

const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
    touchEndX = event.touches[0].clientX;
};

const handleTouchEnd = () => {
    // Detect swipe direction
    if (touchStartX < edgeThreshold && touchEndX - touchStartX > threshold) {
        // Swipe right from the left edge (left-to-right swipe)
        window.location.reload();
    } else if (touchStartX > window.innerWidth - edgeThreshold && touchStartX - touchEndX > threshold) {
        // Swipe left from the right edge (right-to-left swipe)
        window.location.reload();
    }
};

onMounted(() => {
    cardStore.setRandomCard();
    initCanvas();

    const { drawStart, drawMove, drawEnd } = handleDrawing();

    // Attach event listeners for drawing
    canvas.value?.addEventListener("touchstart", drawStart);
    canvas.value?.addEventListener("touchmove", drawMove);
    canvas.value?.addEventListener("touchend", drawEnd);

    // Attach event listeners for swipe gestures
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
    const { drawStart, drawMove, drawEnd } = handleDrawing();

    // Remove event listeners for drawing
    canvas.value?.removeEventListener("touchstart", drawStart);
    canvas.value?.removeEventListener("touchmove", drawMove);
    canvas.value?.removeEventListener("touchend", drawEnd);

    // Remove event listeners for swipe gestures
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
});
</script>

<template>
    <div id="app">
        <div class="background" :style="{ backgroundImage: `url(${cardStore.cardImage})` }"></div>
        <canvas id="canvas" ref="canvas" class="foreground"></canvas>
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
    background-size: 85%; /* Ensures the entire image is visible */
    background-position: center; /* Centers the image */
    transform: translate(-50%, -50%); /* Centers the element */
    background-color: #fff;
}
.foreground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    touch-action: none; /* Ensures touch events are not blocked */
}
</style>

