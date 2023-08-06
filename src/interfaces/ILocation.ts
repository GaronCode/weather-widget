export interface ILocation {
    lat: number, lon: number
}

export interface ILocationVariant {
    name: string,
    location: ILocation,
    country: string,
    state: string
}