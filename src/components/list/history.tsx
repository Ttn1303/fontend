import { Table } from 'antd'
import { paginationConfig } from '@/config/pagination'
import { ColumnsType } from 'antd/es/table'
import { Histoy } from '@/types/receipt'

type Props = {
  history: Histoy[] | undefined
  total: number
  page: number
  pageSize: number
  loading: boolean
  onTableChange: (page: number, pageSize: number) => void
}

const History = (props: Props) => {
  const { history, total, pageSize, onTableChange, loading, page } = props

  const columnAccessary: ColumnsType<Histoy> = [
    {
      title: 'TT',
      align: 'center',
      render: (_, data) => <>{data.id}</>
    },
    {
      title: 'Mã phiếu nhập',
      render: (_, data) => <>{data.receipt.receipt_name}</>
    },
    {
      title: 'Tên mặt hàng',
      render: (_, data) => <>{data.accessary.name}</>
    },
    {
      title: 'Người nhập',
      render: (_, data) => <>{data.receipt.user.name}</>
    },
    {
      title: 'Ngày nhập',
      render: (_, data) => <>{data.receipt.receipt_date}</>
    },
    {
      title: 'Số Lượng',
      align: 'center',
      render: (_, data) => <>{data.quantity}</>
    },
    {
      title: 'Giá Nhập',
      render: (_, data) => <>{data.import_price}</>
    },
    {
      title: 'Tổng tiền',
      render: (_, data) => <>{data.receipt.total}</>
    }
  ]

  return (
    <>
      <Table
        columns={columnAccessary}
        dataSource={history}
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
        rowKey="id"
      />
    </>
  )
}
export default History
