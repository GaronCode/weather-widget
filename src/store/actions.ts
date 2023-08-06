import { ILocationVariant } from "@/interfaces/ILocation";
import { IWeatherCardResponce } from "@/interfaces/IWeatherCard";
import { getWeatherByLatLon } from "@/api/ApiSender";

import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { getLatLonVariantsByName } from "@/api/ApiSender";
import { createLocationArrayByResponce } from "@/helpers/responceDataTransform/GeocodeData";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
    [ActionTypes.updateData]({
        commit,
    }: AugmentedActionContext): Promise<boolean>;
    [ActionTypes.updateSuggestByName](
        { commit }: AugmentedActionContext,
        payload: string
    ): Promise<boolean>;
}

export const actions: ActionTree<State, State> & Actions = {
    
    [ActionTypes.updateData]({ commit, getters }) {
        return new Promise<boolean>((res, rej) => {
            commit(MutationTypes.clearWeatherList);
            commit(MutationTypes.addUpdatingRequest);
            const List: Array<ILocationVariant> = getters.getSavedList;
            try {
                List.forEach(async (element) => {
                    const data: IWeatherCardResponce = await getWeatherByLatLon(
                        element.location
                    );
                    commit(MutationTypes.addWeatherListItem, {
                        ...data,
                        location: element,
                    });
                });
                // задержка для тестирования лоад стейта
                setTimeout(() => {
                    commit(MutationTypes.removeUpdatingRequest);
                    res(true);
                }, 1000);
            } catch (error) {
                commit(MutationTypes.removeUpdatingRequest);
                rej(false);
            }
        });
    },
    [ActionTypes.updateSuggestByName]({ commit }, payload) {
        return new Promise<boolean>((res, rej) => {
            commit(MutationTypes.addUpdatingRequest);
            getLatLonVariantsByName(payload)
                .then((data) => {
                    commit(
                        MutationTypes.addSuggestList,
                        createLocationArrayByResponce(data)
                    );

                    // задержка для тестирования лоад стейта
                    setTimeout(() => {
                        commit(MutationTypes.removeUpdatingRequest);
                        res(true);
                    }, 1000);
                })
                .catch(() => {
                    commit(MutationTypes.removeUpdatingRequest);
                    rej(false);
                });
        });
    },
};
