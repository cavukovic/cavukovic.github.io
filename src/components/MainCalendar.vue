<template>
    <div class="container">
        <n-button :class="hideDayView" tertiary round @click="changeDayColumnView">Minimize Day</n-button>
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
    <div class="month-and-day-container">
        <!-- make this its own component -->
        <div v-if="dayColumnView" class="day-view-column">
            <!-- what we want to do: we want day.vue to register the click on a certain day
            then fire that click all the way back up to here, where we tell dayColumnView to 
            be true AND give day column view all the necessary components of a day like the 
            events for that day and stuff -->

            <!-- With that, we will want to create a whole new 12 hour view, a system for displaying
            the events with any overlap and all that. The side by side aspect wont be that hard I 
            don't think, it'll just be about fixing the hieght to a duration and fixing the y position -->

            <DayColumn
                :date="columnDate"
                :events="dailyEvents"
                @delete-event="deleteEvent"
                ref="dayColumnComponentRef"
            />
        </div>
        <Month
            :month="months[currentMonth]"
            :weeklyView="weeklyView"
            :events="events"
            :dayColumnView="dayColumnView"
            :currentWeek="currentWeek"
            @delete-event="deleteEvent"
            @open-day-view="openDayView"
            @event-added="eventAdded"
        />
    </div>
</template>

<script>
import Month from "./Month.vue";
import DayColumn from "./DayColumn.vue";
import { IconArrowBigRightFilled, IconArrowBigLeftFilled } from "@tabler/icons-vue";
import { ref } from "vue";
const dayColumnComponentRef = ref(null);
export default {
    components: {
        Month,
        DayColumn,
        IconArrowBigRightFilled,
        IconArrowBigLeftFilled,
    },
    computed: {
        leftArrow() {
            if (this.currentMonth != 0 || (this.weeklyView && this.currentWeek != 1)) {
                return "arrow";
            }
            return "left-arrow";
        },
        rightArrow() {
            if (this.currentMonth != 11 || (this.weeklyView && this.currentWeek != 6)) {
                return "arrow";
            }
            return "right-arrow";
        },
        hideDayView() {
            return this.dayColumnView ? "day-view-true" : "day-view-false";
        },
    },
    emits: ["delete-event"],
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
            columnDate: new Date(),
            dailyEvents: [],
            weeklyView: false,
            dayColumnView: false,
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
        changeDayColumnView() {
            this.dayColumnView = !this.dayColumnView;
        },
        calculateWeeks() {
            if (this.months[this.currentMonth].offset + this.months[this.currentMonth].lastDay <= 35) {
                return 5;
            }
            return 6;
        },
        deleteEvent(event) {
            return new Promise((resolve, reject) => {
                this.$emit("delete-event", event);
                resolve(); // Resolving the promise immediately after emitting the event
            })
                .then(() => {
                    if (this.dayColumnView) {
                        this.openDayView(this.columnDate, this.eventsForTheDay(this.columnDate));
                    }
                })
                .catch((error) => {
                    console.error(error); // Handle any errors that occur during the process
                });
        },
        eventsForTheDay(date) {
            let sortedEvents = [];
            for (let i = 0; i < this.events.length; i++) {
                if (Date.parse(this.events[i].date) === date) {
                    sortedEvents.push(this.events[i]);
                }
            }
            sortedEvents.sort((a, b) => a.startTime - b.startTime);
            return sortedEvents;
        },
        openDayView(date, events) {
            // console.log(date);
            //console.log(events);
            //console.log(holiday);
            this.dailyEvents = events;
            this.columnDate = date;
            this.dayColumnView = true;
        },
        eventAdded() {
            if (this.dayColumnView) {
                this.$refs.dayColumnComponentRef.eventAdded();
            }
        },
    },
    mounted() {
        this.currentMonth = new Date().getMonth(); // sets the current month when you start the app to this month
    },
    props: {
        events: {
            type: Array,
            required: true,
        },
    },
};
</script>

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
    font-size: xx-large;
    align-items: center;
    justify-content: space-evenly;
    min-width: 120px;
}

.month-and-day-container {
    display: flex;
    justify-content: space-between;
}

.day-view-column {
    display: flex;
    padding-left: 10px;
}

.day-view-false {
    visibility: hidden;
}
</style>
