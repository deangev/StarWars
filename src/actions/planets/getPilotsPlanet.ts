import Axios from 'axios'
import { PilotType } from '../../types/PilotType'
import { PlanetType } from '../../types/PlanetType'
import getPilotHome from './getPilotPlanet'

const getPilotsHome = async (pilots: PilotType[]): Promise<{ populationCounter: number, pilotsHome: PlanetType[] }> => {
    try {
        let populationCounter = 0

        const homePromises = pilots.map(pilot => getPilotHome(pilot.homeworld))
        const homesRes = await Axios.all(homePromises)

        const pilotsHome: PlanetType[] = homesRes.map(home => {
            const { name, population } = home
            populationCounter += population === 'unknown' ? 0 : Number(population)
            return { name, population: Number(population) }
        })

        return { populationCounter, pilotsHome }
    } catch (err) {
        console.warn(err);
        throw err
    }
}

export default getPilotsHome