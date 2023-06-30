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
-add the ability to add events
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
    background-color: white;
}
h1 {
    font-weight: 700;
    font-size: xx-large;
    text-align: center;
}
</style>
