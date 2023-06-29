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

            // deal with how we want the pop up to display
            if (this.displayPop) {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight - 160; // 160 for height of header

                const sectionWidth = screenWidth / 2;
                const sectionHeight = screenHeight / 3;

                const mouseX = event.clientX;
                const mouseY = event.clientY;

                let section = "";

                // Check horizontal section
                if (mouseX < sectionWidth) {
                    section = "L" + section; // left
                } else {
                    section = "R" + section; // right
                }

                // Check vertical section
                if (mouseY < sectionHeight) {
                    section += "T"; // top
                } else if (mouseY < sectionHeight * 2) {
                    section += "M"; // middle
                } else {
                    section += "B"; // bottom
                }

                switch (section) {
                    case "LT":
                        this.mouseX = mouseX + 10;
                        this.mouseY = mouseY + 10;
                        break;
                    case "LM":
                        this.mouseX = mouseX + 10;
                        this.mouseY = mouseY - 250 - 10;
                        break;
                    case "LB":
                        this.mouseX = mouseX + 10;
                        this.mouseY = mouseY - 500 - 10;
                        break;
                    case "RT":
                        this.mouseX = mouseX - 700 - 20;
                        this.mouseY = mouseY + 10;
                        break;
                    case "RM":
                        this.mouseY = mouseY - 250 - 10;
                        this.mouseX = mouseX - 700 - 20;
                        break;
                    case "RB":
                        this.mouseY = mouseY - 500 - 10;
                        this.mouseX = mouseX - 700 - 20;
                        break;
                    default:
                        this.mouseX = 0;
                        this.mouseY = 0;
                }
            }
        },
    },
};
</script>
<template>
    <div class="month-container">
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
    </div>
</template>

<style scoped>
/* Month.vue */
.month {
    display: grid;
    grid-template-rows: repeat(6, auto);
    border-top: 1px solid rgba(0, 0, 0, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    border-left: 1px solid rgba(0, 0, 0, 1);
    border-right: 1px solid rgba(0, 0, 0, 1);
    gap: 0; /* Adjust the gap between rows as desired */
    width: 90%;
    justify-self: center;
}
.month-container {
    display: grid;
}

.popup {
    position: fixed;
    z-index: 9999;
}
</style>
