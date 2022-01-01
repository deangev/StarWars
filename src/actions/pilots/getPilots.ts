import Axios from 'axios'
import { PilotType } from "../../types/PilotType"
import getPilot from './getPilot'

const getPilots = async (pilots: string[]): Promise<PilotType[]> => {
    try {
        const pilotPromises = pilots.map(pilot => getPilot(pilot))
        const pilotsRes = await Axios.all(pilotPromises)
        const vehiclePilots = pilotsRes.map(pilot => {
            const { name, homeworld } = pilot
            return { name, homeworld }
        })
        return vehiclePilots
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getPilots