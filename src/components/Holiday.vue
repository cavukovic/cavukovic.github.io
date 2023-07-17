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
            >{{ this.holiday.name }}</n-button
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
                    return "error";
                case "national":
                    return "info";
                case "AG":
                    return "primary";
                default:
                    return "primary";
            }
        },
        openLink(promoLink, infoLink) {
            window.open(infoLink, "_blank");
            window.open(promoLink, "_blank");

            event.stopImmediatePropagation();
        },
        handlePop(holiday) {
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
</style>
