import { useEffect, useMemo, useState } from 'react'
import Loader from 'react-loader-spinner'
import getPlanetsByName from '../../actions/planets/getPlanetsByName'
import { PlanetType } from '../../types/PlanetType'
import Chart from '../chart/Chart'
import './planetsChart.css'

const PlanetsChart = (): JSX.Element => {
    const [planets, setPlanets] = useState<PlanetType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const maxPopulation = useMemo(() => {
        if (!planets.length) return 0
        return Math.max(...planets.map(planet => planet.population))
    }, [planets])

    useEffect(() => {
        const getPlanetsPopulation = async () => {
            try {
                setIsLoading(true)
                const planetsRes = await getPlanetsByName()
                setPlanets(planetsRes)
                setIsLoading(false)
            } catch (err) {
                console.warn(err);
            }
        }

        getPlanetsPopulation()
    }, [])

    return (
        <div className={'planets-chart'}>
            {isLoading ?
                <div className={'loader-container'}>
                    <Loader
                        type="TailSpin"
                        color="#444"
                        height={100}
                        width={100}
                    />
                </div>
                :
                planets.map((planet, i) => {
                    const colHeight = (planet.population / maxPopulation) * 100
                    return <Chart key={planet.name + i} title={planet.name} value={planet.population} height={colHeight} index={i} />
                })
            }
        </div>
    )
}

export default PlanetsChart
