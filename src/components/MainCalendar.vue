<template>
    <div class="container">
        <n-button
            v-if="!this.dayColumnView"
            strong
            round
            color="rgb(133, 142, 152)"
            @click="activate('left')"
            class="button-overide"
            >Menu</n-button
        >
        <n-button
            v-else
            strong
            round
            color="rgb(133, 142, 152)"
            @click="changeDayColumnView"
            class="button-overide"
            >Minimize Day</n-button
        >

        <div :class="leftArrow">
            <IconArrowBigLeftFilled @click="previous" />
        </div>
        <!-- https://tabler.io/docs/components/icons -->
        <h2 class="month-name" @click="returnToToday">{{ months[currentMonth].name }}</h2>
        <div :class="rightArrow">
            <IconArrowBigRightFilled @click="next" />
        </div>
        <n-button strong round color="rgb(133, 142, 152)" @click="changeView" class="button-overide"
            >Change View</n-button
        >
    </div>
    <div class="month-and-day-container">
        <!-- make this its own component? -->
        <div v-if="dayColumnView" class="day-view-column">
            <DayColumn
                :date="columnDate"
                :events="dailyEvents"
                :displayHolidays="displayHolidays"
                :holidayColors="holidayColors"
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
            :displayHolidays="displayHolidays"
            :holidayColors="holidayColors"
            :darkMode="darkMode"
            @delete-event="deleteEvent"
            @open-day-view="openDayView"
            @event-added="eventAdded"
        />
    </div>
    <n-drawer v-model:show="active" :width="502" :placement="placement">
        <Menu
            :darkMode="darkMode"
            :holiday-colors="holidayColors"
            :displayHolidays="displayHolidays"
            @dark-mode="toggleDarkMode"
            @display-holidays="displayHolidaysUpdate"
            @update-colors="updateColors"
            @delete-all-events="deleteAllEvents"
        />
    </n-drawer>
</template>

<script>
import Month from "./Month.vue";
import DayColumn from "./DayColumn.vue";
import Menu from "./Menu.vue";
import { IconArrowBigRightFilled, IconArrowBigLeftFilled } from "@tabler/icons-vue";
import { defineComponent, ref } from "vue";
const dayColumnComponentRef = ref(null);
export default {
    setup() {
        // for the menu
        const active = ref(false);
        const placement = ref("right");
        const activate = (place) => {
            active.value = true;
            placement.value = place;
        };
        return {
            active,
            placement,
            activate,
        };
    },
    components: {
        Month,
        DayColumn,
        Menu,
        IconArrowBigRightFilled,
        IconArrowBigLeftFilled,
        defineComponent,
    },
    computed: {
        // render the arrow (or not) depending on what month we're on
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
    },
    created() {
        window.addEventListener("keydown", this.keyDownListener);
        window.addEventListener("keyup", this.keyUpListener);
    },
    emits: ["delete-event", "delete-all-events", "dark-mode"],
    data() {
        return {
            months: [
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
            pressed: false,
            displayHolidays: true,
            holidayColors: {
                federal: "Red",
                national: "Blue",
                special: "Green",
                month: "Yellow",
            },
            darkMode: false,
        };
    },
    methods: {
        // listens for shortcuts
        keyDownListener(event) {
            if (event.key === "Tab") {
                this.pressed = true;
            }
            if (this.pressed) {
                switch (event.key) {
                    case "t":
                        this.currentMonth = new Date().getMonth(); // return to today
                        break;
                    case "v":
                        this.changeView();
                        break;
                    case "m":
                        event.preventDefault();
                        if (this.active === true) {
                            this.active = false; // close menu if open
                        } else {
                            this.activate("left"); // open menu if closed
                        }
                        break;
                    case "h":
                        this.displayHolidays = !this.displayHolidays; // turn off holidays
                        break;
                    case "d":
                        this.toggleDarkMode(); // toggle dark mode
                        break;
                    case ".":
                        this.next();
                        break;
                    case ",":
                        this.previous();
                        break;
                    default:
                    //console.log(event.key);
                }
            }
        },
        keyUpListener(event) {
            if (event.key === "Tab") {
                this.pressed = false;
            }
        },
        // scrolls to the next thing, either next month or week depending on the view
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
                this.eventAdded();
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
                this.eventAdded();
            }
        },
        // changes between weekly view and month view
        changeView() {
            this.currentWeek = 1;
            this.weeklyView = !this.weeklyView;
            this.dayColumnView = false;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.$emit("dark-mode", this.darkMode);
        },
        returnToToday() {
            this.currentMonth = new Date().getMonth();
        },
        changeDayColumnView() {
            this.dayColumnView = !this.dayColumnView;
        },
        // calculates the number of weeks in a month
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
        deleteAllEvents() {
            this.$emit("delete-all-events", event);
        },
        // sorts all the events for a given day by start time
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
            this.dailyEvents = events;
            this.columnDate = date;
            this.dayColumnView = true;
        },
        // rerenders dayColView when an update happens
        eventAdded() {
            if (this.dayColumnView) {
                this.$refs.dayColumnComponentRef.eventAdded();
            }
        },
        // toggles holidays
        displayHolidaysUpdate(disp) {
            this.displayHolidays = disp;
        },
        updateColors(colors) {
            this.holidayColors = colors;
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
    /* display: flex; Use flexbox */
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-items: center;
    padding-left: 5%;
    padding-right: 5%;
    max-height: 95px;
}
.button-overide {
    width: 150px !important;
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
</style>
