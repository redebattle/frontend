import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  AreaChart,
} from 'recharts'
import CustomTooltip from './CustomToolTips'

export default function Chart({
  type = 'line',
  children,
  height = 308,
  data,
  dataKey = 'name',
}) {
  const renderType = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {children}
          </LineChart>
        )
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {children}
          </BarChart>
        )
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke='rgba(206,206,206,0.3)' />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {children}
          </AreaChart>
        )
      default:
        return null
    }
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderType()}
    </ResponsiveContainer>
  )
}
