<script>
import { uploadDark } from "naive-ui";
import Day from "./Day.vue";

export default {
    components: {
        Day,
    },
    props: {
        weeklyOffset: {
            type: Number,
            required: true,
        },
        month: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            daysOfTheWeek: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            count: 0,
        };
    },
    computed: {},
    emits: ["pop-up"],
    methods: {
        popUp(holiday) {
            this.$emit("pop-up", holiday);
        },
    },
};
</script>
<template>
    <div class="week">
        <!-- deal with maximum -->
        <div
            v-for="(day, index) in daysOfTheWeek"
            :key="`item-${index}`"
            class="test"
        >
            <div
                v-if="
                    index - month.offset + 1 + weeklyOffset * 7 < 1 ||
                    index - month.offset + 1 + weeklyOffset * 7 > month.lastDay
                "
                class="day-holder"
                :style="{
                    backgroundColor: `rgba(189, 204, 220, .5)`,
                }"
            >
                <!-- I dont know how i feel about graying out "fake" days 
            This would be where we want to style for today's date, feel like i should do this later tho -->
                <div>
                    <Day
                        class="day-holder"
                        :day-of-the-week="day"
                        :day-number="-1"
                        :month="month"
                    ></Day>
                </div>
            </div>
            <div v-else class="day-holder">
                <n-message-provider
                    ><Day
                        class="day-holder"
                        :day-of-the-week="day"
                        :day-number="
                            index - month.offset + 1 + weeklyOffset * 7
                        "
                        :month="month"
                        @pop-up="popUp"
                    ></Day
                ></n-message-provider>
            </div>
        </div>
    </div>
</template>
<!-- dont render boxes for the days the dont have a number? do it in day.vue?-->
<style scoped>
.week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 0px; /* Adjust the gap between cells as desired */
    min-height: 110px;
}

.day-holder {
    display: flex;
    width: 100%;
    padding: 2px;
    min-width: 0;
    align-items: stretch;
}

.test1 {
    display: flex;
    border: 0.5px solid rgba(0, 0, 0, 1);
    text-align: center;

    justify-content: center;
    align-items: stretch; /* Stretch the day cell vertically */
}
.test {
    display: flex;
    border: 0.5px solid rgba(0, 0, 0, 1);
    justify-content: stretch;
    flex-grow: 1;
    min-width: 0;
}

/* .grid-item {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 1);
    padding: 2px;
    text-align: center;
    align-items: stretch; Stretch the day cell vertically
} */
</style>
