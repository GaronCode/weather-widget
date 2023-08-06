import { ILocation } from "@/interfaces/ILocation";

export function getCurrentLocation(): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                const { coords: { latitude, longitude } } = location;
                console.log(location);
                
                resolve({
                    lat: latitude,
                    lon: longitude,
                });
            },
            () => reject()
        );
    });
}
