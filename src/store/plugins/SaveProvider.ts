import createPersistedState from "vuex-persistedstate";

export const SaveProvider = createPersistedState({
	paths: ["savedList"],
});
