<template>
    <div class="select-suit">
        <div v-for="suit in ['S', 'H', 'D', 'C']" :key="suit" class="grid-item" @click.prevent="$emit('selectSuit', suit)" @touchstart.prevent="$emit('selectSuit', suit)"></div>
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
