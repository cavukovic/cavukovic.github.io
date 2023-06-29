<script>
import Month from "./Month.vue";
export default {
    components: {
        Month,
    },
    data() {
        return {
            months: [
                // could probably calculate the offset
                { id: 1, name: "January", offset: 0, lastDay: 31 },
                { id: 2, name: "February", offset: 3, lastDay: 28 },
                { id: 3, name: "March", offset: 3, lastDay: 31 },
                { id: 4, name: "April", offset: 6, lastDay: 30 },
                { id: 5, name: "May", offset: 1, lastDay: 31 },
                { id: 6, name: "June", offset: 4, lastDay: 30 },
                { id: 7, name: "July", offset: 6, lastDay: 31 },
                { id: 8, name: "August", offset: 2, lastDay: 31 },
                { id: 9, name: "September", offset: 5, lastDay: 30 },
                { id: 10, name: "October", offset: 0, lastDay: 31 },
                { id: 11, name: "November", offset: 3, lastDay: 30 },
                { id: 12, name: "December", offset: 5, lastDay: 31 },
            ],
            currentMonth: 0,
        };
    },
    methods: {
        nextMonth() {
            if (this.currentMonth < 11) {
                this.currentMonth++;
            }
        },
        previousMonth() {
            if (this.currentMonth > 0) {
                this.currentMonth--;
            }
        },
    },
};
</script>

<template>
    <div class="container">
        <n-button type="info" class="left" @click="previousMonth"
            >&lt;</n-button
        >
        <h2 class="month-name">{{ months[currentMonth].name }}</h2>
        <n-button type="info" class="right" @click="nextMonth">&gt;</n-button>
    </div>

    <Month :month="months[currentMonth]" />
    <!-- {{ console.log(new Date().toLocaleDateString()) }} -->
</template>

<style>
.container {
    display: flex; /* Use flexbox */
    align-items: center;
    justify-content: space-evenly; /* Distribute components with space between them */
    padding-left: 10%;
    padding-right: 10%;
}
.left {
    display: flex; /* Use flexbox */
    align-items: center;
    justify-content: center;
}

.right {
    display: flex; /* Use flexbox */
    align-items: center;
    justify-content: center;
}

.month-name {
    display: flex; /* Use flexbox */
    align-items: center;
}
</style>
