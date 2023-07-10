<template>
    <div class="modal">
        <h2>Event Details</h2>
        <div class="input-container">
            <input
                @keyup.enter="handleSubmit"
                type="text"
                v-model="inputTextNameLocal"
                placeholder="Event name"
                class="input"
            />
        </div>
        <n-space class="n-space">
            <div class="time-picker-container">
                <div class="time-picker">
                    <n-time-picker
                        v-model:value="startTimeLocal"
                        :default-value="startTime"
                        format="h:mm a"
                        :use-12-hours="true"
                    />
                    <div class="to-text">to</div>
                    <n-time-picker
                        v-model:value="endTimeLocal"
                        :default-value="endTime"
                        format="h:mm a"
                        :use-12-hours="true"
                    />
                </div>
            </div>
        </n-space>
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
        <div class="button-container">
            <div>
                <n-button strong round type="success" @click="handleSubmit">Submit</n-button>
            </div>
            <div v-if="editing">
                <n-button strong round type="error" @click="handleDelete">Delete</n-button>
            </div>
            <div>
                <n-button strong round type="warning" @click="handleClose">Cancel</n-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        inputTextName: {
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
    data() {
        return {
            inputTextNameLocal: this.inputTextName,
            colorValueLocal: this.colorValue,
            startTimeLocal: this.startTime,
            endTimeLocal: this.endTime,
        };
    },
    emits: ["submit", "close", "delete"],
    methods: {
        handleSubmit() {
            this.$emit(
                "submit",
                this.inputTextNameLocal,
                this.startTimeLocal,
                this.endTimeLocal,
                this.colorValueLocal
            );
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
};
</script>

<style scoped>
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
    padding: 2%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    width: 20%;
    z-index: 999;
}
.button-container {
    display: flex;
    justify-content: space-around;
    padding: 5%;
    width: 100%;
}

.button-container2 {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.input-container {
    display: flex;
    padding-left: 3px;
    padding: 5%;
    width: 100%;
}

.input {
    display: flex;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.color-picker {
    width: 100%;
    display: flex;
    padding: 8%;
}

.time-picker {
    display: flex;
    padding: 10%;
    min-width: 100%;
}

.time-picker-container {
    display: flex;
    justify-content: space-around;
}
.to-text {
    padding: 3%;
}
</style>
