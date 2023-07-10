<template>
    <div v-if="dayNumber > -1">
        <div class="entire-day">
            <div class="day-content2">
                <div v-if="showModal">
                    <schedule-modal
                        :inputTextName="defaultText"
                        :colorValue="defaultColor"
                        :startTime="new Date().getTime()"
                        :endTime="new Date(new Date().getTime() + 30 * 60 * 1000).getTime()"
                        :editing="false"
                        @close="handleModalClose"
                        @submit="handleModalSubmit"
                    ></schedule-modal>
                </div>
                <div v-if="this.weekNum == 1 || this.weeklyView" class="dayTopText">
                    <span>{{ dayOfTheWeek }}</span>
                    <span>{{ dayNumber }}</span>
                </div>
                <div v-else class="dayTopTextNumOnly">
                    <span>{{ dayNumber }}</span>
                </div>
                <div v-for="holiday in holidays" :key="holiday">
                    <div v-if="holiday.date === `${month.id}/${dayNumber}`" class="holdiay-text">
                        <n-button
                            size="small"
                            strong
                            secondary
                            :type="getHolidayType(holiday.type)"
                            @mouseenter="handlePop(holiday)"
                            @mouseleave="handlePop(holiday)"
                            @click="openLink(holiday.promoLink, holiday.infoLink)"
                            >{{ holiday.name }}</n-button
                        >
                    </div>
                </div>
                <div v-if="events.length > 0">
                    <div
                        v-for="event in this.eventsForTheDay(
                            new Date(2023, month.id - 1, dayNumber).getTime()
                        )"
                    >
                        <div class="event-holder">
                            <Event :event="event" @delete="deleteEvent(event)"></Event>
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
import holidayData from "../assets/holiday.json";
import ScheduleModal from "./ScheduleModal.vue";
import { IconCalendarPlus } from "@tabler/icons-vue";
import Event from "./Event.vue";
export default {
    components: { ScheduleModal, Event, IconCalendarPlus },
    computed: {},
    data() {
        return {
            holidays: holidayData,
            showModal: false,
            defaultText: "",
            defaultColor: "rgba(255, 102, 128, 1)",
        };
    },
    emits: ["pop-up", "delete-event"],
    methods: {
        handlePop(holiday) {
            if (holiday.type === "federal") {
                this.$emit("pop-up", holiday);
            }
        },
        openLink(promoLink, infoLink) {
            window.open(infoLink, "_blank");
            window.open(promoLink, "_blank");

            event.stopImmediatePropagation();
        },
        addEvent() {
            this.showModal = true;
            event.stopImmediatePropagation();
        },
        handleModalSubmit(nameText, startTime, endTime, color) {
            let eventDate = new Date(2023, this.month.id - 1, this.dayNumber); // the month is 0-indexed
            this.events.push({
                name: nameText,
                startTime: startTime,
                endTime: endTime,
                date: eventDate,
                color: color,
            });
            this.showModal = false;
            event.stopImmediatePropagation();
        },
        handleModalClose() {
            this.showModal = false;
            event.stopImmediatePropagation();
        },
        deleteEvent(event) {
            this.$emit("delete-event", event);
        },
        getHolidayType(type) {
            switch (type) {
                case "federal":
                    return "error";
                case "national":
                    return "info";
                case "AG":
                    return "primary";
                default:
                    return "primary";
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
.holdiay-text {
    display: flex;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex-direction: column;
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
