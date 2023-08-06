import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { State } from "./state";
import { IWeatherCard } from "@/interfaces/IWeatherCard";
import { ILocationVariant } from "@/interfaces/ILocation";

interface IArrayPositionChange {
    oldPosition: number;
    newPosition: number;
}

export type Mutations<S = State> = {

    [MutationTypes.addSaveListItem](state: S, payload: ILocationVariant): void;
    [MutationTypes.removeSaveListItem](
        state: S,
        payload: ILocationVariant
    ): void;
    [MutationTypes.clearSaveList](state: S): void;
    [MutationTypes.changePositionSaveListItem](
        state: S,
        payload: IArrayPositionChange
    ): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.addSaveListItem]({ savedList }, payload: ILocationVariant) {
        savedList.push(payload);
    },
    [MutationTypes.removeSaveListItem](
        { savedList },
        payload: ILocationVariant
    ) {
        const index = savedList.indexOf(payload);
        if (index !== -1) savedList.splice(index, 1);
    },
    [MutationTypes.clearSaveList]({ savedList }) {
        savedList.splice(0, savedList.length);
    },
    [MutationTypes.changePositionSaveListItem](
        { savedList },
        { oldPosition, newPosition }
    ) {
        const el = savedList.splice(oldPosition, 1)[0];
        savedList.splice(newPosition, 0, el);
    },
};
