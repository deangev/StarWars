import { PlanetType } from "./PlanetType";
import { PilotType } from "./PilotType";

interface VehicleDataType {
    name: string
    model: string
    manufacturer: string
    cost_in_credits: string
    length: string
    max_atmosphering_speed: string
    crew: string
    passengers: string
    cargo_capacity: string
    consumables: string
    vehicle_class: string
    pilots: string[]
    films: string[]
    created: string
    edited: string
    url: string
}

interface VehicleType {
    name: string
    population: number
    pilots: PilotType[]
    homes: PlanetType[]
}

export type {
    VehicleType,
    VehicleDataType
} 