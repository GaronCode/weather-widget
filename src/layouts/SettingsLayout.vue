<template lang="">
    <v-card class="mx-auto border-0 d-flex flex-column" width="260" min-height="300" variant="outlined">
        <v-card-item :title="header"> </v-card-item>
        <div>
            <slot name="savedList"></slot>
        </div>
        <v-divider ></v-divider>
        <div style="flex-grow: 1"></div>
        <div>
            <slot name="input"></slot>
        </div>
    </v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SettingsLayout",
    props: {
        header: String,
    },
});
</script>
<style lang="scss">

</style>
