<script>
import MainCalendar from "./components/MainCalendar.vue";

export default {
    components: {
        MainCalendar,
    },
    data() {
        return {
            events: [],
            applyCustomCSS: false,
        };
    },
    methods: {
        deleteEvent(event) {
            this.events = this.events.filter((e) => e !== event);
        },
        deleteAllEvents() {
            this.events = [];
        },
        toggleDarkMode() {
            this.applyCustomCSS = !this.applyCustomCSS;
            // Apply custom CSS class initially
            if (this.applyCustomCSS) {
                document.documentElement.classList.add("custom-colors");
            } else {
                document.documentElement.classList.remove("custom-colors");
            }
        },
    },
    mounted() {
        // Check if events are stored in localStorage
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
            this.events = JSON.parse(storedEvents);
        }

        // Apply custom CSS class initially
        if (this.applyCustomCSS) {
            document.documentElement.classList.add("custom-colors");
        } else {
            document.documentElement.classList.remove("custom-colors");
        }
    },
    watch: {
        events: {
            handler(newEvents) {
                // Store events in localStorage whenever it changes
                localStorage.setItem("events", JSON.stringify(newEvents));
            },
            deep: true, // Watch nested changes in the array
        },
    },
};
</script>
<!-- TODO 
- location autocomplete would be cool (but I don't wanna get google api)
- adding weather could be cool
- 
-->
<template>
    <!-- <h1>Calendar</h1> -->
    <MainCalendar
        :events="events"
        @delete-event="deleteEvent"
        @delete-all-events="deleteAllEvents"
        @dark-mode="toggleDarkMode"
    />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 30px; */
}

h1 {
    font-weight: 700;
    font-size: xx-large;
    text-align: center;
}

.modal {
    background-color: rgb(255, 255, 255);
}

.custom-colors * {
    color: #fff !important;
}

.custom-colors html,
.custom-colors body,
.custom-colors .n-drawer .n-drawer-content,
.custom-colors .modal,
.custom-colors .n-time-picker-panel,
.custom-colors .n-color-picker-control,
.custom-colors .n-color-picker-action,
.custom-colors .n-input .n-input-wrapper {
    background-color: rgb(88, 89, 91);
}

.custom-colors
    .n-time-picker-panel
    .n-time-picker-col
    .n-time-picker-col__item.n-time-picker-col__item--active::before {
    background-color: rgb(68, 68, 68);
}

.custom-colors .n-color-picker-control,
.custom-colors .n-input .n-input-wrapper {
    background-color: rgba(88, 89, 91, 0.9);
}
.custom-colors .n-color-picker-action {
    background-color: rgba(88, 89, 91, 0.9);
    border-top: 0px solid black;
}

/* * {
    color: #fff !important;
}
html {
    background-color: rgb(88, 89, 91);
}
body {
    background-color: rgb(88, 89, 91);
}
.n-drawer .n-drawer-content {
    background-color: rgb(88, 89, 91);
}
.modal {
    background-color: rgb(88, 89, 91);
}
.n-time-picker-panel {
    background-color: rgb(88, 89, 91);
}
.n-time-picker-panel .n-time-picker-col .n-time-picker-col__item.n-time-picker-col__item--active::before {
    background-color: rgb(68, 68, 68);
}

.n-color-picker-control {
    background-color: rgba(88, 89, 91, 0.9);
}
.n-color-picker-action {
    background-color: rgba(88, 89, 91, 0.9);
    border-top: 0px solid black;
}
.n-input .n-input-wrapper {
    background-color: rgba(88, 89, 91, 0.9);
} */
</style>
