<template>
    <n-drawer-content>
        <template #header
            ><div class="menu-and-moon">
                <div>Menu</div>
                <IconMoonFilled v-if="this.darkMode" @click="toggleDarkMode" class="moon" />
                <IconMoon v-else @click="toggleDarkMode" class="moon" /></div
        ></template>
        <n-collapse>
            <n-collapse-item title="&nbsp;&nbsp;Holidays">
                <template #arrow>
                    <IconCamper />
                </template>

                <n-checkbox
                    class="check-box-text"
                    size="medium"
                    v-model:checked="this.displayHolidaysMenu"
                    @update:checked="this.handleDisplayHolidays()"
                >
                    Display Holidays
                </n-checkbox>

                <n-collapse>
                    <n-collapse-item title="Federal Holidays">
                        <n-space class="radio-group">
                            <n-radio
                                :checked="this.checkedValueFed === 'Red'"
                                value="Red"
                                @change="handleChangeFed"
                            >
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
                            <n-radio
                                :checked="this.checkedValueNat === 'Red'"
                                value="Red"
                                @change="handleChangeNat"
                            >
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
            </n-collapse-item>
        </n-collapse>
        <hr />
        <n-collapse>
            <n-collapse-item title="&nbsp;&nbsp;Events">
                <template #arrow>
                    <IconCalendarEvent />
                </template>
                <div class="delete-button">
                    <n-button strong secondary type="error" @click="handleDelete">Delete All events</n-button>
                </div>
            </n-collapse-item>
        </n-collapse>
        <hr />
        <n-collapse>
            <n-collapse-item title="&nbsp;&nbsp;Shortcuts">
                <template #arrow>
                    <IconKeyboard />
                </template>
                <ul class="shortcut-list">
                    <li><kbd>Tab</kbd> + <kbd>t</kbd> - Returns to today's date</li>
                    <li><kbd>Tab</kbd> + <kbd>m</kbd> - Opens the menu</li>
                    <li><kbd>Tab</kbd> + <kbd>v</kbd> - Changes between month view and week view</li>
                    <li><kbd>Tab</kbd> + <kbd>h</kbd> - Toggles holidays on and off</li>
                    <li><kbd>Tab</kbd> + <kbd>d</kbd> - Toggles dark mode on and off</li>
                    <li><kbd>Tab</kbd> + <kbd>&gt;</kbd> - Goes to the next month</li>
                    <li><kbd>Tab</kbd> + <kbd>&lt;</kbd> - Goes to the previous month</li>
                </ul>
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
import { IconMoon, IconMoonFilled, IconCamper, IconCalendarEvent, IconKeyboard } from "@tabler/icons-vue";
export default {
    components: {
        holidayData,
        Holiday,
        IconMoon,
        IconMoonFilled,
        IconCamper,
        IconCalendarEvent,
        IconKeyboard,
    },
    emits: ["display-holidays", "update-colors", "delete-all-events", "dark-mode"],
    computed: {},
    data() {
        return {
            displayHolidaysMenu: true,
            checkedValueFed: this.holidayColors.federal,
            checkedValueNat: this.holidayColors.national,
            checkedValueSpec: this.holidayColors.special,
            checkedValueMonth: this.holidayColors.month,
            holidays: holidayData,
            darkModeMenu: false,
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
            this.$emit("display-holidays", this.displayHolidaysMenu);
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
        handleDelete() {
            this.$emit("delete-all-events");
        },
        toggleDarkMode() {
            this.darkModeMenu = !this.darkModeMenu;
            this.$emit("dark-mode");
        },
    },
    mounted() {
        this.darkModeMenu = this.darkMode;
        this.displayHolidaysMenu = this.displayHolidays;
    },
    props: {
        darkMode: {
            type: Boolean,
            required: true,
        },
        holidayColors: {
            type: Object,
            required: true,
        },
        displayHolidays: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.menu-and-moon {
    display: flex;
    align-items: center;
}
.moon {
    padding-left: 375px;
    /* padding-top: 10px; */
}
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

.shortcut-list {
    list-style-type: none;
    padding-left: 10px;
    margin: 0px;
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
.delete-button {
    padding-left: 5px;
}
.n-collapse {
    --n-title-font-size: 16px !important;
}
</style>
