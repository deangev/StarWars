import Axios from "axios";
import { PlanetDataType, PlanetType } from "../../types/PlanetType";
import api from "../api";

const planets = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor']
let planetsLeft = [...planets]
const planetsData: PlanetType[] = []
let planetsPage = 1

const getPlanetsByName = (): Promise<PlanetType[]> => new Promise((resolve, reject) => {
    Axios.get(`${api}/planets/?page=${planetsPage}`).then(planetsRes => {
        planets.forEach(planet => {
            const planetData = planetsRes.data.results.find((result: PlanetDataType) => result.name === planet)
            if (planetData) {
                planetsData.push({ name: planetData.name, population: Number(planetData.population) })
                planetsLeft = planetsLeft.filter(p => p !== planet)
            }
        });
        return planetsRes.data.next
    }).then(async (next) => {
        if (planetsLeft.length && next) {
            planetsPage++
            await getPlanetsByName()
        }
        resolve(planetsData)
    }).catch((err) => {
        console.warn(err);
        reject(err)
    })
})

export default getPlanetsByName