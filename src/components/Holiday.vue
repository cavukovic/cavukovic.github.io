<template>
    {{ this.getHoliday() }}
    <div v-if="this.holiday" class="holdiay-text">
        <n-button
            size="small"
            strong
            secondary
            :type="getHolidayType(this.holiday.type)"
            @mouseenter="handlePop(this.holiday)"
            @mouseleave="handlePop(this.holiday)"
            @click="openLink(this.holiday.promoLink, this.holiday.infoLink)"
            >{{ this.displayName(this.holiday) }}</n-button
        >
    </div>
</template>

<script>
import holidayData from "../assets/holiday.json";
export default {
    components: {},
    emits: ["pop-up"],
    computed: {},
    data() {
        return {
            holidays: holidayData,
            holiday: "",
        };
    },
    methods: {
        getHolidayType(type) {
            switch (type) {
                case "federal":
                    return this.getHolidayColor(this.holidayColors.federal);
                case "national":
                    return this.getHolidayColor(this.holidayColors.national);
                case "special":
                    return this.getHolidayColor(this.holidayColors.special);
                case "month":
                    return this.getHolidayColor(this.holidayColors.month);
                default:
                    return "primary";
            }
        },
        getHolidayColor(color) {
            switch (color) {
                case "Red":
                    return "error";
                case "Blue":
                    return "info";
                case "Green":
                    return "primary";
                case "Gray":
                    return "default";
                case "Yellow":
                    return "warning";
                case "Gray":
                    return "default";
                default:
                    return "default";
            }
        },
        displayName(holiday) {
            // for displaying holidays in the search
            if (!this.showDate) {
                return holiday.name;
            } else {
                return `${holiday.name}  -  ${holiday.date}`;
            }
        },
        openLink(promoLink, infoLink) {
            window.open(infoLink, "_blank");
            window.open(promoLink, "_blank");

            event.stopImmediatePropagation();
        },
        handlePop(holiday) {
            // handles the hover over of federal holidays
            if (holiday.type === "federal") {
                this.$emit("pop-up", holiday);
            }
        },
        getHoliday() {
            this.holiday = this.holidays[this.date];
        },
    },
    props: {
        date: {
            type: String,
            required: true,
        },
        holidayColors: {
            type: Object,
            required: true,
        },
        showDate: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.holdiay-text {
    display: flex;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex-direction: column;
}

.n-button .n-button__content {
    white-space: pre !important;
}
</style>
