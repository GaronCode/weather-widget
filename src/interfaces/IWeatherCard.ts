import { ILocationVariant } from "./ILocation"
export interface IWeatherCardResponce {
    weatherList: Array<IWeatherCardWeatherListItem>,
    temperature: IWeatherCardTemperature,
    description: string,
    additional: Array<IWeatherCardAdditionalData>,
    city?: string,
    country?: string
}
export interface IWeatherCardTemperature {
    value: number,
    unit: string
}


export interface IWeatherCard extends IWeatherCardResponce {
    location: ILocationVariant
}

export interface IWeatherCardAdditionalData {
    name: string,
    value: string | number,
    materialIcon?: string,
    unit?: string,
    additionalText?: string
}

export interface IWeatherCardWeatherListItem {
    description: string,
    icon?: string
}