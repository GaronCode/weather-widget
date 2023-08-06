import { IWeatherCardAdditionalData, IWeatherCardWeatherListItem } from "@/interfaces/IWeatherCard"
import { upperFirstLetter } from './../UpperFirstLetter';
import { convertMetersToKm } from './../UnitConverter';
import { convertIco } from "./IcoConverter";

interface IDescriptionCardData {
    feelsLike: number,
    weather: Array<any>
}


export function createTemperatrure(temperature: any): number {
    return Math.round(temperature.temp * 10) /10 
}

export function createWeatherList(weather: Array<any>): Array<IWeatherCardWeatherListItem> {
    return weather.map(({description, icon})=>{  
        return {description,icon: convertIco(icon) }
    }) 
}

export function сreateDescription({feelsLike, weather}: IDescriptionCardData): string {
    return `Feels like ${feelsLike} ` + weather.map(e =>  upperFirstLetter(e.description)).join(". ")
}

export function сreateWindSpeed(windResponce: any): IWeatherCardAdditionalData {
    return {
        name: "Wind",
        value: Number(windResponce.speed),
        unit: "m/s",
        additionalText: "SSE",
        materialIcon: 'mdi-weather-dust'
    }
}

export function сreatePressure(pressure: any): IWeatherCardAdditionalData {
    return {
        name: "Pressure",
        value: Number(pressure),
        unit: "hPa",
        materialIcon: 'mdi-gauge'
    }
}

export function сreateHumidity(humidity: any): IWeatherCardAdditionalData {
    return {
        name: "Humidity",
        value: Number(humidity),
        unit: "%"
    }
}

export function createDevPoint(temp: any, pressure: any): IWeatherCardAdditionalData {
    return {
        name: "Dev point",
        value: 0,
        unit: "°C"
    }
}

export function createVisibility(visibility: any): IWeatherCardAdditionalData {
    return {
        name: "Visibility",
        value: convertMetersToKm(Number(visibility)),
        unit: "km"
    }
}