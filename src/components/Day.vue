<script>
import holidayData from "../assets/holiday.json";
import ScheduleModal from "./ScheduleModal.vue";
export default {
    components: { ScheduleModal },
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
            // events: [
            //     { name: "Dentist", time: "1:00pm" },
            //     { name: "Meeting", time: "3:00pm" },
            // ],
        };
    },
    methods: {
        handlePop(holiday) {
            this.$emit("pop-up", holiday);
        },
        openLink(link) {
            window.open(link, "_blank");
        },
        addEvent() {
            // add event is being called right after i click close and i dont know why
            console.log("add event is called");
            console.log("show modal in add event " + this.showModal);
            this.showModal = !this.showModal;
            console.log("show modal in add event " + this.showModal);
            console.log("\n");
        },
        handleModalSubmit(text) {
            // Handle the submitted text
            console.log("Submitted text:", text);
            this.showModal = !this.showModal;
        },
        handleModalClose() {
            console.log("show modal in handle close " + this.showModal);
            console.log("trying to close here too");
            this.showModal = !this.showModal;
            console.log("show modal in handle close " + this.showModal);
        },
    },
};
</script>

<template>
    <div v-if="dayNumber > -1">
        <div @click="addEvent" class="day-content2">
            {{ console.log("the state of showmodal is " + this.showModal) }}
            <div v-if="showModal">
                <schedule-modal
                    @close="handleModalClose"
                    @submit="handleModalSubmit"
                ></schedule-modal>
            </div>
            <div class="dayTopText">
                <span>{{ dayOfTheWeek }}</span>
                {{ dayNumber }}
            </div>

            <div v-for="holiday in holidays" :key="holiday">
                <div
                    v-if="holiday.date === `${month.id}/${dayNumber}`"
                    class="holdiay-text"
                >
                    <n-button
                        @mouseenter="handlePop(holiday)"
                        @mouseleave="handlePop(holiday)"
                        @click="openLink(holiday.link)"
                        >{{ holiday.name }}</n-button
                    >
                </div>
            </div>

            <div v-if="events.length > 0">
                <div v-for="event in events">
                    {{ event.name }} {{ event.time }}
                </div>
            </div>
            <div v-else>You have no events</div>

            <div>Date: {{ month.id }}/{{ dayNumber }}/23</div>
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
}

.day-content2 {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 3;
    /* flex-direction: row; */
}
</style>
