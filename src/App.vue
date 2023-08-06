<template>
    <app-layout :loading="dataIsUpdating">
        <template v-slot:content>
            <template v-if="showSettings">
                <settings-view></settings-view
            ></template>
            <template v-else>
                <weather-list v-if="!emptyData"></weather-list>
                <div v-else class="weather-animation">
                    <v-icon
                        color="black"
                        icon="mdi-weather-sunny"
                        size="80"
                        @click="showSettings = true"
                    ></v-icon>
                </div>
            </template>
        </template>
        <template v-slot:settings>
            <v-icon
                color="black"
                :icon="iconButton"
                size="30"
                @click="showSettings = !showSettings"
            ></v-icon>
        </template>
    </app-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "./layouts/AppLayout.vue";
import WeatherList from "./components/WeatherList.vue";
import SettingsView from "./components/SettingsView.vue";

/*-----------------*/
import { getCurrentLocation } from "./helpers/CurrentLocationTaker";
import { getWeatherByLatLon } from "./api/ApiSender";
import { IWeatherCardResponce } from "./interfaces/IWeatherCard";
import { MutationTypes } from "./store/mutation-types";

/*--------------*/

export default defineComponent({
    name: "App",
    components: {
        AppLayout,
        WeatherList,
        SettingsView,
    },
    data: () => {
        return {
            showSettings: false,
        };
    },
    computed: {
        dataIsUpdating(): boolean {
            return this.$store.getters.dataIsUpdating;
        },
        iconButton(): string {
            return this.showSettings ? "mdi-window-close" : "mdi-cog";
        },
        emptyData(): boolean {
            return this.$store.getters.getSavedList.length === 0;
        },
    },
    mounted() {
        if (this.emptyData) {
            getCurrentLocation().then(async (loc) => {
                const data: IWeatherCardResponce = await getWeatherByLatLon(
                    loc
                );

                const name = data.city ? data.city : "Your location";
                console.log(data.city, name);
                this.$store.commit(MutationTypes.addSaveListItem, {
                    name,
                    location: loc,
                    country: data.country ? data.country : "",
                    state: name,
                });
                console.log(this.$store.getters.getSavedList);
            });
        }
    },
});
</script>

<style lang="scss">
@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.weather-animation {
    animation: rotating 8s linear infinite;
}
</style>
