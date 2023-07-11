<template>
    <div class="day-column-container">
        <div class="border">
            <div class="date-text">
                {{
                    new Date(this.date).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })
                }}
            </div>
            <div class="time-stamp-containter">
                <div id="your-div-id">12:00 am</div>
                <div>&nbsp;1:00 am</div>
                <div>&nbsp;2:00 am</div>
                <div>&nbsp;3:00 am</div>
                <div>&nbsp;4:00 am</div>
                <div>&nbsp;5:00 am</div>
                <div>&nbsp;6:00 am</div>
                <div>&nbsp;7:00 am</div>
                <div>&nbsp;8:00 am</div>
                <div>&nbsp;9:00 am</div>
                <div>10:00 am</div>
                <div>11:00 am</div>
                <div>12:00 pm</div>
                <div>&nbsp;1:00 pm</div>
                <div>&nbsp;2:00 pm</div>
                <div>&nbsp;3:00 pm</div>
                <div>&nbsp;4:00 pm</div>
                <div>&nbsp;5:00 pm</div>
                <div>&nbsp;6:00 pm</div>
                <div>&nbsp;7:00 pm</div>
                <div>&nbsp;8:00 pm</div>
                <div>&nbsp;9:00 pm</div>
                <div>10:00 pm</div>
                <div>11:00 pm</div>
                <div>12:00 am</div>
            </div>
            <div v-if="events.length > 0">
                <div v-for="event in events">
                    <div class="event-holder">
                        <Event :event="event" @delete="deleteEvent(event)"></Event>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Event from "./Event.vue";
export default {
    components: { Event },
    emits: ["delete-event"],
    data() {
        return {};
    },
    methods: {
        deleteEvent(event) {
            this.calc();
            this.$emit("delete-event", event);
        },
        calc() {
            console.log("in calc");
            const divElement = document.querySelector("#your-div-id"); // Replace 'your-div-id' with the actual ID of your div
            console.log(divElement);
            const rect = divElement.getBoundingClientRect();

            const top = rect.top; // Top position relative to the viewport
            const left = rect.left; // Left position relative to the viewport
            const width = rect.width; // Width of the element
            const height = rect.height; // Height of the element

            // this is basically how we're gonna want to do it,
            // we can use a method like this to find the correct positions based on start and end time

            //then modify the css somehow, probably by passing to event with a flag for columnView
            // so that each instance has its own thing

            //imediate issue, how will this hold up to resizing? my guess is bad
            console.log(top, left, width, height);
        },
    },
    props: {
        events: {
            type: Array,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
.day-column-container {
    display: flex;
    height: 100%;
    width: 100%;
    min-width: 350px;
    max-width: 450px;
    justify-content: center;
    padding-left: 10px;
}

.border {
    border: 1px solid rgb(0, 0, 0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    width: 100%;
}

.date-text {
    font-size: large;
}

.time-stamp-containter {
    display: flex;
    flex-direction: column;
    height: 95%;
    justify-content: space-evenly;
}

.time-stamp-containter div {
    position: relative;
    text-align: left;
}

.time-stamp-containter div::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 81%;
    transform: translateX(4.5em);
    border-bottom: 1px solid rgb(174, 174, 174);
}

.event-holder {
    /* display: flex;
    justify-content: space-around;
    padding: 1%; */
    position: absolute;
    width: 50%;
    height: 300px;
    top: 500px;
    left: 20px;
}
</style>
