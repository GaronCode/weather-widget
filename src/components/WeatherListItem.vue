<template lang="">
    <card-weather :header="data.location.name" :loading="true">
        <template v-slot:temperature>{{ data.temperature }}</template>
        <template v-slot:wether-icon>
            <v-icon
                color="black"
                size="88"
            >{{ mainIco }}</v-icon>
        </template>
        <template v-slot:description> {{ data.description }}</template>
        <template v-slot:additional>
            <template v-for="item in data.additional" :key="item.name">
                <weather-list-item-additional
                    :data="item"
                ></weather-list-item-additional>
            </template>
        </template>
    </card-weather>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { IWeatherCard } from "@/interfaces/IWeatherCard";
import CardWeather from "@/layouts/CardWeather.vue";
import WeatherListItemAdditional from "./WeatherListItemAdditional.vue";

export default defineComponent({
    name: "WeatherListItem",
    props: {
        data: {
            type: Object as PropType<IWeatherCard>,
            required: true,
        },
    },
    components: {
        CardWeather,
        WeatherListItemAdditional,
    },
    computed: {
        mainIco() {
            return this.data.weatherList[0].icon
        },
    },
});
</script>
<style lang=""></style>
