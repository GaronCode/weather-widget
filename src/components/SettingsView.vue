<template>
    <settings-layout :header="'Settings'">
        <template v-slot:savedList>
            <settings-view-list></settings-view-list>
        </template>

        <template v-slot:input>
            <settings-view-search></settings-view-search>
        </template>
    </settings-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import SettingsViewList from "./SettingsViewList.vue";
import SettingsViewSearch from "./SettingsViewSearch.vue";

export default defineComponent({
    name: "SettingsView",
    components: {
        SettingsLayout,
        SettingsViewList,
        SettingsViewSearch,
    },
});
</script>

<style lang="scss"></style>
