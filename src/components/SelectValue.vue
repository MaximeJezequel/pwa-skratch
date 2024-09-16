<template>
    <div class="select-value">
        <div class="grid-item" @click="$emit('selectValue', 'A')"></div>
        <div class="grid-item" @click="$emit('selectValue', '2')"></div>
        <div class="grid-item" @click="$emit('selectValue', '3')"></div>
        <div class="grid-item" @click="$emit('selectValue', '4')"></div>
        <div class="grid-item" @click="$emit('selectValue', '5')"></div>
        <div class="grid-item" @click="$emit('selectValue', '6')"></div>
        <div class="grid-item" @click="$emit('selectValue', '7')"></div>
        <div class="grid-item" @click="$emit('selectValue', '8')"></div>
        <div class="grid-item" @click="$emit('selectValue', '9')"></div>
        <div class="grid-item" @click="$emit('selectValue', '0')"></div>
        <div class="grid-item" @click="$emit('selectValue', 'J')"></div>
        <div class="grid-item" @click="$emit('selectValue', 'Q')"></div>
        <div class="grid-item" @click="$emit('selectValue', 'K')"></div>
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
