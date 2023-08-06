import {
    createStore,
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
} from "vuex";
import { State, state } from "./state";
import { Getters, getters } from "./getters";
import { Mutations, mutations } from "./mutations";

export const savedLocations = {
    state,
    getters,
    mutations,
};

export type SavedLocationsStore = Omit<
    VuexStore<State>,
    "getters" | "commit" | "dispatch"
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
};
