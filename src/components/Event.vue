<template>
    <div v-if="!dayColView" class="event" :style="{ backgroundColor: event.color }" @click="editEvent">
        <span class="event-name">{{ event.name }}</span
        >&nbsp;
        <span class="event-time">{{ formatTime(event.startTime) }}</span>
    </div>
    <div
        v-else-if="height <= 100"
        class="event-col"
        :style="{ backgroundColor: event.color }"
        @click="editEvent"
    >
        <span class="event-name-col">{{ event.name }}</span>
        <span class="event-time-col"
            >&nbsp;{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</span
        >
    </div>
    <div v-else class="event-col-big" :style="{ backgroundColor: event.color }" @click="editEvent">
        <div class="event-col-big-top">
            <span class="event-name-col">{{ event.name }}</span>
            <span class="event-time-col"
                >&nbsp;{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</span
            >
        </div>
        <div class="event-desc-col">{{ event.desc }}</div>
    </div>

    <div v-if="showModal">
        <schedule-modal
            :inputTextName="this.event.name"
            :inputTextDesc="this.event.desc"
            :colorValue="this.event.color"
            :startTime="this.event.startTime"
            :endTime="this.event.endTime"
            :editing="true"
            @close="handleModalClose"
            @submit="handleModalSubmit"
            @delete="handleModalDelete"
        ></schedule-modal>
    </div>
</template>

<script>
import ScheduleModal from "./ScheduleModal.vue";
export default {
    components: { ScheduleModal },
    emits: ["delete", "edited"],
    data() {
        return {
            eventText: this.event.name,
            eventDesc: this.event.desc,
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
        handleModalSubmit(nameText, descText, startTime, endTime, color) {
            this.event.name = nameText;
            this.eventText = this.event.name;

            this.event.desc = descText;
            this.eventDesc = this.event.desc;

            this.event.startTime = startTime;
            this.eventStartTime = this.event.startTime;

            this.event.endTime = endTime;
            this.eventEndTime = this.event.endTime;

            this.event.color = color;
            this.eventColor = this.event.color;

            this.showModal = false;
            this.$emit("edited");
            event.stopImmediatePropagation();
        },
        handleModalClose() {
            this.showModal = false;
            event.stopImmediatePropagation();
        },
        handleModalDelete() {
            this.$emit("delete");
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
    props: {
        event: {
            type: Object,
            required: true,
        },
        dayColView: {
            type: Boolean,
            required: true,
        },
        height: {
            type: Number,
            required: false,
        },
    },
};
</script>

<style scoped>
.event {
    display: flex;
    min-width: 100%;
    justify-content: space-between;
    max-width: 95%;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    height: 100%;
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

.event-col {
    display: flex;
    min-width: 100%;
    justify-content: space-between;
    max-width: 95%;
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    height: 100%;
}

.event-col-big {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    justify-content: space-between;
    max-width: 95%;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    height: 100%;
}
.event-col-big-top {
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}

.event-desc-col {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 2%;
    padding-right: 2%;
    padding-bottom: 2%;
}

.event-name-col {
    overflow: hidden;
    font-weight: bolder;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.event-time-col {
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
