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
import { getCurrentLocation } from "@/helpers/CurrentLocationTaker";

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
    [ActionTypes.updateCurrentLocation](
        { commit }: AugmentedActionContext
    ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
    
    [ActionTypes.updateData]({ commit, getters }) {
        return new Promise<boolean>(async (res, rej) => {
            commit(MutationTypes.clearWeatherList);
            commit(MutationTypes.addUpdatingRequest);
            const List: Array<ILocationVariant> = getters.getSavedList;
            try {
                console.log("started list: ",List.map(e=>e.name));
                for (let index = 0; index < List.length; index++) {
                    const element = List[index];
                    {
                        const data: IWeatherCardResponce = await getWeatherByLatLon(
                            element.location
                        );
                        console.log('complete for:', element.name);
                        
                        commit(MutationTypes.addWeatherListItem, {
                            ...data,
                            location: element,
                        });
                    }
                }
                console.log("updated list:",getters.getCurrentWeatherList.map(e=> e.location.name));
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
    [ActionTypes.updateCurrentLocation](
        { commit }
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            getCurrentLocation().then(async (loc) => {
				const data: IWeatherCardResponce = await getWeatherByLatLon(
					loc
				);

				const name = data.city ? data.city : "Your location";
				commit(MutationTypes.addSaveListItem, {
					name,
					location: loc,
					country: data.country ? data.country : "",
					state: name,
				});
                resolve()
			}).catch(()=> reject());
        })
    }
};
