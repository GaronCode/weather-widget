<template>
	<div class="d-flex flex-column">
		<v-icon
			class="weather-animation__rotation"
			color="black"
			icon="mdi-weather-sunny"
			size="80"
		></v-icon>
		<v-icon
			v-for="cloud in clouds"
			class="weather-animation__left-to-right"
			color="black"
			icon="mdi-weather-cloudy"
			:size="cloud.size"
			:style="{
				'animation-duration': `${cloud.duration}s`,
				'animation-delay': `${cloud.delay}s`,
			}"
		></v-icon>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "PlaceholderView",
	data: () => {
		return {
			clouds: [
                { size: 20, delay: 0.5, duration: 24 },
				{ size: 50, delay: 0, duration: 19 },
                { size: 80, delay: 0, duration: 13 },
				{ size: 100, delay: 0, duration: 7 },
			],
		};
	},
});
</script>

<style lang="scss">
$start-position: 300px;
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

@keyframes left-to-right {
	from {
		transform: translateX(-$start-position);
	}
	to {
		transform: translateX($start-position);
	}
}

.weather-animation__rotation {
	animation: rotating 8s linear infinite;
}
.weather-animation__left-to-right {
	transform: translateX($start-position);
	animation: left-to-right 8s linear infinite;
	margin-top: -10px;
}
</style>
