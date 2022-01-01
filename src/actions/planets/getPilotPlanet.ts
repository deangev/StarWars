import Axios from "axios"
import { PlanetDataType } from "../../types/PlanetType"

const getPilotHome = async (url: string): Promise<PlanetDataType> => {
    try {
        const pilotHomeRes = await Axios.get(url)
        return pilotHomeRes.data
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getPilotHome