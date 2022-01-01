import Axios from "axios"
import { PilotDataType } from "../../types/PilotType"

const getPilot = async (url: string): Promise<PilotDataType> => {
    try {
        const pilotRes = await Axios.get(url)
        return pilotRes.data
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getPilot

