<template>
    {{ console.log("hey look ma we made it") }}
    <div>
        <iframe :src="link" frameborder="0" width="100%" height="200"></iframe>
    </div>
</template>

<script>
export default {
    computed: {
        link() {
            return this.$route.query.link;
        },
    },
};
</script>
