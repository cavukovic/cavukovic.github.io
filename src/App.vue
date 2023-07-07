<script>
//import HelloWorld from './components/HelloWorld.vue'
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
};
</script>
<!-- TODO 
-add the ability to give event a duration
-sort events by time
-just put the day of the week at the top?
-add different views, week view, month view etc
-add a little column on the side that shoes the whole day hours of whatever day you selected
-make todays date special
-->
<template>
    <h1>Calendar</h1>

    <MainCalendar :events="events" />
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
