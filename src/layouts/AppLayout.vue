<template lang="">
    <v-card
        :width="300"
        :min-height="300"
        :elevation="4"
        rounded
        density="comfortable"
        :loading="loading"
        class="weather-card"
    >
        <v-sheet
            class="d-flex flex-column align-center justify-center weather-container"
            min-height="300"
        >
            <div class="weather-container__settings">
                <slot name="settings"></slot>
            </div>

            <slot name="content"></slot> </v-sheet
    ></v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AppLayout",
    props: {
        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
});
</script>
<style lang="scss" scoped>
.weather-container {
    position: relative;

    &__settings {
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        z-index: 1;
    }
}
</style>
