import { ReactElement, useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Select,
  SelectProps,
  Space,
  notification
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { paginationConfig } from '@/config/pagination'

import User from '@/components/layouts/user'
import { notificationError } from '@/helpers/notification'
import Inventory from '@/components/list/listInventory'
import { TableInventoryData } from '@/types/config'
import { accessaryService } from '@/services/accessary'
import { AccessaryGroup } from '@/types/accessary'
import dayjs, { Dayjs } from 'dayjs'
import { InventoryPayload } from '@/types/inventory'

const Page: NextPageWithLayout = () => {
  const { RangePicker } = DatePicker
  const [groupOptions, setGroupOptions] = useState<SelectProps['options']>([])

  // Filter
  const [date, setDate] = useState<string[]>([])
  const [group, setGroup] = useState<string>('')

  // Pagination
  const [total, setTotal] = useState<number>(paginationConfig.total)
  const [page, setPage] = useState<number>(paginationConfig.page)
  const [pageSize, setPageSize] = useState<number>(paginationConfig.page_size)

  const [loading, setLoading] = useState<boolean>(false)

  const getCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const fetchListGroupAccessaryService = async () => {
    const group = await accessaryService.getListGroup()
    formatGroup(group)
  }

  const fetchListInventory = async () => {
    try {
      setLoading(true)
      const payload: InventoryPayload = {
        date: date,
        group: group,
        page: page,
        page_size: pageSize
      }
      // const response = await ticketService.getList(payload)
      // if (response) {
      //   setTickets(response.tickets)
      //   setTotal(response.total)
      //   setPage(response.page)
      // }
    } catch {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  const formatGroup = (groups: AccessaryGroup[]) => {
    const options = [{ value: '', label: '-- Nhóm hàng --' }]
    groups.forEach(val => {
      options.push({
        value: val.id.toString(),
        label: val.name
      })
    })
    setGroupOptions(options)
  }

  useEffect(() => {
    fetchListGroupAccessaryService()
    // fetchListInventory()
  }, [page, pageSize])

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
      setDate([dateStrings[0], dateStrings[1]])
    } else {
      console.log('Clear')
    }
  }

  const rangePresets: {
    label: string
    value: [Dayjs, Dayjs]
  }[] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] }
  ]

  const inventory: TableInventoryData[] = [
    {
      key: 1,
      group: 'Đèn',
      code: 'LEDPANEL12W',
      name: 'Bộ LED panel 12W Âm, tròn',
      unit: 'Bộ',
      import: 5,
      export: 1,
      total:113
    },
    {
      key: 2,
      group: 'Đèn',
      code: 'LEDPANEL24W',
      name: 'Bộ LED panel 24W Âm, tròn',
      unit: 'Bộ',
      import: 10,
      export: 5,
      total:98
    },
    {
      key: 3,
      group: 'Phanh',
      code: 'PHANH',
      name: 'Phanh xe máy',
      unit: 'Cái',
      import: 5,
      export: 1,
      total:40
    },
    {
      key: 4,
      group: 'Dầu nhớt',
      code: 'OIL',
      name: 'Dầu máy',
      unit: 'Bình',
      import: 8,
      export: 4,
      total:50
    },
    {
      key: 5,
      group: 'Cơ khí',
      code: 'YEN',
      name: 'Yên xe máy',
      unit: 'Cái',
      import: 5,
      export: 1,
      total:50
    },
    {
      key: 6,
      group: 'Săm',
      code: 'SAM',
      name: 'Săm xe máy',
      unit: 'Cái',
      import: 5,
      export: 1,
      total:50
    }
  ]

  return (
    <div
      style={{
        margin: '10px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px',
        height: '100%'
      }}
    >
      {/* Filter */}
      <Space
        wrap
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '20px'
        }}
      >
        <RangePicker presets={rangePresets} onChange={onRangeChange} />
        <Select
          value={group}
          style={{ width: 150 }}
          options={groupOptions}
          onChange={setGroup}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ fontSize: 15 }}
          loading={loading}
          onClick={()=>{
            // fetchListInventory()
          }}
        >
          Lọc
        </Button>
      </Space>
      {/* Tickets */}
      <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <Inventory
          inventory={inventory}
          total={total}
          page={page}
          pageSize={pageSize}
          loading={loading}
          onTableChange={getCurrentPage}
        />
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
