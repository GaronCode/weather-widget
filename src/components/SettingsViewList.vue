<template>

            <v-list
                v-sortable="{
                    disabled: false,
                    options: {
                        animation: 250,
                        easing: 'cubic-bezier(1, 0, 0, 1)',
                        handle: '.draggable-item',
                    },
                }"
                @sort="updateLocationList"
                :key="storedList.length"
            >
                <template
                    v-for="item in storedList"
                    :key="`${item.location.lat} ${item.location.lon}`"
                >
                    <v-list-item :title="item.name">
                        <template v-slot:prepend>
                            <v-icon
                                icon="mdi-menu"
                                class="draggable-item"
                            ></v-icon>
                        </template>
                        <template v-slot:append>
                            <v-icon
                                icon="mdi-trash-can-outline"
                                @click="removeLocation(item)"
                            ></v-icon>
                        </template>
                    </v-list-item>
                </template>
            </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MutationTypes } from "@/store/mutation-types";
import { ILocationVariant } from "@/interfaces/ILocation";

export default defineComponent({
    name: "SettingsViewList",
    data: () => {
        return {};
    },
    computed: {
        storedList() {
            return this.$store.getters.getSavedList;
        },
    },
    methods: {
        removeLocation(loc: ILocationVariant) {
            this.$store.commit(MutationTypes.removeSaveListItem, loc);
        },
        updateLocationList({ oldIndex, newIndex }) {
            this.$store.commit(MutationTypes.changePositionSaveListItem, {
                oldPosition: oldIndex,
                newPosition: newIndex,
            });
            console.log(
                "location order updated",
                this.storedList.map((e) => e.name)
            );
        },
    },
});
</script>

<style lang="scss"></style>
