<template>
    <n-drawer-content>
        <template #header class="menu-header"> Menu </template>
        <n-checkbox
            class="check-box-text"
            size="medium"
            v-model:checked="displayHolidays"
            @update:checked="this.handleDisplayHolidays()"
        >
            Display Holidays
        </n-checkbox>
        <hr />
        <!-- <div class="check-box-text">Federal Holidays</div> -->
        <n-collapse>
            <n-collapse-item title="Federal Holidays">
                <n-space class="radio-group">
                    <n-radio :checked="this.checkedValueFed === 'Red'" value="Red" @change="handleChangeFed">
                        Red
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueFed === 'Blue'"
                        value="Blue"
                        @change="handleChangeFed"
                    >
                        Blue
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueFed === 'Green'"
                        value="Green"
                        @change="handleChangeFed"
                    >
                        Green</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueFed === 'Yellow'"
                        value="Yellow"
                        @change="handleChangeFed"
                    >
                        Yellow</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueFed === 'Gray'"
                        value="Gray"
                        @change="handleChangeFed"
                    >
                        Gray</n-radio
                    >
                </n-space>
            </n-collapse-item>
        </n-collapse>
        <!-- <div class="check-box-text">National Holidays</div> -->
        <n-collapse>
            <n-collapse-item title="National Holidays">
                <n-space class="radio-group">
                    <n-radio :checked="this.checkedValueNat === 'Red'" value="Red" @change="handleChangeNat">
                        Red
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueNat === 'Blue'"
                        value="Blue"
                        @change="handleChangeNat"
                    >
                        Blue
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueNat === 'Green'"
                        value="Green"
                        @change="handleChangeNat"
                    >
                        Green</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueNat === 'Yellow'"
                        value="Yellow"
                        @change="handleChangeNat"
                    >
                        Yellow</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueNat === 'Gray'"
                        value="Gray"
                        @change="handleChangeNat"
                    >
                        Gray</n-radio
                    >
                </n-space>
            </n-collapse-item>
        </n-collapse>

        <n-collapse>
            <n-collapse-item title="Month Holidays">
                <n-space class="radio-group">
                    <n-radio
                        :checked="this.checkedValueMonth === 'Red'"
                        value="Red"
                        @change="handleChangeMonth"
                    >
                        Red
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueMonth === 'Blue'"
                        value="Blue"
                        @change="handleChangeMonth"
                    >
                        Blue
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueMonth === 'Green'"
                        value="Green"
                        @change="handleChangeMonth"
                    >
                        Green</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueMonth === 'Yellow'"
                        value="Yellow"
                        @change="handleChangeMonth"
                    >
                        Yellow</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueMonth === 'Gray'"
                        value="Gray"
                        @change="handleChangeMonth"
                    >
                        Gray</n-radio
                    >
                </n-space>
            </n-collapse-item>
        </n-collapse>
        <!-- <div class="check-box-text">Specialty Holidays</div> -->
        <n-collapse>
            <n-collapse-item title="Specialty Holidays">
                <n-space class="radio-group">
                    <n-radio
                        :checked="this.checkedValueSpec === 'Red'"
                        value="Red"
                        @change="handleChangeSpec"
                    >
                        Red
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueSpec === 'Blue'"
                        value="Blue"
                        @change="handleChangeSpec"
                    >
                        Blue
                    </n-radio>
                    <n-radio
                        :checked="this.checkedValueSpec === 'Green'"
                        value="Green"
                        @change="handleChangeSpec"
                    >
                        Green</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueSpec === 'Yellow'"
                        value="Yellow"
                        @change="handleChangeSpec"
                    >
                        Yellow</n-radio
                    >
                    <n-radio
                        :checked="this.checkedValueSpec === 'Gray'"
                        value="Gray"
                        @change="handleChangeSpec"
                    >
                        Gray</n-radio
                    >
                </n-space>
            </n-collapse-item>
        </n-collapse>
        <hr />
        <div class="check-box-text">Search</div>
        <div class="search-box-container">
            <n-input
                @keyup.enter="handleSearch"
                @input="handleSearch"
                type="text"
                v-model:value="searchQuery"
                placeholder="Search holidays by date or name"
                class="input"
            >
            </n-input>
            <ul v-if="searchResults.length > 0" style="list-style: none">
                <li v-for="(result, index) in searchResults" :key="index" class="results">
                    <Holiday
                        :date="
                            new Date(result.date).toLocaleDateString(`en-us`, {
                                month: `numeric`,
                                day: `numeric`,
                            })
                        "
                        @pop-up="popUp"
                        :holidayColors="holidayColors"
                        :showDate="true"
                    />
                </li>
            </ul>
            <p v-else>No results found.</p>
        </div>
    </n-drawer-content>
</template>

<script>
import holidayData from "../assets/holiday.json";
import Holiday from "./Holiday.vue";
export default {
    components: { holidayData, Holiday },
    emits: ["display-holidays", "update-colors"],
    computed: {},
    data() {
        return {
            displayHolidays: true,
            checkedValueFed: "Red",
            checkedValueNat: "Blue",
            checkedValueSpec: "Green",
            checkedValueMonth: "Gray",
            holidayColors: {
                federal: "Red",
                national: "Blue",
                special: "Green",
                month: "Gray",
            },
            holidays: holidayData,
            searchQuery: "",
            searchResults: [],
        };
    },
    methods: {
        popUp() {},
        handleSearch() {
            const searchTerm = this.searchQuery.toLowerCase().trim();
            if (searchTerm === "") {
                this.searchResults = [];
                return;
            }

            const results = Object.values(this.holidays).filter((holiday) => {
                const name = holiday.name.toLowerCase();
                const date = holiday.date.toLowerCase();
                return name.includes(searchTerm) || date.includes(searchTerm);
            });

            this.searchResults = results;
        },
        handleDisplayHolidays() {
            this.$emit("display-holidays", this.displayHolidays);
        },
        handleChangeFed(e) {
            this.checkedValueFed = e.target.value;
            this.holidayColors.federal = this.checkedValueFed;
            this.$emit("update-colors", this.holidayColors);
        },
        handleChangeNat(e) {
            this.checkedValueNat = e.target.value;
            this.holidayColors.national = this.checkedValueNat;
            this.$emit("update-colors", this.holidayColors);
        },
        handleChangeMonth(e) {
            this.checkedValueMonth = e.target.value;
            this.holidayColors.month = this.checkedValueMonth;
            this.$emit("update-colors", this.holidayColors);
        },
        handleChangeSpec(e) {
            this.checkedValueSpec = e.target.value;
            this.holidayColors.special = this.checkedValueSpec;
            this.$emit("update-colors", this.holidayColors);
        },
    },
    props: {},
};
</script>

<style scoped>
.check-box-text {
    font-size: medium;
    padding: 1%;
}

.radio-group {
    flex-direction: column !important;
    padding-left: 4%;
}
hr {
    height: 1px;
    width: 100%;
    background-color: rgba(190, 190, 190, 0.5);
    border: none;
}

.search-box-container {
    display: flex;
    text-align: center;
    flex-direction: column;
}
.results {
    width: 100%;
    position: relative;
    transform: translateX(-20px);
    padding: 1%;
}

.n-collapse {
    --n-title-font-size: 16px !important;
}
</style>
