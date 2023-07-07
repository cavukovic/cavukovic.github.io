<script>
import Month from "./Month.vue";
import { IconArrowBigRightFilled, IconArrowBigLeftFilled } from "@tabler/icons-vue";
export default {
    components: {
        Month,
        IconArrowBigRightFilled,
        IconArrowBigLeftFilled,
    },
    props: {
        events: {
            type: Array,
            required: true,
        },
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
            currentWeek: 1,
            weeklyView: false,
        };
    },
    methods: {
        next() {
            if (this.weeklyView && this.currentWeek < this.calculateWeeks()) {
                this.currentWeek++;
            } else {
                const isDecember = this.currentMonth === 11;
                this.nextMonth();
                if (!isDecember) {
                    this.currentWeek = 1;
                }
            }
        },
        nextMonth() {
            if (this.currentMonth < 11) {
                this.currentMonth++;
            }
        },
        previous() {
            if (this.weeklyView && this.currentWeek > 1) {
                this.currentWeek--;
            } else {
                const isJanuary = this.currentMonth === 0;
                this.previousMonth();
                if (!isJanuary) {
                    this.currentWeek = this.calculateWeeks();
                }
            }
        },
        previousMonth() {
            if (this.currentMonth > 0) {
                this.currentMonth--;
            }
        },
        changeView() {
            this.currentWeek = 1;
            this.weeklyView = !this.weeklyView;
        },
        calculateWeeks() {
            if (this.months[this.currentMonth].offset + this.months[this.currentMonth].lastDay <= 35) {
                return 5;
            }
            return 6;
        },
    },
    computed: {
        leftArrow() {
            if (this.currentMonth == 0) {
                return "left-arrow";
            }
            return "arrow";
        },
        rightArrow() {
            if (this.currentMonth == 11) {
                return "right-arrow";
            }
            return "arrow";
        },
    },
};
</script>

<template>
    <div class="container">
        <n-button tertiary round>Some button</n-button>
        <div :class="leftArrow">
            <IconArrowBigLeftFilled @click="previous" />
        </div>
        <!-- https://tabler.io/docs/components/icons -->
        <h2 class="month-name">{{ months[currentMonth].name }}</h2>
        <div :class="rightArrow">
            <IconArrowBigRightFilled @click="next" />
        </div>
        <n-button tertiary round @click="changeView">Change View</n-button>
    </div>

    <Month
        :month="months[currentMonth]"
        :weeklyView="weeklyView"
        :events="events"
        :currentWeek="currentWeek"
    />
</template>

<style>
.container {
    display: flex; /* Use flexbox */
    align-items: center;
    justify-content: space-between; /* Distribute components with space between them */
    padding-left: 5%;
    padding-right: 5%;
}
.left-arrow {
    visibility: hidden;
}

.right-arrow {
    visibility: hidden;
}

.month-name {
    display: flex; /* Use flexbox */
    align-items: center;
    justify-content: space-evenly;
    min-width: 120px;
}
</style>
