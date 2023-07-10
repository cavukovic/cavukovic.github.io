<script>
import MainCalendar from "./components/MainCalendar.vue";

export default {
    components: {
        MainCalendar,
    },
    data() {
        return {
            events: [],
        };
    },
    methods: {
        deleteEvent(event) {
            this.events = this.events.filter((e) => e !== event);
        },
    },
    mounted() {
        // Check if events are stored in localStorage
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
            this.events = JSON.parse(storedEvents);
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
-have the calendar be on the month that it is on refresh 
-refactor/organize code
-add a little column on the side that shoes the whole day hours of whatever day you selected
-make todays date special
-->
<template>
    <h1>Calendar</h1>

    <MainCalendar :events="events" @delete-event="deleteEvent" />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
}
html {
    background-color: white;
}
h1 {
    font-weight: 700;
    font-size: xx-large;
    text-align: center;
}
</style>
