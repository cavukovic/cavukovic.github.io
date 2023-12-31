<template>
    <!-- this is for when the user clicks outside the modal we want it to close -->
    <div class="overlay" @click="handleClose"></div>
    <div class="modal">
        <div class="modal-top">
            <div class="modal-title">Event Details</div>
            <div class="x-button">
                <IconX @click="handleClose" />
            </div>
        </div>
        <hr />
        <div class="word-name">Name</div>
        <div class="name-input-container">
            <n-input
                @keyup.enter="handleSubmit"
                type="text"
                v-model:value="inputTextNameLocal"
                placeholder="Add a Name"
                class="input"
            >
            </n-input>
        </div>
        <div class="word-desc">Description</div>
        <div class="desc-input-container">
            <n-input
                @keyup.enter="handleSubmit"
                v-model:value="inputTextDescLocal"
                placeholder="Add a Description"
                type="textarea"
                class="input"
            />
        </div>
        <div class="word-name">Location</div>
        <div class="name-input-container">
            <n-input
                @keyup.enter="handleSubmit"
                @input="handleLocationInput"
                type="text"
                v-model:value="inputTextLocationLocal"
                placeholder="Add a Location"
                class="input"
            >
            </n-input>
        </div>
        <div
            v-if="showSuggestions && this.inputTextLocationLocal !== ``"
            class="suggestions-container"
            :style="suggestionsContainer"
        >
            <div v-for="(suggestion, index) in locationSuggestions[0].value" :key="index">
                <div @click="selectSuggestion(suggestion)" class="suggestions">
                    {{ suggestion.address.formattedAddress }}
                </div>
            </div>
        </div>
        <n-space class="n-space">
            <div class="clock-icon">
                <IconClock />
            </div>
            <div class="time-picker-container">
                <div class="time-picker">
                    <n-time-picker
                        class="override"
                        v-model:value="startTimeLocal"
                        :default-value="startTime"
                        format="h:mm a"
                        :minutes="15"
                        :use-12-hours="true"
                    >
                    </n-time-picker>
                    <div class="to-text">to</div>
                    <n-time-picker
                        class="override"
                        v-model:value="endTimeLocal"
                        :default-value="endTime"
                        format="h:mm a"
                        :minutes="15"
                        :use-12-hours="true"
                    />
                </div>
            </div>
            <div class="vl"></div>
            <div class="color-icon">
                <IconPalette />
            </div>
            <div class="color-picker">
                <n-color-picker
                    :swatches="[
                        '#ff6680', //red
                        '#FBB65D', //orange
                        '#F9F179', //yellow
                        '#66ff99', //green
                        '#66ccff', //blue
                        '#BCA6FF', //light purple
                        '#FF83E2', //fuscia-pink
                        '#D7D7D7', //gray
                    ]"
                    @confirm="handleConfirm"
                    :actions="['confirm']"
                    :default-value="colorValue"
                    v-model="colorValueLocal"
                />
            </div>
            <div v-if="!editing">
                <div class="word-desc">Repeat</div>
                <div class="radio-group">
                    <n-space>
                        <n-radio
                            :checked="this.checkedValue === 'Never'"
                            value="Never"
                            @change="handleChange"
                        >
                            Never
                        </n-radio>
                        <n-radio
                            :checked="this.checkedValue === 'Daily'"
                            value="Daily"
                            @change="handleChange"
                        >
                            Daily
                        </n-radio>
                        <n-radio
                            :checked="this.checkedValue === 'Weekly'"
                            value="Weekly"
                            @change="handleChange"
                        >
                            Weekly
                        </n-radio>
                        <n-radio
                            :checked="this.checkedValue === 'Monthly'"
                            value="Monthly"
                            @change="handleChange"
                        >
                            Monthly
                        </n-radio>
                    </n-space>
                </div>
            </div>
        </n-space>
        <hr />
        <div :class="buttonStyle">
            <div v-if="editing">
                <n-button strong secondary type="error" @click="handleDelete">Delete</n-button>
            </div>
            <div>
                <n-button strong secondary type="success" @click="handleSubmit">Submit</n-button>
            </div>
        </div>
    </div>
</template>

<script>
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { IconX, IconClock, IconPalette } from "@tabler/icons-vue";
export default {
    components: { useMessage, IconX, IconClock, IconPalette },
    computed: {
        buttonStyle() {
            return this.editing ? "button-container-two" : "button-container-one";
        },
        suggestionsContainer() {
            return this.editing ? { top: "69.2%" } : { top: "60.5%" };
        },
    },
    data() {
        return {
            checkedValue: "Never",
            inputTextNameLocal: this.inputTextName,
            inputTextDescLocal: this.inputTextDesc,
            colorValueLocal: this.colorValue,
            startTimeLocal: this.startTime,
            endTimeLocal: this.endTime,
            inputTextLocationLocal: this.inputTextLocation,
            showSuggestions: false,
            locationSuggestions: [],
        };
    },
    emits: ["submit", "close", "delete"],
    methods: {
        async handleLocationInput() {
            if (!this.inputTextLocationLocal || this.inputTextLocationLocal === "") {
                this.showSuggestions = false;
                return;
            }

            try {
                const response = await fetch(
                    `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${encodeURIComponent(
                        this.inputTextLocationLocal
                    )}&key=AvLTukfq9ohN7O1eczHs5GlVylWnag-JEAKmWeGeL3GKWhq80LJS24Ke3MvO75_I`
                );
                const data = await response.json();

                this.locationSuggestions = data.resourceSets[0].resources;
                this.showSuggestions = true;
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            }
        },

        selectSuggestion(suggestion) {
            this.inputTextLocationLocal = suggestion.address.formattedAddress;
            this.showSuggestions = false;
        },
        handleSubmit() {
            if (this.endTimeLocal <= this.startTimeLocal) {
                console.log("here");
                this.message.error("End time must be later than start time");
            } else {
                this.$emit(
                    "submit",
                    this.inputTextNameLocal,
                    this.inputTextDescLocal,
                    this.inputTextLocationLocal,
                    this.startTimeLocal,
                    this.endTimeLocal,
                    this.colorValueLocal,
                    this.checkedValue
                );
            }
            this.inputText = "";
        },
        handleClose() {
            this.$emit("close");
            this.inputText = "";
        },
        handleDelete() {
            this.$emit("delete");
        },
        handleConfirm(value) {
            this.colorValueLocal = value;
        },
        handleChange(e) {
            this.checkedValue = e.target.value;
        },
    },
    props: {
        inputTextName: {
            type: String,
            required: true,
        },
        inputTextDesc: {
            type: String,
            required: true,
        },
        inputTextLocation: {
            type: String,
            required: true,
        },
        colorValue: {
            type: String,
            required: true,
        },
        startTime: {
            type: Number,
            required: true,
        },
        endTime: {
            type: Number,
            required: true,
        },
        editing: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const message = ref(useMessage());

        return {
            message,
        };
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* gray background */
    z-index: 998;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    width: 25%;
    z-index: 999;
}
.modal-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
}

hr {
    height: 1px;
    width: 100%;
    background-color: rgba(190, 190, 190, 0.5);
    border: none;
}

.word-name {
    width: 100%;
    text-align: start;
    padding-top: 1%;
}

.word-desc {
    width: 100%;
    text-align: start;
    padding-top: 2%;
}

.n-space {
    padding-top: 2%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.clock-icon {
    align-items: center;
    display: flex;
}
.color-icon {
    align-items: center;
    display: flex;
}

.vl {
    border-left: 1px solid rgba(190, 190, 190, 0.5);
    height: 30px;
}
.radio-group {
    padding-left: 20px;
}
.button-container-one {
    display: flex;
    justify-content: flex-end;
    padding-left: 1%;
    padding-right: 1%;
    padding-top: 1%;
    width: 100%;
}

.button-container-two {
    display: flex;
    justify-content: space-between;
    padding-left: 1%;
    padding-right: 1%;
    padding-top: 1%;
    width: 100%;
}

.name-input-container {
    display: flex;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 2%;
    width: 100%;
}

.desc-input-container {
    display: flex;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 2%;
    width: 100%;
    line-height: 20px;
}

.input {
    display: flex;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.suggestions-container {
    height: auto;
    z-index: 1000;
    position: fixed;
    top: 60.5%;
    width: 88.6%;
    border-radius: 3px 3px 7px 7px;
    border-left: 1px solid rgb(110, 110, 110);
    border-right: 1px solid rgb(110, 110, 110);
    border-bottom: 1px solid rgb(110, 110, 110);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2), /* bottom */ 0px 0px 0px rgba(0, 0, 0, 0),
        /* top */ -3px 0px 3px rgba(0, 0, 0, 0.2), /* left */ 3px 0px 3px rgba(0, 0, 0, 0.2); /* right */
}

.suggestions {
    padding-top: 1.5px;
    padding-bottom: 1.5px;
}

.color-picker {
    display: flex;
    width: 33px;
    height: 92%;
    flex-wrap: wrap;
    align-content: space-around;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */

    padding: 5%;
}

.time-picker {
    display: flex;
    padding: 5%;
    min-width: 100%;
}

.time-picker-container {
    display: flex;
    justify-content: space-around;
}

.to-text {
    padding: 3%;
}

.modal-title {
    font-size: 1.5em;
    font-weight: bold;
}

.x-button {
    color: rgb(190, 190, 190);
}
</style>
