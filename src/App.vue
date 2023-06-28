<script>
//import HelloWorld from './components/HelloWorld.vue'
import MainCalendar from "./components/MainCalendar.vue";

export default {
    components: {
        MainCalendar,
    },
    data() {
        return {};
    },
};
</script>
<!-- TODO 
- add the ability to add events
- add holiday hover (could we do this programatically?)
-in theory we know the date at some point, we have a concept of the day number and the month
-what if at that point (in day probably) where we know the date, we cross check with a list of holidays
-make todays date special
-->
<template>
    <h1>Calendar</h1>

    <MainCalendar />
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
    background-color: #b0c6de;
}
h1 {
    font-weight: 700;
    font-size: xx-large;
    text-align: center;
}
</style>
