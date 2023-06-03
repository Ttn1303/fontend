import { ColumnsType } from 'antd/es/table'
import { TableInventoryData } from '@/types/config'
import { Repair } from '@/types/repair'
import dayjs from 'dayjs'
import { statesSelect } from './state'
import { Tag } from 'antd'

export const repairColumn: ColumnsType<Repair> = [
  {
    title: 'Mã Phiếu',
    render: (_, data) => <>{data.code}</>,
    width: '15%'
  },
  {
    title: 'Biển Số Xe',
    render: (_, data) => <>{data.vehicle_infor?.licensePlates}</>,
    width: '20%'
  },
  {
    title: 'Tên Khách Hàng',
    render: (_, data) => <>{data.customer?.name}</>
  },
  // {
  //   title: 'Ngày lập phiếu',
  //   render: (_, data) => {
  //     const date = dayjs(data.created_at).format('DD/MM/YYYY')
  //     return <>{date}</>
  //   },
  //   width: '15%'
  // },
  // {
  //   title: 'Ngày hẹn',
  //   render: (_, data) => {
  //     const date = dayjs(data.appointmentDate).format('DD/MM/YYYY')
  //     return <>{date}</>
  //   },
  //   width: '15%'
  // },
  {
    title: 'Trạng thái',
    render: (_, data) => {
      const state = statesSelect.find(item => item.value === Number(data.state))
      return (
        <Tag
          style={{ padding: '5px 10px', fontSize: '14px' }}
          color={state?.color}
        >
          {state?.label}
        </Tag>
      )
    },
    width: '20%'
  }
]

export const columnInventory: ColumnsType<TableInventoryData> = [
  {
    title: 'TT',
    render: (_, data) => <>{data.key}</>
  },
  {
    title: 'Nhóm Hàng',
    render: (_, data) => <>{data.group}</>
  },
  {
    title: 'Mã Hàng',
    render: (_, data) => <>{data.code}</>
  },
  {
    title: 'Tên Mặt Hàng',
    render: (_, data) => <>{data.name}</>
  },
  {
    title: 'ĐVT',
    render: (_, data) => <>{data.unit}</>
  },
  {
    title: 'Nhập Hàng',
    align: 'center',
    render: (_, data) => <>{data.import}</>
  },
  {
    title: 'Xuất Hàng',
    align: 'center',
    render: (_, data) => <>{data.export}</>
  },
  {
    title: 'Tồn kho',
    align: 'center',
    render: (_, data) => (
      // {
      //   const finish = data.import - data.export
      //   return finish
      // }
      <>{data.total}</>
    )
  }
]
