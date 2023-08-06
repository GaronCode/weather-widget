<template lang="">
    <v-card class="card-weather" max-width="368" variant="outlined">
        <v-card-item :title="header">
            <template v-slot:subtitle> </template>
        </v-card-item>

        <v-card-text>
            <v-row align="center" no-gutters>
                <v-col class="card-weather__weather-icon" cols="6">
                    <slot name="wether-icon"></slot>
                </v-col>
                <v-col cols="6" class="card-weather__temperature">
                    <slot name="temperature"></slot>
                </v-col>
            </v-row>
        </v-card-text>

        <v-list-item>
            <v-list-item-subtitle
                ><slot name="description"></slot
            ></v-list-item-subtitle>
        </v-list-item>

        <div class="card-weather__additional">
            <slot name="additional"></slot>
        </div>
        <v-divider></v-divider>
    </v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CardWeather",
    props: {
        header: String,
        loading: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
<style lang="scss">
.card-weather {
    margin-left: auto;
    margin-right: auto;
    border-width: 0 !important;

    &__weather-icon {
        text-align: center;
    }
    &__temperature {
        text-align: center;
        font-size: 3rem;
        white-space: nowrap;
    }
    &__additional {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        padding: 12px 0;
    }
}
</style>
