import { ILocationVariant } from "@/interfaces/ILocation";

export const state = {
    savedList: [
        // {
        //     // name: "Moskow",
        //     // location: { lat: 44.34, lon: 10.99 },
        //     // country: "Ru",
        //     // state: "Moskow",
        // },
    ] as Array<ILocationVariant>,
};

export type State = typeof state;
