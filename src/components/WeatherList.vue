<template>
    <template v-for="(element, index) in weatherList">
        <weather-list-item :data="element"></weather-list-item>
    </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import WeatherListItem from "./WeatherListItem.vue";
import { ActionTypes } from "@/store/action-types";

export default defineComponent({
    name: "WeatherList",
    components: {
        WeatherListItem,
    },
    data() {
        return {};
    },
    computed: {
        weatherList() {
            return this.$store.getters.getCurrentWeatherList;
        },
    },
    mounted() {
        this.$store.dispatch(ActionTypes.updateData);
    },
});
</script>
