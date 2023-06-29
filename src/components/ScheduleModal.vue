<template>
    <div class="modal">
        <input
            @keyup.enter="handleSubmit"
            type="text"
            v-model="inputTextName"
            placeholder="Event name"
        />
        <n-space>
            <n-time-picker
                v-model:value="time"
                format="h:mm a"
                :use-12-hours="true"
            />
            <!-- this gives a warn and i haven't figured out why -->
        </n-space>
        <n-button @click="handleSubmit">Submit</n-button>
        <n-button @click="handleClose">Close</n-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputTextName: "",
            inputTextTime: "",
            time: new Date().getTime(), // there is a vue warn with active value and idk what to do
        };
    },
    emits: ["submit", "close"],
    methods: {
        handleSubmit() {
            //this.$emit("submit", this.inputTextName, this.inputTextTime);
            const selectedTime = new Date(this.time);
            const formattedTime = selectedTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
            });
            console.log(formattedTime);
            this.$emit("submit", this.inputTextName, formattedTime);
            this.inputText = "";
        },
        handleClose() {
            this.$emit("close");
            this.inputText = "";
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
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}
</style>
