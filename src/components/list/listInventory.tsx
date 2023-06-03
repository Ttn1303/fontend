import { Table } from 'antd'
import { TableInventoryData } from '@/types/config'
import { columnInventory } from '@/config/config-column'
import { paginationConfig } from '@/config/pagination'

type Props = {
  inventory: TableInventoryData[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  onTableChange: (page: number, pageSize: number) => void
}

const Inventory = (props: Props) => {
  const { inventory, total, pageSize, onTableChange, loading, page } = props
  return (
    <>
      <Table
        columns={columnInventory}
        dataSource={inventory}
        loading={loading}
        pagination={{
          ...paginationConfig,
          current: page,
          total: total,
          pageSize: pageSize
        }}
        onChange={pagination =>
          onTableChange(
            pagination.current || paginationConfig.page,
            pagination.pageSize || paginationConfig.page_size
          )
        }
      />
    </>
  )
}
export default Inventory
