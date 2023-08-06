import { createApp } from "vue";
import App from "./App.vue";

import { vuetify } from "@/plugins/vuetify";
import { store } from "./store";
import VueSortable from "vue3-sortablejs";


window.addEventListener("load", () => {
    const AttributeName = "api-key";
    const MountPointSelector = "weather-widget"

	const MountPoint = document.querySelector(MountPointSelector);

	const ApiKey = MountPoint?.getAttribute(AttributeName);
    
	if (ApiKey && MountPoint)
		createApp(App, {
			"api-key": ApiKey,
		})
			.use(store)
			.use(VueSortable)
			.use(vuetify)
			.mount(MountPoint);
    else {
        console.log(`Cannot find attribute ${AttributeName} at element with selector {${MountPointSelector}}:`, MountPoint);
        
    }
});
