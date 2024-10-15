<template>
    <div class="select-value">
        <div
            v-for="value in ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']"
            :key="value"
            class="grid-item"
            @click.prevent="$emit('selectValue', value)"
            @touchstart.prevent="$emit('selectValue', value)"
        ></div>
    </div>
</template>

<style scoped>
.select-value {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns of equal width */
    grid-template-rows: repeat(15, 1fr); /* 5 rows by default */
    gap: 1px;
    grid-auto-flow: column;
    touch-action: none; /* Ensures touch events are not blocked */
    background-color: black;
}

.grid-item:nth-child(-n + 10) {
    /* For first 10 items */
    grid-row: span 3;
}

.grid-item:nth-child(n + 11) {
    /* Third column has only 3 rows */
    grid-row: span 5;
}
</style>
