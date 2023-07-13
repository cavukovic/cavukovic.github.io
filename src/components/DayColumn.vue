<template>
    <div class="day-col-border">
        <n-scrollbar :style="{ maxHeight: monthHeight + 'px' }" :on-scroll="handleScroll">
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
                        <div id="a0"><span>12:00 am</span></div>
                        <div id="a1"><span>&nbsp;1:00 am</span></div>
                        <div id="a2"><span>&nbsp;2:00 am</span></div>
                        <div id="a3"><span>&nbsp;3:00 am</span></div>
                        <div id="a4"><span>&nbsp;4:00 am</span></div>
                        <div id="a5"><span>&nbsp;5:00 am</span></div>
                        <div id="a6"><span>&nbsp;6:00 am</span></div>
                        <div id="a7"><span>&nbsp;7:00 am</span></div>
                        <div id="a8"><span>&nbsp;8:00 am</span></div>
                        <div id="a9"><span>&nbsp;9:00 am</span></div>
                        <div id="a10"><span>10:00 am</span></div>
                        <div id="a11"><span>11:00 am</span></div>
                        <div id="p12"><span>12:00 pm</span></div>
                        <div id="p13"><span>&nbsp;1:00 pm</span></div>
                        <div id="p14"><span>&nbsp;2:00 pm</span></div>
                        <div id="p15"><span>&nbsp;3:00 pm</span></div>
                        <div id="p16"><span>&nbsp;4:00 pm</span></div>
                        <div id="p17"><span>&nbsp;5:00 pm</span></div>
                        <div id="p18"><span>&nbsp;6:00 pm</span></div>
                        <div id="p19"><span>&nbsp;7:00 pm</span></div>
                        <div id="p20"><span>&nbsp;8:00 pm</span></div>
                        <div id="p21"><span>&nbsp;9:00 pm</span></div>
                        <div id="p22"><span>10:00 pm</span></div>
                        <div id="p23"><span>11:00 pm</span></div>
                        <div id="p24"><span>12:00 am</span></div>
                    </div>
                    <div v-if="events.length > 0">
                        <div v-for="event in events">
                            <div
                                class="event-holder"
                                :style="{ top: event.top + 'px', height: event.height + 'px' }"
                            >
                                <Event
                                    :event="event"
                                    :dayColView="true"
                                    @delete="deleteEvent(event)"
                                    @edited="eventEdited()"
                                    :height="event.height"
                                ></Event>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>

<script>
import Event from "./Event.vue";
export default {
    components: { Event },
    emits: ["delete-event"],
    data() {
        return {
            monthHeight: 0,
        };
    },
    methods: {
        handleScroll(event) {
            this.calcEventsPosition();
        },
        deleteEvent(event) {
            return new Promise((resolve, reject) => {
                this.$emit("delete-event", event);
                resolve(); // Resolving the promise immediately after emitting the event
            })
                .then(() => {
                    this.updateHeight();
                })
                .catch((error) => {
                    console.error(error); // Handle any errors that occur during the process
                });
        },
        eventEdited() {
            this.calcEventsPosition();
            this.updateHeight();
        },
        eventAdded() {
            console.log("event added");
            this.$nextTick(() => {
                this.calcEventsPosition();
            });
            this.updateHeight();
        },
        async calcPosition(event) {
            let rectTop;
            let rectLeft;
            let rectWidth;
            let rectHeight;
            let startOffset;
            let calculatedHeight;

            await this.$nextTick(() => {
                const startTimeHours = new Date(event.startTime).getHours();
                const startTimeMin = new Date(event.startTime).getMinutes();
                let selector = "#";

                if (startTimeHours >= 12) {
                    selector += `p${startTimeHours}`;
                } else {
                    selector += `a${startTimeHours}`;
                }
                // console.log("selector: " + selector);
                const divElement = document.querySelector(selector);

                const rect = divElement.getBoundingClientRect();

                rectTop = rect.top; // Top position relative to the viewport
                rectLeft = rect.left; // Left position relative to the viewport
                rectWidth = rect.width; // Width of the element
                rectHeight = rect.height; // Height of the element

                //top + 12 should put our top right on the line of where we want
                console.log(
                    "selector: " +
                        selector +
                        " top: " +
                        rectTop +
                        " left: " +
                        rectLeft +
                        " width: " +
                        rectWidth +
                        " height: " +
                        rectHeight
                );

                // 15 min event is either 27 or 8
                switch (startTimeMin) {
                    case 0:
                        console.log("case 0");
                        startOffset = -49;
                        break;
                    case 15:
                        startOffset = rectHeight / 4 - 49.5;
                        break;
                    case 30:
                        startOffset = rectHeight / 2 - 49.5;
                        //296.25px

                        break;
                    case 45:
                        startOffset = rectHeight * 0.75 - 50;
                        break;
                    default:
                        startOffset = 0;
                        break;
                }
                console.log(event);
                calculatedHeight = this.calculateHeight(event.startTime, event.endTime);
            });

            return { top: rectTop + startOffset, height: calculatedHeight };
        },
        calculateHeight(start, end) {
            const timeDifference = start - end; // Time difference in milliseconds
            let height = 0;
            let startHours = new Date(start).getHours();
            let endHours = new Date(end).getHours();
            let startMin = new Date(start).getMinutes() / 15;
            let endMin = new Date(end).getMinutes() / 15;
            height += (endHours - startHours) * 112;
            height += (endMin - startMin) * 27;

            return height;
        },
        calcEventsPosition() {
            for (let e of this.events) {
                this.calcPosition(e)
                    .then((result) => {
                        console.log(result.height);
                        e.height = result.height;
                        e.top = result.top;
                    })
                    .catch((error) => {
                        console.error("calcPosition error", error);
                    });
            }
        },
        updateHeight() {
            const month = document.querySelector("#month");
            const rect = month.getBoundingClientRect();
            this.monthHeight = rect.height;
        },
    },
    mounted() {
        this.calcEventsPosition();
        this.updateHeight();
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
    min-height: 722px;
    justify-content: center;
}

.day-col-border {
    border: 1px solid rgb(0, 0, 0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    padding: 1px;
    border-radius: 6px;
}

.border {
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
    min-height: 112px;
    height: 100%;
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

span {
    position: absolute;
    top: 50%;
    transform: translateY(-0.75em);
}

.event-holder {
    /* display: flex;
    justify-content: space-around;
    padding: 1%; */
    position: absolute;
    width: 320px;
    left: 63px;
}
</style>
