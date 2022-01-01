const colors = [
    { border: '#641E16', color: '#CD6155' }, { border: '#512E5F', color: '#BB8FCE' },
    { border: '#154360', color: '#7FB3D5' }, { border: '#0E6251', color: '#73C6B6' },
    { border: '#7D6608', color: '#F7DC6F'}
]
interface ChartType {
    title: string;
    value: number;
    height: number;
    index: number;
}

const Chart = ({ title, value, height, index }: ChartType) => {
    return (
        <div
            className='chart-item'
            style={{ height: `${height}%`, border: `1.5px solid ${colors[index].border}`, background: colors[index].color}}
        >
            <div className='chart-item_value'>{value}</div>
            <div className='chart-item_title'>{title}</div>
        </div>
    )
}

export default Chart
