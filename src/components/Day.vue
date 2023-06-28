<script>
import holidayData from "../assets/holiday.json";
export default {
    components: { holidayData },
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
            console.log("TODO, deal with event adding");
        },
    },
};
</script>

<template>
    <div v-if="dayNumber > -1">
        <div @click="addEvent" class="day-content2">
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
            <div>You have no events</div>
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

/* Optionally, you can add additional styling to the content within each cell */
.day-content {
    /*flex-grow: 1;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*align-items: stretch;  Stretch the day cell vertically */
    /* width: 100%;*/
    align-content: space-between;
    flex-wrap: wrap;

    padding: 1%;
}

.day-content2 {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 3;
    /* flex-direction: row; */
}

/*.day-cell {
    display: grid;
    border: 1px solid #000000;
    height: 100%;
    justify-content: center;
} dont think i need this anymore */
/*.empty-day-cell {
    display: grid;
    border: 1px solid #812424;
    height: 100%;
}  dont think i need this anymore? */
</style>
