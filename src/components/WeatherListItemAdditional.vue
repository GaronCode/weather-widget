<template lang="">
    <v-list-item class="weather-list-item-additional" :prepend-icon="data.materialIcon" dense>
        <v-list-item-subtitle
            >{{ data.materialIcon ? "" : data.name + ": " }}{{ data.value
            }}{{ data.unit }} {{ data.additionalText }}</v-list-item-subtitle
        >
    </v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { IWeatherCardAdditionalData } from "@/interfaces/IWeatherCard";

export default defineComponent({
    name: "WeatherListItemAdditional",
    props: {
        data: {
            type: Object as PropType<IWeatherCardAdditionalData>,
            required: true,
        },
    },
});
</script>
<style >
.weather-list-item-additional .v-list-item__prepend .v-icon{
    margin-right: 10px;
}
</style>
