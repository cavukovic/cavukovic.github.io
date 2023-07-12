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
                <div id="a12S">12:00 am</div>
                <div id="a1">&nbsp;1:00 am</div>
                <div id="a2">&nbsp;2:00 am</div>
                <div id="a3">&nbsp;3:00 am</div>
                <div id="a4">&nbsp;4:00 am</div>
                <div id="a5">&nbsp;5:00 am</div>
                <div id="a6">&nbsp;6:00 am</div>
                <div id="a7">&nbsp;7:00 am</div>
                <div id="a8">&nbsp;8:00 am</div>
                <div id="a9">&nbsp;9:00 am</div>
                <div id="a10">10:00 am</div>
                <div id="a11">11:00 am</div>
                <div id="p12">12:00 pm</div>
                <div id="p1">&nbsp;1:00 pm</div>
                <div id="p2">&nbsp;2:00 pm</div>
                <div id="p3">&nbsp;3:00 pm</div>
                <div id="p4">&nbsp;4:00 pm</div>
                <div id="p5">&nbsp;5:00 pm</div>
                <div id="p6">&nbsp;6:00 pm</div>
                <div id="p7">&nbsp;7:00 pm</div>
                <div id="p8">&nbsp;8:00 pm</div>
                <div id="p9">&nbsp;9:00 pm</div>
                <div id="p10">10:00 pm</div>
                <div id="p11">11:00 pm</div>
                <div id="p12E">12:00 am</div>
            </div>
            <div v-if="events.length > 0">
                <div v-for="event in events">
                    <div class="event-holder" :style="getPosition(event)">
                        <Event :event="event" @delete="deleteEvent(event)"></Event>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { IconEaseInOutControlPoints } from "@tabler/icons-vue";
import Event from "./Event.vue";
export default {
    components: { Event },
    emits: ["delete-event"],
    data() {
        return {};
    },
    methods: {
        deleteEvent(event) {
            this.$emit("delete-event", event);
        },
        getPosition(event) {
            this.calcPosition(event)
                .then((result) => {
                    console.log("result", result);
                    return result; // somehow doesnt work
                })
                .catch((error) => {
                    console.error("calcPosition error", error);
                });
        },
        async calcPosition(event) {
            let rectTop;
            let rectLeft;
            let rectWidth;
            let rectHeight;
            let position;

            await this.$nextTick(() => {
                const divElement = document.querySelector("#a1");
                //:style="{ backgroundColor: event.color, height: event.height + 'px', top: event.top + 'px', left: event.left + 'px' }"

                console.log(divElement);
                const rect = divElement.getBoundingClientRect();

                rectTop = rect.top; // Top position relative to the viewport
                rectLeft = rect.left; // Left position relative to the viewport
                rectWidth = rect.width; // Width of the element
                rectHeight = rect.height; // Height of the element

                //top + 12 should put our top right on the line of where we want
                console.log(
                    "top: " +
                        rectTop +
                        " left: " +
                        rectLeft +
                        " width: " +
                        rectWidth +
                        " height: " +
                        rectHeight
                );
                //return `{top: ${top + 12}}`;
            });
            console.log(rectTop);
            return { top: rectTop + 12 + "px" };
        },
    },
    mounted() {
        //this.calcPosition();
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
    min-width: 400px;
    max-width: 400px;
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
    width: 320px;
    height: 23px;
    left: 75px;
}
</style>
