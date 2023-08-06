import { createApp } from "vue";
import App from "./App.vue";

import { vuetify } from "@/plugins/vuetify";
import { store } from "./store";
import VueSortable from "vue3-sortablejs";

createApp(App).use(store).use(VueSortable).use(vuetify).mount("#app");
