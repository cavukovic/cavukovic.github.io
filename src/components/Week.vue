<template>
    <div :class="weekClass">
        <div v-for="(day, index) in daysOfTheWeek" :key="`item-${index}`" class="outer-day-holder">
            <div
                v-if="
                    index - month.offset + 1 + weeklyOffset * 7 < 1 ||
                    index - month.offset + 1 + weeklyOffset * 7 > month.lastDay
                "
                class="day-holder"
                :style="{
                    backgroundColor: `rgba(189, 204, 220, .5)`,
                }"
            >
                <!-- I dont know how i feel about graying out "fake" days 
            This would be where we want to style for today's date, feel like i should do this later tho -->
                <div>
                    <Day
                        class="day-holder"
                        :day-of-the-week="day"
                        :day-number="-1"
                        :month="month"
                        :events="events"
                        :weekNum="weekNum"
                        :weeklyView="weeklyView"
                        :dayColumnView="dayColumnView"
                        :displayHolidays="displayHolidays"
                        :holidayColors="holidayColors"
                    ></Day>
                </div>
            </div>
            <div v-else :class="todaysDate(index - month.offset + 1 + weeklyOffset * 7, month.id)">
                <n-message-provider
                    ><Day
                        class="day-holder"
                        :day-of-the-week="day"
                        :day-number="index - month.offset + 1 + weeklyOffset * 7"
                        :month="month"
                        @pop-up="popUp"
                        @delete-event="deleteEvent"
                        @open-day-view="openDayView"
                        @event-added="eventAdded"
                        :events="events"
                        :weekNum="weekNum"
                        :weeklyView="weeklyView"
                        :displayHolidays="displayHolidays"
                        :holidayColors="holidayColors"
                        :dayColumnView="dayColumnView"
                    ></Day
                ></n-message-provider>
            </div>
        </div>
    </div>
</template>

<script>
import Day from "./Day.vue";

export default {
    components: {
        Day,
    },
    computed: {
        weekClass() {
            return this.weeklyView ? "week-true" : "week-false";
        },
    },
    data() {
        return {
            daysOfTheWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            count: 0,
        };
    },
    emits: ["pop-up", "delete-event", "open-day-view", "event-added"],
    methods: {
        todaysDate(dayNumber, month) {
            const givenDate = new Date(new Date().getFullYear(), month - 1, dayNumber);
            const currentDate = new Date();
            if (
                givenDate.getDate() === currentDate.getDate() &&
                givenDate.getMonth() === currentDate.getMonth()
            ) {
                return "day-holder-today";
            }
            return "day-holder";
        },
        popUp(holiday) {
            this.$emit("pop-up", holiday);
        },
        deleteEvent(event) {
            this.$emit("delete-event", event);
        },
        eventAdded() {
            this.$emit("event-added");
        },
        openDayView(date, events) {
            this.$emit("open-day-view", date, events);
        },
    },
    props: {
        weeklyOffset: {
            type: Number,
            required: true,
        },
        month: {
            type: Object,
            required: true,
        },
        weeklyView: {
            type: Boolean,
            required: true,
        },
        dayColumnView: {
            type: Boolean,
            required: true,
        },
        events: {
            type: Array,
            required: true,
        },
        weekNum: {
            type: Number,
            required: true,
        },
        displayHolidays: {
            type: Boolean,
            required: true,
        },
        holidayColors: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.week-true {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 0px;
    min-height: 550px;
}

.week-false {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 0px;
    min-height: 138px;
}

.day-holder {
    display: flex;
    width: 100%;
    padding: 2px;
    min-width: 0;
    align-items: stretch;
}

.day-holder-today {
    /* play around with shadow color */
    box-shadow: inset 0 0 10px rgba(45, 45, 45);
    display: flex;
    width: 100%;
    padding: 2px;
    min-width: 0;
    align-items: stretch;
}

.outer-day-holder {
    display: flex;
    border: 0.5px solid rgba(0, 0, 0, 1);
    justify-content: stretch;
    flex-grow: 1;
    min-width: 0;
}
</style>
