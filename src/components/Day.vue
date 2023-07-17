<template>
    <div v-if="dayNumber > -1">
        <div class="entire-day">
            <div class="day-content2">
                <!-- Start time is current time rounded to the nearest 15 min, then end time is the same thing plus 30 min -->
                <div v-if="showModal">
                    <schedule-modal
                        :inputTextName="defaultText"
                        :inputTextDesc="defaultDesc"
                        :colorValue="defaultColor"
                        :startTime="
                            new Date(Math.round(new Date() / (15 * 60 * 1000)) * (15 * 60 * 1000)).getTime()
                        "
                        :endTime="
                            new Date(
                                new Date(
                                    Math.round(new Date() / (15 * 60 * 1000)) * (15 * 60 * 1000)
                                ).getTime() +
                                    30 * 60 * 1000
                            ).getTime()
                        "
                        :editing="false"
                        @close="handleModalClose"
                        @submit="handleModalSubmit"
                    ></schedule-modal>
                </div>
                <div v-if="this.weekNum == 1 || this.weeklyView" class="dayTopText" @click="openDayView">
                    <span>{{ dayOfTheWeek }}</span>
                    <span>{{ dayNumber }}</span>
                </div>
                <div v-else class="dayTopTextNumOnly" @click="openDayView">
                    <span>{{ dayNumber }}</span>
                </div>
                <Holiday :date="`${month.id}/${dayNumber}`" @pop-up="popUp" />
                <div v-if="events.length > 0">
                    <div
                        v-for="event in this.eventsForTheDay(
                            new Date(2023, month.id - 1, dayNumber).getTime()
                        )"
                    >
                        <div class="event-holder">
                            <n-message-provider>
                                <Event
                                    :event="event"
                                    :dayColView="false"
                                    @delete="deleteEvent(event)"
                                    @edited="eventEdited()"
                                ></Event>
                            </n-message-provider>
                        </div>
                    </div>
                </div>
                <div v-else></div>
            </div>
            <div class="add-event">
                <IconCalendarPlus @click="addEvent" width="19" height="19" />
            </div>
        </div>
    </div>
    <div v-else>
        <div class="day-content2">
            <div v-if="this.weekNum == 1 || this.weeklyView" class="dayTopText">
                {{ dayOfTheWeek }}
            </div>
        </div>
    </div>
</template>

<script>
import Holiday from "./Holiday.vue";
import ScheduleModal from "./ScheduleModal.vue";
import { IconCalendarPlus } from "@tabler/icons-vue";
import Event from "./Event.vue";
export default {
    components: { ScheduleModal, Event, IconCalendarPlus, Holiday },
    computed: {},
    data() {
        return {
            showModal: false,
            defaultText: "",
            defaultDesc: "",
            defaultColor: "rgba(255, 102, 128, 1)",
        };
    },
    emits: ["pop-up", "delete-event", "open-day-view", "event-added"],
    methods: {
        popUp(holiday) {
            this.$emit("pop-up", holiday);
        },
        addEvent() {
            this.showModal = true;
            event.stopImmediatePropagation();
        },
        handleModalSubmit(nameText, descText, startTime, endTime, color) {
            let eventDate = new Date(2023, this.month.id - 1, this.dayNumber); // the month is 0-indexed
            this.events.push({
                name: nameText,
                desc: descText,
                startTime: startTime,
                endTime: endTime,
                date: eventDate,
                color: color,
            });
            this.showModal = false;
            if (this.dayColumnView) {
                this.openDayView();
            }
            this.$emit("event-added");
            event.stopImmediatePropagation();
        },
        handleModalClose() {
            this.showModal = false;
            event.stopImmediatePropagation();
        },
        deleteEvent(event) {
            return new Promise((resolve, reject) => {
                this.$emit("delete-event", event);
                resolve(); // Resolving the promise immediately after emitting the event
            })
                .then(() => {
                    if (this.dayColumnView) {
                        this.openDayView();
                        this.$emit("event-added");
                    } // Calling the second function after the emit is done
                })
                .catch((error) => {
                    console.error(error); // Handle any errors that occur during the process
                });
        },
        eventEdited() {
            if (this.dayColumnView) {
                this.openDayView();
                this.$emit("event-added");
            }
        },
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
        openDayView() {
            this.dayViewVisibile = true;
            let date = new Date(2023, this.month.id - 1, this.dayNumber).getTime();
            this.$emit("open-day-view", date, this.eventsForTheDay(date));
        },
    },
    props: {
        dayNumber: {
            type: Number,
            required: true,
        },
        dayOfTheWeek: {
            type: String,
            required: true,
        },
        month: {
            type: Object,
            required: true,
        },
        events: {
            type: Array,
            required: true,
        },
        weekNum: {
            type: Number,
            required: true,
        },
        weeklyView: {
            type: Boolean,
            required: true,
        },
        dayColumnView: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.dayTopText {
    display: flex; /* Use flexbox */
    justify-content: space-between; /* Distribute components with space between them */
    color: rgb(100, 100, 100);
}

.add-event {
    display: flex;
    justify-content: flex-end;
    font-size: small;
    color: rgb(190, 190, 190);
}
.entire-day {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.dayTopTextNumOnly {
    display: flex; /* Use flexbox */
    justify-content: flex-end; /* Distribute components with space between them */
    color: rgb(100, 100, 100);
}

.day-content2 {
    display: flex;
    flex-direction: column;
    flex-grow: 3;
    min-width: 0;
}

.event-holder {
    display: flex;
    justify-content: space-around;
    padding: 1%;
}
</style>
