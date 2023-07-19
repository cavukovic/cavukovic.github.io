<template>
    <div class="modal">
        <div class="x-button">
            <IconX @click="handleClose" />
        </div>
        <h2>Event Details</h2>
        <div class="name-input-container">
            <!-- round -->
            <n-input
                @keyup.enter="handleSubmit"
                type="text"
                v-model:value="inputTextNameLocal"
                placeholder="Event name"
                class="input"
            />
        </div>
        <div class="desc-input-container">
            <n-input
                @keyup.enter="handleSubmit"
                v-model:value="inputTextDescLocal"
                placeholder="Description"
                type="textarea"
                class="input"
            />
        </div>
        <n-space class="n-space">
            <div class="time-picker-container">
                <div class="time-picker">
                    <n-time-picker
                        class="override"
                        v-model:value="startTimeLocal"
                        :default-value="startTime"
                        format="h:mm a"
                        :minutes="15"
                        :use-12-hours="true"
                    />
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
        </n-space>

        <div class="button-container">
            <div v-if="editing">
                <n-button strong round type="error" @click="handleDelete">Delete</n-button>
            </div>
            <div>
                <n-button strong round type="success" @click="handleSubmit">Submit</n-button>
            </div>
        </div>
    </div>
</template>

<script>
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { IconX } from "@tabler/icons-vue";
export default {
    components: { useMessage, IconX },
    data() {
        return {
            inputTextNameLocal: this.inputTextName,
            inputTextDescLocal: this.inputTextDesc,
            colorValueLocal: this.colorValue,
            startTimeLocal: this.startTime,
            endTimeLocal: this.endTime,
        };
    },
    emits: ["submit", "close", "delete"],
    methods: {
        handleSubmit() {
            if (this.endTimeLocal <= this.startTimeLocal) {
                console.log("here");
                this.message.error("End time must be later than start time");
            } else {
                this.$emit(
                    "submit",
                    this.inputTextNameLocal,
                    this.inputTextDescLocal,
                    this.startTimeLocal,
                    this.endTimeLocal,
                    this.colorValueLocal
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
/* add min width */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 1.5%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    width: 25%;
    z-index: 999;
}
.button-container {
    display: flex;
    justify-content: space-around;
    padding: 3%;
    width: 100%;
}
.name-input-container {
    display: flex;
    padding-left: 3px;
    padding: 5%;
    width: 100%;
}

.desc-input-container {
    display: flex;
    padding-left: 3px;
    padding: 2%;

    width: 100%;
    line-height: 20px;
}

.input {
    display: flex;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.color-picker {
    display: flex;
    width: 33px;
    height: 87%;
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

.x-button {
    position: fixed;
    top: 3%;
    left: 91.5%;
    color: rgb(190, 190, 190);
}
</style>
