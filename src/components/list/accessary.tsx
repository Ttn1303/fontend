import { Button, Popconfirm, Popover, Space, Table, notification } from 'antd'
import { paginationConfig } from '@/config/pagination'
import { Accessary } from '@/types/accessary'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { notificationSuccess, notificationError } from '@/helpers/notification'
import axios from 'axios'
import { accessaryService } from '@/services/accessary'
import router from 'next/router'

type Props = {
  accessaries: Accessary[] | undefined
  fetch: () => void
  total: number
  page: number
  pageSize: number
  loading: boolean
  onTableChange: (page: number, pageSize: number) => void
}

const Accessaries = (props: Props) => {
  const { accessaries, fetch, total, pageSize, onTableChange, loading, page } =
    props
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const onDelete = async (accessary: Accessary) => {
    try {
      setLoadingButton(true)
      const response = await accessaryService.deleteAccessaryById(accessary.id)
      if (response) notificationSuccess('Xóa phụ tùng thành công!')
      else notificationError('Xóa phụ tùng thất bại!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Phụ tùng này không tồn tại!')
        }
      }
    } finally {
      setLoadingButton(false)
    }
  }

  const columnAccessary: ColumnsType<Accessary> = [
    {
      title: 'TT',
      align: 'center',
      render: (_, data) => <>{data.id}</>
    },
    {
      title: 'Nhóm Hàng',
      render: (_, data) => <>{data.accessary_group.name}</>
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
      render: (_, data) => <>{data.unit.name}</>
    },
    {
      title: 'Giá Bán',
      render: (_, data) => <>{data.price}</>
    },
    {
      title: 'Số Lượng',
      align: 'center',
      render: (_, data) => <>{data.quantity}</>
    },
    {
      title: 'Điều khiển',
      render: (_, data) => (
        <Space>
          <Popover placement="top" trigger="hover" content="Nhập hàng">
            <Button
              style={{ borderColor: 'white' }}
              onClick={() =>
                router.push({
                  pathname: `/user/accessary/${data.id}`
                })
              }
              icon={<PlusOutlined />}
            />
          </Popover>
          <Popconfirm
            placement="topRight"
            title="Cảnh báo"
            description="Bạn có chắc muốn xóa phụ tùng này?"
            onConfirm={async () => {
              await onDelete(data)
              fetch()
            }}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button
              type="text"
              style={{ color: 'red' }}
              loading={loadingButton}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columnAccessary}
        dataSource={accessaries}
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
export default Accessaries
