<script>
export default {
    components: {},
    emits: [],
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<template>
    <div class="event" :style="{ backgroundColor: event.color }">
        <span class="event-name">{{ event.name }}</span
        >&nbsp;
        <span class="event-time">{{ event.time }}</span>
    </div>
</template>

<style scoped>
.event {
    display: flex;
    min-width: 0;
    justify-content: space-evenly;
    max-width: 95%;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    /* max-width: 100%; */
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
