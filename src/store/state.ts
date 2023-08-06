import { IWeatherCard } from "@/interfaces/IWeatherCard";
import { ILocationVariant } from "@/interfaces/ILocation";

export const state = {
    weatherList: [] as Array<IWeatherCard>,
    savedList: [
        // {
        //     // name: "Moskow",
        //     // location: { lat: 44.34, lon: 10.99 },
        //     // country: "Ru",
        //     // state: "Moskow",
        // },
    ] as Array<ILocationVariant>,
    suggestList: [] as Array<ILocationVariant>,
    requestCounter: 0,
};

export type State = typeof state;
