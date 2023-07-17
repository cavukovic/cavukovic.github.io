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
                                :style="{
                                    top: event.top + 'px',
                                    height: event.height + 'px',
                                    width: event.width + 'px',
                                    left: event.left + 'px',
                                }"
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
            eventTimeline: {
                "12:00 AM": { events: [] },
                "12:15 AM": { events: [] },
                "12:30 AM": { events: [] },
                "12:45 AM": { events: [] },
                "1:00 AM": { events: [] },
                "1:15 AM": { events: [] },
                "1:30 AM": { events: [] },
                "1:45 AM": { events: [] },
                "2:00 AM": { events: [] },
                "2:15 AM": { events: [] },
                "2:30 AM": { events: [] },
                "2:45 AM": { events: [] },
                "3:00 AM": { events: [] },
                "3:15 AM": { events: [] },
                "3:30 AM": { events: [] },
                "3:45 AM": { events: [] },
                "4:00 AM": { events: [] },
                "4:15 AM": { events: [] },
                "4:30 AM": { events: [] },
                "4:45 AM": { events: [] },
                "5:00 AM": { events: [] },
                "5:15 AM": { events: [] },
                "5:30 AM": { events: [] },
                "5:45 AM": { events: [] },
                "6:00 AM": { events: [] },
                "6:15 AM": { events: [] },
                "6:30 AM": { events: [] },
                "6:45 AM": { events: [] },
                "7:00 AM": { events: [] },
                "7:15 AM": { events: [] },
                "7:30 AM": { events: [] },
                "7:45 AM": { events: [] },
                "8:00 AM": { events: [] },
                "8:15 AM": { events: [] },
                "8:30 AM": { events: [] },
                "8:45 AM": { events: [] },
                "9:00 AM": { events: [] },
                "9:15 AM": { events: [] },
                "9:30 AM": { events: [] },
                "9:45 AM": { events: [] },
                "10:00 AM": { events: [] },
                "10:15 AM": { events: [] },
                "10:30 AM": { events: [] },
                "10:45 AM": { events: [] },
                "11:00 AM": { events: [] },
                "11:15 AM": { events: [] },
                "11:30 AM": { events: [] },
                "11:45 AM": { events: [] },
                "12:00 PM": { events: [] },
                "12:15 PM": { events: [] },
                "12:30 PM": { events: [] },
                "12:45 PM": { events: [] },
                "1:00 PM": { events: [] },
                "1:15 PM": { events: [] },
                "1:30 PM": { events: [] },
                "1:45 PM": { events: [] },
                "2:00 PM": { events: [] },
                "2:15 PM": { events: [] },
                "2:30 PM": { events: [] },
                "2:45 PM": { events: [] },
                "3:00 PM": { events: [] },
                "3:15 PM": { events: [] },
                "3:30 PM": { events: [] },
                "3:45 PM": { events: [] },
                "4:00 PM": { events: [] },
                "4:15 PM": { events: [] },
                "4:30 PM": { events: [] },
                "4:45 PM": { events: [] },
                "5:00 PM": { events: [] },
                "5:15 PM": { events: [] },
                "5:30 PM": { events: [] },
                "5:45 PM": { events: [] },
                "6:00 PM": { events: [] },
                "6:15 PM": { events: [] },
                "6:30 PM": { events: [] },
                "6:45 PM": { events: [] },
                "7:00 PM": { events: [] },
                "7:15 PM": { events: [] },
                "7:30 PM": { events: [] },
                "7:45 PM": { events: [] },
                "8:00 PM": { events: [] },
                "8:15 PM": { events: [] },
                "8:30 PM": { events: [] },
                "8:45 PM": { events: [] },
                "9:00 PM": { events: [] },
                "9:15 PM": { events: [] },
                "9:30 PM": { events: [] },
                "9:45 PM": { events: [] },
                "10:00 PM": { events: [] },
                "10:15 PM": { events: [] },
                "10:30 PM": { events: [] },
                "10:45 PM": { events: [] },
                "11:00 PM": { events: [] },
                "11:15 PM": { events: [] },
                "11:30 PM": { events: [] },
                "11:45 PM": { events: [] },
            },
            updated: false,
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
                const divElement = document.querySelector(selector);

                const rect = divElement.getBoundingClientRect();

                rectTop = rect.top; // Top position relative to the viewport
                rectLeft = rect.left; // Left position relative to the viewport
                rectWidth = rect.width; // Width of the element
                rectHeight = rect.height; // Height of the element

                // console.log(
                //     "selector: " +
                //         selector +
                //         " top: " +
                //         rectTop +
                //         " left: " +
                //         rectLeft +
                //         " width: " +
                //         rectWidth +
                //         " height: " +
                //         rectHeight
                // );

                // 15 min event is either 27 or 8
                switch (startTimeMin) {
                    case 0:
                        startOffset = -49;
                        break;
                    case 15:
                        startOffset = rectHeight / 4 - 49.5;
                        break;
                    case 30:
                        startOffset = rectHeight / 2 - 49.5;
                        break;
                    case 45:
                        startOffset = rectHeight * 0.75 - 50;
                        break;
                    default:
                        startOffset = 0;
                        break;
                }
                calculatedHeight = this.calculateHeight(event.startTime, event.endTime);
            });

            //this.calculateWidth();
            //this.calcLeft();

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
        calculateWidth() {
            this.updated = true;
            for (let timeSlot in this.eventTimeline) {
                let eventsAtTime = this.eventTimeline[timeSlot].events.length;
                if (eventsAtTime > 0) {
                    //we have an event at this time
                    //console.log(this.eventTimeline[timeSlot].events);
                    for (let e of this.eventTimeline[timeSlot].events) {
                        if (eventsAtTime > 1) {
                        } else {
                            e.left = 63;
                        }

                        // if were on the last one just fill it?
                        // if (this.eventTimeline[timeSlot].events[eventsAtTime - 1] == e && eventsAtTime > 1) {
                        //     //console.log(e.name);
                        //     e.width = 500;
                        // }

                        //console.log("event name: " + e.name + " event width " + e.width);
                        if (
                            320 / eventsAtTime < e.width ||
                            e.width === false ||
                            e.width === undefined ||
                            this.updated
                        ) {
                            this.updated = false;
                            e.width = 320 / eventsAtTime;
                            //console.log("width " + e.width);
                        }
                    }
                }
            }
            // const eventCount = this.events.length;
            // for (let i = 0; i < eventCount; i++) {
            //     const currentEvent = this.events[i];
            //     let overlappingCount = 0;
            //     for (let j = 0; j < eventCount; j++) {
            //         const otherEvent = this.events[j];
            //         if (i !== j) {
            //             console.log("Current Event " + currentEvent.name);
            //             console.log("Other Event " + otherEvent.name);
            //             if (
            //                 (currentEvent.startTime > otherEvent.startTime &&
            //                     currentEvent.startTime < otherEvent.endTime) ||
            //                 (currentEvent.endTime > otherEvent.startTime &&
            //                     currentEvent.endTime < otherEvent.endTime) ||
            //                 (currentEvent.startTime > otherEvent.startTime &&
            //                     currentEvent.endTime < otherEvent.endTime) ||
            //                 (currentEvent.startTime < otherEvent.startTime &&
            //                     currentEvent.endTime > otherEvent.endTime)
            //             ) {
            //                 overlappingCount++;
            //             }
            //         }
            //     }
            //     const width = 320 / (overlappingCount + 1);
            //     //const left = 63 + width * previousOverlappingCount;
            //     currentEvent.overlap = overlappingCount;
            //     currentEvent.width = width;
            //     currentEvent.left = 63;
            // }
        },
        calcLeft() {
            // make a map
            // [1:00   1:15   1:30   1:45  2:00   2:15   2:30   2:45   3:00]
            //   e1     e1                  e4    e4      e4     e4
            //          e2      e2     e2   e2    e2
            //                                    e3      e3     e3
        },
        formatTime(time) {
            const selectedTime = new Date(time);
            const formattedTime = selectedTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
            });
            return formattedTime;
        },
        calcEventsPosition() {
            for (let e of this.events) {
                let startTime = this.formatTime(e.startTime);
                let endTime = this.formatTime(e.endTime);

                const timeSlots = Object.keys(this.eventTimeline);
                const startIndex = timeSlots.indexOf(startTime);
                const endIndex = timeSlots.indexOf(endTime);

                for (let i = startIndex; i <= endIndex; i++) {
                    const timeSlot = timeSlots[i];
                    const eventsArray = this.eventTimeline[timeSlot].events;
                    const duplicateEvent = eventsArray.find((event) => event === e);
                    if (!duplicateEvent) {
                        eventsArray.push(e);
                    }
                }

                this.calcPosition(e)
                    .then((result) => {
                        e.height = result.height;
                        e.top = result.top;
                        //e.width = result.width;
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
    flex-grow: 1;
    width: 320px;
    left: 63px;
}
</style>
