import { TableDataType } from "../types/TableDataType";
import { VehicleType } from "../types/VehicleType";

const getTableData = (vehicleData: (VehicleType | undefined)): TableDataType[] => ([
    {
        id: 0,
        title: 'Vehicle name with the largest sum',
        content: vehicleData?.name || ''
    },
    {
        id: 1,
        title: 'Related home planets and their respective population',
        content: vehicleData?.homes.map((home, index) => (
            <div key={`${home.name}-${index}`}>
                {index + 1}. {home.name} - {home.population}
            </div>
        )) || ''
    },
    {
        id: 2,
        title: 'Related pilot names',
        content: vehicleData?.pilots.map((pilot, index) => (
            <div key={`${pilot.name}-${index}`}>
                {index + 1}. {pilot.name}
            </div>
        )) || ''
    }
])

export default getTableData