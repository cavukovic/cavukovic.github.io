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
    },
    data() {
        return {
            holidays: holidayData,
            showModal: false,
            events: [],
            defaultText: "",
            defaultColor: "rgba(255, 102, 128, 1)",
            // events: [
            //     { name: "Dentist", time: "1:00pm" },
            //     { name: "Meeting", time: "3:00pm" },
            // ],
        };
    },
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
                    break;
                case "national":
                    return "info";
                    break;
                case "AG":
                    return "primary";
                    break;
                default:
                    return "primary";
            }
        },
        calculateDayOfYear(dateGiven) {
            let start = new Date(dateGiven.getFullYear(), 0, 0);
            let diff =
                dateGiven - start + (start.getTimezoneOffset() - dateGiven.getTimezoneOffset()) * 60 * 1000;
            let oneDay = 1000 * 60 * 60 * 24;
            let day = Math.floor(diff / oneDay);
            console.log("Day of year: " + day);
            return 0;
        },
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
            <div class="dayTopText">
                <span>{{ dayOfTheWeek }}</span>
                {{ dayNumber }}
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

            <!-- {{ calculateDayOfYear(new Date(2023, month.id - 1, dayNumber)) }} -->
            <div v-if="events.length > 0">
                <div v-for="event in events">
                    <div
                        class="event-holder"
                        v-if="event.date.getTime() === new Date(2023, month.id - 1, dayNumber).getTime()"
                    >
                        <Event :event="event"></Event>
                    </div>
                </div>
            </div>
            <div v-else></div>

            <!-- <div>Date: {{ month.id }}/{{ dayNumber }}/23</div> -->
        </div>
    </div>
    <div v-else>
        <div class="day-content2">
            <div class="dayTopText">
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
.holdiay-text {
    display: flex;
    color: red;
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
