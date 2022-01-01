import { useEffect, useMemo, useState } from "react";
import Loader from 'react-loader-spinner'
import getMostPopVehicle from "../../actions/getMostPopVehicle";
import getTableData from "../../modules/getTableData";
import { VehicleType } from "../../types/VehicleType";
import './highestSumTable.css';

const HighestSumTable = (): JSX.Element => {
    const [mostPopVehicle, setMostPopVehicle] = useState<VehicleType>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getVehicles = async () => {
            try {
                setIsLoading(true)
                const vehicleRes = await getMostPopVehicle()
                setMostPopVehicle(vehicleRes)
                setIsLoading(false)
            } catch (err) {
                console.warn(err);
            }
        }
        getVehicles()
    }, [])

    const tableData = useMemo(() => getTableData(mostPopVehicle), [mostPopVehicle])

    return (
        <table className="highest-sum-table">
            <tbody>
            {tableData.map(row => (
                <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>
                        {isLoading ?
                            <div className={'loader-container'}>
                                <Loader
                                    type="TailSpin"
                                    color="#444"
                                    height={20}
                                    width={20}
                                />
                            </div> :
                            <div>{row.content}</div>
                        }
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default HighestSumTable