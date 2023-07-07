<script>
import ScheduleModal from "./ScheduleModal.vue";
export default {
    components: { ScheduleModal },
    emits: [],
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            eventText: this.event.name,
            eventStartTime: this.event.startTime,
            eventEndTime: this.event.endTime,
            eventColor: this.event.color,
            showModal: false,
        };
    },
    methods: {
        editEvent() {
            this.showModal = true;
            event.stopImmediatePropagation();
        },
        handleModalSubmit(nameText, startTime, endTime, color) {
            this.event.name = nameText;
            this.eventText = this.event.name;

            this.event.startTime = startTime;
            this.eventStartTime = this.event.startTime;

            this.event.endTime = endTime;
            this.eventEndTime = this.event.endTime;

            this.event.color = color;
            this.eventColor = this.event.color;

            this.showModal = false;
            event.stopImmediatePropagation();
        },
        handleModalClose() {
            this.showModal = false;
            event.stopImmediatePropagation();
        },
        formatTime(time) {
            const selectedTime = new Date(time);
            const formattedTime = selectedTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
            });
            return formattedTime;
        },
    },
};
</script>

<template>
    <div class="event" :style="{ backgroundColor: event.color }" @click="editEvent">
        <span class="event-name">{{ event.name }}</span
        >&nbsp;
        <span class="event-time">{{ formatTime(event.startTime) }}</span>

        <div v-if="showModal">
            <schedule-modal
                :inputTextName="this.event.name"
                :colorValue="this.event.color"
                :startTime="this.event.startTime"
                :endTime="this.event.endTime"
                @close="handleModalClose"
                @submit="handleModalSubmit"
            ></schedule-modal>
        </div>
    </div>
</template>

<style scoped>
.event {
    display: flex;
    min-width: 100%;
    justify-content: space-evenly;
    max-width: 95%;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
}

.event-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.event-time {
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
