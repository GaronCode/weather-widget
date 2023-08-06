import { IWeatherCardResponce } from "@/interfaces/IWeatherCard";
import { ApiSettingsWeather, ApiSettingsGeocode } from "./ApiSettings";
import { ILocation, ILocationVariant } from "@/interfaces/ILocation";
import { requestSender } from "@/helpers/RequestSender";
import {
    createWeatherList,
    сreateDescription,
    сreateWindSpeed,
    сreatePressure,
    сreateHumidity,
    createDevPoint,
    createVisibility,
createTemperatrure,
} from "@/helpers/responceDataTransform/CardData";
import { сreateLocationVariant } from "@/helpers/responceDataTransform/GeocodeData";

export const getWeatherByLatLon = async ({
    lat,
    lon,
}: ILocation): Promise<IWeatherCardResponce> => {
    const data = await requestSender(ApiSettingsWeather.url, {
        lat,
        lon,
        units: "metric",
        appid: ApiSettingsWeather.apiKey.key,
    });
    const { main, weather, wind } = data;
    
    return {
        weatherList: createWeatherList(weather),
        temperature: createTemperatrure(main),
        description: сreateDescription({ weather, feelsLike: main.feels_like }),
        additional: [
            сreateWindSpeed(wind),
            сreatePressure(main.pressure),
            сreateHumidity(main.humidity),
            createDevPoint(main.temp, main.pressure),
            createVisibility(data.visibility),
        ],
        city: data.name?data.name:'',
        country: data.sys.country?data.sys.country:''
    };
};

export const getLatLonVariantsByName = async (
    name: string
): Promise<Array<ILocationVariant>> => {
    const data = await requestSender(ApiSettingsGeocode.url, {
        appid: ApiSettingsGeocode.apiKey.key,
        q: name,
        limit: ApiSettingsGeocode.limit,
    });

    return Array.isArray(data) ? data.map((e) => сreateLocationVariant(e)) : [];
};
