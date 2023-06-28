<template>
    <div class="modal">
        <input type="text" v-model="inputText" placeholder="Enter text" />
        <!-- <input type="text" v-model="inputText" placeholder="Enter text" />  another one for time, and add ability to just click enter-->
        <button @click="handleSubmit">Submit</button>
        <button @click="handleClose">Close</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputText: "",
        };
    },
    emits: ["submit", "close"],
    methods: {
        handleSubmit() {
            this.$emit("submit", this.inputText);
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
    z-index: 9999;
}
</style>
