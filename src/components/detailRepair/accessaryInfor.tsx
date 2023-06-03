import {
  Button,
  Popconfirm,
  Popover,
  Table,
  Typography,
  notification
} from 'antd'
import { TableAccessaryInforData } from '@/types/config'
import { formatPrice } from '@/helpers/currency'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined } from '@ant-design/icons'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { useState } from 'react'
import { repairDetailService } from '@/services/repairdetail'
import { Repair } from '@/types/repair'

type Props = {
  repair: Repair | undefined
  accessaries: TableAccessaryInforData[]
  loading: boolean
  fetch: () => void
  onChangeTotal: (total: number) => void
}

const AccessaryInfor = (props: Props) => {
  const { repair, accessaries, loading, fetch, onChangeTotal } = props
  const { Text } = Typography
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const onDelete = async (accessary: TableAccessaryInforData) => {
    try {
      setLoadingButton(true)
      await repairDetailService.deleteById(repair?.id, accessary.id)
      notificationSuccess('Xóa phụ tùng thành công!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Mặt hàng này không tồn tại!')
        }
      }
    } finally {
      setLoadingButton(false)
    }
  }

  const columnAccessaryInfor: ColumnsType<TableAccessaryInforData> = [
    {
      title: 'Tên Mặt Hàng',
      render: (_, data) => <>{data.name_accessary}</>
    },
    {
      title: 'ĐVT',
      render: (_, data) => <>{data.name_unit}</>
    },
    {
      title: 'Số lượng',
      render: (_, data) => <>{data.quantity}</>
    },
    {
      title: 'Đơn giá',
      render: (_, data) => <>{formatPrice(data.price)}</>
    },
    {
      title: 'Thành tiền',
      render: (_, data) => {
        const total = data.price * data.quantity
        return formatPrice(total)
      }
    },
    {
      render: (_, data) => (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <Popconfirm
            placement="topRight"
            title="Cảnh báo"
            description="Bạn có chắc muốn xóa mặt hàng này?"
            onConfirm={async () => {
              await onDelete(data), fetch()
            }}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Popover placement="top" trigger="click">
              <Button
                type="text"
                style={{ color: 'red' }}
                loading={loadingButton}
                icon={<DeleteOutlined />}
              />
            </Popover>
          </Popconfirm>
        </div>
      )
    }
  ]

  const columnAccessaryInfor1: ColumnsType<TableAccessaryInforData> = [
    {
      title: 'Tên Mặt Hàng',
      render: (_, data) => <>{data.name_accessary}</>
    },
    {
      title: 'ĐVT',
      render: (_, data) => <>{data.name_unit}</>
    },
    {
      title: 'Số lượng',
      render: (_, data) => <>{data.quantity}</>
    },
    {
      title: 'Đơn giá',
      render: (_, data) => <>{formatPrice(data.price)}</>
    },
    {
      title: 'Thành tiền',
      render: (_, data) => {
        const total = data.price * data.quantity
        return formatPrice(total)
      }
    }
  ]

  return (
    <>
      <Table
        columns={
          repair?.state === '3' ? columnAccessaryInfor1 : columnAccessaryInfor
        }
        dataSource={accessaries}
        loading={loading}
        pagination={false}
        bordered
        summary={pageData => {
          let totalPrice = 0
          pageData.forEach(({ price, quantity }) => {
            totalPrice += price * quantity
          })
          onChangeTotal(totalPrice)
          return (
            <Table.Summary fixed>
              <Table.Summary.Row style={{ fontSize: 20, fontWeight: 'bold' }}>
                <Table.Summary.Cell index={0} colSpan={4}>
                  Tổng tiền
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}>
                  <Text type="danger" style={{ fontSize: 18 }}>
                    {formatPrice(totalPrice)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
        rowKey="id"
      />
    </>
  )
}
export default AccessaryInfor
