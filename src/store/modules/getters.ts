import { GetterTree } from "vuex";
import { State } from "./state";

import { IWeatherCard, IWeatherCardResponce } from "@/interfaces/IWeatherCard";
import { ILocationVariant } from "@/interfaces/ILocation";

export type Getters = {
    getSuggestList(state: State): Array<ILocationVariant>;
    getSavedList(state: State): Array<ILocationVariant>;
    getCurrentWeatherList(state: State): Array<IWeatherCard>;
    dataIsUpdating(state: State): boolean
};

export const getters: GetterTree<State, State> & Getters = {
    getSuggestList(state): Array<ILocationVariant> {
        return state.suggestList;
    },
    getSavedList(state): Array<ILocationVariant> {
        return state.savedList;
    },
    getCurrentWeatherList(state): Array<IWeatherCard> {
        return state.weatherList;
    },
    dataIsUpdating(state): boolean {
        return state.requestCounter === 0? false : true;
    }
};
