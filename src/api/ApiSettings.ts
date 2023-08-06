export interface IApiKey {
    key: string;
}

export interface IApiSettings {
    url: string;
    apiKey: IApiKey;
    limit?: number;
}

const ApiKey: IApiKey = {
    key: "1a2e9ee28db3dd66fa66e6eb5a5e3f95",
}

export const ApiSettingsWeather: IApiSettings = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    apiKey: ApiKey,
};

export const ApiSettingsGeocode: IApiSettings = {
    url: "http://api.openweathermap.org/geo/1.0/direct",
    limit: 10,
    apiKey: ApiKey
};
