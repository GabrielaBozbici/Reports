import { PieChart, Pie, Cell } from 'recharts';
import { Box } from '@chakra-ui/react'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartCustom = ({chartData}) => {
    return (
        <Box mw="400px">
            <PieChart width={300} height={300} >
              <Pie
                data={chartData}
                legendType={'line'}
                cx={150}
                cy={150}
                labelLine={true}
                label={true}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Box>
    )
}

export default PieChartCustom;