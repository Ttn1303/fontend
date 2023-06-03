import { RepairPayload } from '@/types/repair'
import { DiffOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Space, Select, Input } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = {
  fetchListRepairService: (payload: RepairPayload) => void
  onChangeStatus: (status: string) => void
  onChangeSearch: (search: string) => void
  loading: boolean
  page: number
  pageSize: number
  selectedStatus: string
  selectedSearch: string
}

const status = [
  { value: '', label: '---Trạng Thái---' },
  { value: 1, label: 'Tiếp nhận' },
  { value: 2, label: 'Đang xử lý' },
  { value: 3, label: 'Hoàn thành' }
]

const FilterRepair = (props: Props) => {
  const {
    fetchListRepairService,
    onChangeStatus,
    onChangeSearch,
    loading,
    page,
    pageSize,
    selectedStatus,
    selectedSearch
  } = props
  const router = useRouter()

  useEffect(() => {
    if (status?.length > 0) {
      const selected = status.find(
        status => status.value === router.query.status
      )
      onChangeStatus(selected?.value.toString() || '')
      fetchData(selected?.value.toString() || '', selectedSearch)
    }
  }, [status, router.query.status])

  const fetchData = (state: string, search: string) => {
    fetchListRepairService({
      state: state,
      name: search,
      page: page,
      page_size: pageSize
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '20px'
      }}
    >
      <Button
        size="large"
        type="primary"
        icon={<DiffOutlined />}
        onClick={() => router.push('/user/repair/create')}
      >
        Tạo Mới Phiếu Tiếp Nhận
      </Button>
      <Space wrap>
        <Select
          defaultValue={''}
          style={{ width: 150 }}
          onChange={value => onChangeStatus(value)}
          options={status}
        />
        <Input
          name="search"
          placeholder="Nhập biển số xe hoặc tên khách hàng"
          style={{ width: 400 }}
          onChange={e => onChangeSearch(e.target.value)}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ fontWeight: '500' }}
          loading={loading}
          onClick={() => fetchData(selectedStatus, selectedSearch)}
        >
          Lọc
        </Button>
      </Space>
    </div>
  )
}

export default FilterRepair
