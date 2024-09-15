<template>
    <div class="select-suit">
        <div class="grid-item" @click="$emit('selectSuit', 'S')"></div>
        <div class="grid-item" @click="$emit('selectSuit', 'H')"></div>
        <div class="grid-item" @click="$emit('selectSuit', 'D')"></div>
        <div class="grid-item" @click="$emit('selectSuit', 'C')"></div>
    </div>
</template>

<style scoped>
.select-suit {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns of equal width */
    grid-template-rows: repeat(2, 1fr); /* 2 rows by default */
    gap: 1px;
    grid-auto-flow: row;
    touch-action: none; /* Ensures touch events are not blocked */
    background-color: black;
}

.grid-item {
    grid-column: span 1;
}
</style>
