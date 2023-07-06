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
        <n-space>
            <div class="time-picker">
                {{ console.log(time) }}
                <n-time-picker
                    v-model:value="timeLocal"
                    :default-value="time"
                    format="h:mm a"
                    :use-12-hours="true"
                />
            </div>
        </n-space>
        <div class="color-picker">
            <n-color-picker
                :swatches="[
                    '#ff6680', //red
                    '#FAC898', //orange
                    '#ffe666', //yellow
                    '#66ff99', //green
                    '#66ccff', //blue
                    '#BCA6FF', // light purple
                    '#9966ff', // violet
                ]"
                @confirm="handleConfirm"
                :actions="['confirm']"
                :default-value="colorValue"
                v-model="colorValueLocal"
            />
        </div>
        <div class="button-container">
            <div class="button-submit">
                <n-button strong round type="success" @click="handleSubmit"
                    >Submit</n-button
                >
            </div>
            <div class="button-cancel">
                <n-button strong round type="error" @click="handleClose"
                    >Cancel</n-button
                >
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
        time: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            inputTextNameLocal: this.inputTextName,
            colorValueLocal: this.colorValue,
            timeLocal: this.time,
        };
    },
    emits: ["submit", "close"],
    methods: {
        handleSubmit() {
            this.$emit(
                "submit",
                this.inputTextNameLocal,
                this.timeLocal,
                this.colorValueLocal
            );
            this.inputText = "";
        },
        handleClose() {
            this.$emit("close");
            this.inputText = "";
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
/* .button-submit {
    padding-right: 10%;
}
.button-cancel {
    padding-left: 10%;
} */
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
    padding: 10%;
    min-width: 100%;
}
</style>
