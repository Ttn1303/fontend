import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Prop = {
  sales: number[]
}

export function Chart(prop: Prop) {
  const { sales } = prop
  const maxPrince = useMemo(
    () => Math.max(...sales.map(price => price)),
    [sales]
  )
  const options = {
    aspectRatio: 1 / 1,
    responsive: true,
    scales: {
      x: {
        title: {
          align: 'end',
          color: 'red',
          display: true,
          text: 'Thời gian ( Tháng )'
        }
      },
      y: {
        max: maxPrince,
        ticks: {
          callback: (value: number) => (value != 0 ? `${value / 100000}` : 0)
        },
        title: {
          align: 'end',
          color: 'red',
          display: true,
          text: 'Đơn vị tính ( triệu VNĐ)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu theo tháng ',
        position: 'bottom'
      }
    }
  }

  const labels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ]
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu tháng',
        data: sales,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }
  return <Bar options={options} data={data} />
}
