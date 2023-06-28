<script>
import Week from "./Week.vue";

export default {
    components: {
        Week,
    },
    props: {
        month: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            displayPop: false,
            mouseX: 0,
            mouseY: 0,
            holiday: {},
        };
    },
    methods: {
        calculateWeeks() {
            if (this.month.offset + this.month.lastDay <= 35) {
                return 5;
            }
            return 6;
        },
        popUp(holiday) {
            this.holiday = holiday;
            this.displayPop = !this.displayPop;
            if (this.displayPop) {
                this.mouseX = event.clientX + 5;
                if (this.mouseX > 600) {
                    this.mouseX -= 700 + 20;
                }
                this.mouseY = event.clientY + 5;
                if (this.mouseY > 500) {
                    this.mouseY -= 500 + 30;
                }
                //want to add something for flipping the pop up
            }
        },
    },
};
</script>
<template>
    <div class="month">
        <!-- pass the  7 numbers we need to week-->
        <div v-for="index in calculateWeeks()" :key="index">
            <Week :month="month" :weekly-offset="index - 1" @pop-up="popUp">
            </Week>
        </div>
        <div
            v-if="displayPop"
            class="popup"
            :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
        >
            <iframe
                :src="this.holiday.link"
                frameborder="1"
                width="700"
                height="500"
            ></iframe>
        </div>
    </div>
</template>

<style scoped>
/* Month.vue */
.month {
    display: grid;
    grid-template-rows: repeat(6, auto);
    border-top: 1px solid rgba(0, 0, 0, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    gap: 0; /* Adjust the gap between rows as desired */
}

.popup {
    position: fixed;
    z-index: 9999;
}
</style>
