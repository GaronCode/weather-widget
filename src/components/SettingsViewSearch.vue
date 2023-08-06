<template>
    <v-autocomplete
        v-model="selected"
        v-model:search="search"
        :items="suggestList"
        color="blue-grey-lighten-2"
        item-title="name"
        item-value="name"
        label="Add location"
        :custom-filter="() => true"
        transition="slide-x-transition"
        hide-no-data
    >
        <template v-slot:item="{ item }">
            <v-list-item
                :title="item.raw.name"
                :subtitle="item.raw.country"
                @click="addNewLocation(item.raw)"
            ></v-list-item>
        </template>
    </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { ILocationVariant } from "@/interfaces/ILocation";

export default defineComponent({
    name: "SettingsViewSearch",
    data: () => {
        return {
            selected: null,
            search: "",
            timerId: undefined as undefined | number,
            timerTime: 600,
        };
    },
    computed: {
        suggestList() {
            return this.$store.getters.getSuggestList;
        },
    },
    watch: {
        search(str) {
            clearTimeout(this.timerId);
            if (str) {
                this.timerId = setTimeout(
                    () =>
                        this.$store.dispatch(
                            ActionTypes.updateSuggestByName,
                            str
                        ),
                    this.timerTime
                );
            }
        },
    },
    methods: {
        addNewLocation(loc: ILocationVariant) {
            const {
                $store: { commit },
            } = this;
            commit(MutationTypes.addSaveListItem, loc);
            commit(MutationTypes.clearSuggest);
            this.selected = null;
            this.search = "";
        },
    },
});
</script>

<style lang="scss"></style>
