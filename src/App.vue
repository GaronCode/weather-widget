<template>
	<app-layout :loading="dataIsUpdating">
		<template v-slot:content>
			<template v-if="showSettings">
				<settings-view></settings-view
			></template>
			<template v-else>
				<weather-list v-if="!emptyData"></weather-list>
				<template v-else>
					<placeholder-view></placeholder-view>
				</template>
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
import PlaceholderView from "./components/PlaceholderView.vue";

import { ActionTypes } from "./store/action-types";

import { ApiKey } from "./api/ApiSettings";

export default defineComponent({
	name: "App",
	components: {
		AppLayout,
		WeatherList,
		SettingsView,
		PlaceholderView,
	},

	props: {
		apiKey: {
			type: String,
			required: true,
		},
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
	created() {
		ApiKey.key = this.apiKey;
	},
	mounted() {
		if (this.emptyData) {
			this.$store.dispatch(ActionTypes.updateCurrentLocation);
		}
	},
});
</script>

<style lang="scss"></style>
