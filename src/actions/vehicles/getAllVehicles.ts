import Axios from 'axios'
import { VehicleDataType } from '../../types/VehicleType'
import api from '../api'

const getAllVehicles = async (): Promise<VehicleDataType[]> => {
    try {
        const firstPageRes = await Axios.get(`${api}/vehicles/?page=1`)
        const { count, results } = firstPageRes.data
        const totalPages = Math.ceil(count / 10)
        const allVehicles = [...results]

        if (totalPages > 1) {
            const getVehiclesPromises = []
            for (let i = 2; i <= totalPages; i++) {
                const newPromise = Axios.get(`${api}/vehicles/?page=${i}`)
                getVehiclesPromises.push(newPromise)
            }
            const promisesRes = await Axios.all(getVehiclesPromises)
            promisesRes.forEach(result => {
                const currentResults = result.data.results
                allVehicles.push(...currentResults)
            })
        }
        
        return allVehicles
    } catch (err) {
        console.warn(err)
        throw err
    }
}

export default getAllVehicles