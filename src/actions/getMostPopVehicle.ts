import Axios from 'axios'
import { VehicleType } from '../types/VehicleType'
import getAllVehicles from './vehicles/getAllVehicles'
import getRelatedVehicles from './vehicles/getRelatedVehicles'

const getMostPopVehicle = async (): Promise<VehicleType> => {
    try {
        const vehiclesRes = await getAllVehicles()
        const relatedVehicles = await Axios.all(await getRelatedVehicles(vehiclesRes))
        
        const mostPopVehicle = relatedVehicles.reduce((max, vehicle) => max.population > vehicle.population ? max : vehicle, relatedVehicles[0])
        
        return mostPopVehicle
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getMostPopVehicle