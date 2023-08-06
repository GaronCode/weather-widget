import {ILocationVariant} from '@/interfaces/ILocation'
export function сreateLocationVariant({name, country, state, lat, lon}: any): ILocationVariant {
    return {
        name,
        location: {lat, lon},
        country,
        state      
    }
}

export function createLocationArrayByResponce(res: any): Array<ILocationVariant> {


        
    return [...res] as Array<ILocationVariant>
    
}