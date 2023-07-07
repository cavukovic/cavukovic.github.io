<script>
import holidayData from "../assets/holiday.json";
import ScheduleModal from "./ScheduleModal.vue";
import Event from "./Event.vue";
export default {
    components: { ScheduleModal, Event },
    emits: ["pop-up"],
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
    data() {
        return {
            holidays: holidayData,
            showModal: false,
            defaultText: "",
            defaultColor: "rgba(255, 102, 128, 1)",
        };
    },
    computed: {},
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
                if (this.events[i].date.getTime() === date) {
                    sortedEvents.push(this.events[i]);
                }
            }
            sortedEvents.sort((a, b) => a.startTime - b.startTime);
            return sortedEvents;
        },
        // calculateDayOfYear(dateGiven) {
        //     let start = new Date(dateGiven.getFullYear(), 0, 0);
        //     let diff =
        //         dateGiven - start + (start.getTimezoneOffset() - dateGiven.getTimezoneOffset()) * 60 * 1000;
        //     let oneDay = 1000 * 60 * 60 * 24;
        //     let day = Math.floor(diff / oneDay);
        //     return 0;
        // },
    },
};
</script>

<template>
    <div v-if="dayNumber > -1">
        <div @click="addEvent" class="day-content2">
            <div v-if="showModal">
                <schedule-modal
                    :inputTextName="defaultText"
                    :colorValue="defaultColor"
                    :startTime="new Date().getTime()"
                    :endTime="new Date(new Date().getTime() + 30 * 60 * 1000).getTime()"
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
                <div v-for="event in this.eventsForTheDay(new Date(2023, month.id - 1, dayNumber).getTime())">
                    <div class="event-holder">
                        <Event :event="event"></Event>
                    </div>
                </div>
            </div>
            <div v-else></div>
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

<style scoped>
.dayTopText {
    display: flex; /* Use flexbox */
    justify-content: space-between; /* Distribute components with space between them */
    color: rgb(100, 100, 100);
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
    /* justify-content: space-between; */
    flex-direction: column;
    flex-grow: 3;
    min-width: 0;
    /* flex-direction: row; */
}

.event-holder {
    display: flex;
    justify-content: space-around;
    padding: 1%;
}
</style>
