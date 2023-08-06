import { GetterTree } from "vuex";
import { State } from "./state";

import { IWeatherCard, IWeatherCardResponce } from "@/interfaces/IWeatherCard";
import { ILocationVariant } from "@/interfaces/ILocation";

export type Getters = {
    getSavedList(state: State): Array<ILocationVariant>;
};

export const getters: GetterTree<State, State> & Getters = {
    getSavedList(state): Array<ILocationVariant> {
        return state.savedList;
    },
};
