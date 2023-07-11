<template>
    <div class="month-container">
        <div class="month">
            <!-- pass the  7 numbers we need to week-->
            <div v-if="!weeklyView" v-for="index in calculateWeeks()" :key="index">
                <Week
                    :month="month"
                    :weekNum="index"
                    :weekly-offset="index - 1"
                    :weeklyView="weeklyView"
                    :dayColumnView="dayColumnView"
                    @pop-up="popUp"
                    @delete-event="deleteEvent"
                    @open-day-view="openDayView"
                    :events="events"
                >
                </Week>
            </div>
            <div v-else>
                <Week
                    :month="month"
                    :weekly-offset="currentWeek - 1"
                    @pop-up="popUp"
                    @delete-event="deleteEvent"
                    @open-day-view="openDayView"
                    :weekNum="currentWeek"
                    :weeklyView="weeklyView"
                    :dayColumnView="dayColumnView"
                    :events="events"
                >
                </Week>
            </div>
            <div v-if="displayPop" class="popup" :style="{ top: mouseY + 'px', left: mouseX + 'px' }">
                <iframe :src="this.holiday.infoLink" frameborder="1" width="700" height="500"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import Week from "./Week.vue";

export default {
    components: { Week },
    data() {
        return {
            displayPop: false,
            mouseX: 0,
            mouseY: 0,
            holiday: {},
        };
    },
    emits: ["delete-event", "open-day-view"],
    methods: {
        calculateWeeks() {
            if (this.month.offset + this.month.lastDay <= 35) {
                return 5;
            }
            return 6;
        },
        deleteEvent(event) {
            this.$emit("delete-event", event);
        },
        openDayView(date, events, holiday) {
            this.$emit("open-day-view", date, events, holiday);
        },
        popUp(holiday) {
            this.holiday = holiday;
            this.displayPop = !this.displayPop;

            // deal with how we want the pop up to display
            if (this.displayPop) {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight - 160; // 160 for height of header

                const sectionWidth = screenWidth / 2;
                const sectionHeight = screenHeight / 3;

                const mouseX = event.clientX;
                const mouseY = event.clientY;

                let section = "";

                // Check horizontal section
                if (mouseX < sectionWidth) {
                    section = "L" + section; // left
                } else {
                    section = "R" + section; // right
                }

                // Check vertical section
                if (mouseY < sectionHeight) {
                    section += "T"; // top
                } else if (mouseY < sectionHeight * 2) {
                    section += "M"; // middle
                } else {
                    section += "B"; // bottom
                }

                switch (section) {
                    case "LT":
                        this.mouseX = mouseX + 10;
                        this.mouseY = mouseY + 10;
                        break;
                    case "LM":
                        this.mouseX = mouseX + 30;
                        this.mouseY = mouseY - 250 - 10;
                        break;
                    case "LB":
                        this.mouseX = mouseX + 10;
                        this.mouseY = mouseY - 500 - 10;
                        break;
                    case "RT":
                        this.mouseX = mouseX - 700 - 20;
                        this.mouseY = mouseY + 10;
                        break;
                    case "RM":
                        this.mouseY = mouseY - 250 - 30;
                        this.mouseX = mouseX - 700 - 20;
                        break;
                    case "RB":
                        this.mouseY = mouseY - 500 - 10;
                        this.mouseX = mouseX - 700 - 20;
                        break;
                    default:
                        this.mouseX = 0;
                        this.mouseY = 0;
                }
            }
        },
    },
    props: {
        month: {
            type: Object,
            required: true,
        },
        weeklyView: {
            type: Boolean,
            required: true,
        },
        currentWeek: {
            type: Number,
            required: true,
        },
        events: {
            type: Array,
            required: true,
        },
        dayColumnView: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.month {
    display: grid;
    grid-template-rows: repeat(6, auto);
    border: 1px solid rgba(0, 0, 0, 1);
    gap: 0; /* Adjust the gap between rows as desired */
    width: 98%;
    justify-self: center;
}
.month-container {
    display: grid;
    width: 100%;
}

.popup {
    position: fixed;
    z-index: 9999;
}
</style>
