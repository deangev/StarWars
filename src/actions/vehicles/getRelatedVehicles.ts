import { VehicleDataType, VehicleType } from "../../types/VehicleType"
import getPilots from '../pilots/getPilots'
import getPilotsHome from '../planets/getPilotsPlanet'

const getRelatedVehicles = async (vehiclesRes: VehicleDataType[]): Promise<VehicleType[]> => {
    try {

        const vehiclesWithPilots = vehiclesRes.filter(vehicle => vehicle.pilots.length)

        const formattedVehicles = vehiclesWithPilots.map(async vehicle => {
            try {
                const vehicleData: VehicleType = {
                    name: vehicle.name,
                    population: 0,
                    pilots: [],
                    homes: [],
                }

                const pilots = await getPilots(vehicle.pilots)
                const homesRes = await getPilotsHome(pilots)

                vehicleData.pilots = pilots
                vehicleData.homes = homesRes.pilotsHome
                vehicleData.population = homesRes.populationCounter

                return vehicleData
            } catch (err) {
                throw err
            }
        })

        return formattedVehicles as unknown as Promise<VehicleType[]>
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getRelatedVehicles