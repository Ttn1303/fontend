import {
  Button,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
  notification
} from 'antd'
import { paginationConfig } from '@/config/pagination'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { statesSelect } from '@/config/state'
import { DeleteOutlined, SettingFilled } from '@ant-design/icons'
import router from 'next/router'
import { useState } from 'react'
import { repairService } from '@/services/repair'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { Repair, RepairPayload } from '@/types/repair'

type Props = {
  repairs: Repair[]
  fetch: (payload: RepairPayload) => void
  total: number
  page: number
  pageSize: number
  loading: boolean
  onTableChange: (page: number, pageSize: number) => void
}
const Search = (props: Props) => {
  const { repairs, fetch, total, pageSize, onTableChange, loading, page } =
    props
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const onDelete = async (repair: Repair) => {
    try {
      setLoadingButton(true)
      const response = await repairService.DeleteRepairById(repair.id)
      if (response) notificationSuccess('Xóa phiếu sửa chữa thành công!')
      else notificationError('Xóa phiếu sửa chữa thất bại!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Phiếu sữa chữa này không tồn tại!')
        }
      }
    } finally {
      setLoadingButton(false)
    }
  }

  const columnSearch: ColumnsType<Repair> = [
    {
      title: 'TT',
      render: (_, data) => <>{data.id}</>
    },
    {
      title: 'Mã Phiếu',
      render: (_, data) => <>{data.code}</>
    },
    {
      title: 'Biển Số Xe',
      render: (_, data) => <>{data.vehicle_infor?.licensePlates}</>
    },
    {
      title: 'Tên Khách Hàng',
      render: (_, data) => <>{data.customer?.name}</>
    },
    {
      title: 'Ngày lập phiếu',
      render: (_, data) => {
        const date = dayjs(data.created_at).format('DD/MM/YYYY')
        return <>{date}</>
      }
    },
    {
      title: 'Ngày hẹn',
      render: (_, data) => {
        const date = dayjs(data.appointmentDate).format('DD/MM/YYYY')
        return <>{date}</>
      }
    },
    {
      title: 'Trạng thái',
      render: (_, data) => {
        const state = statesSelect.find(
          item => item.value === Number(data.state)
        )
        return (
          <Tag
            style={{ padding: '5px 10px', fontSize: '14px' }}
            color={state?.color}
          >
            {state?.label}
          </Tag>
        )
      }
    },
    {
      title: 'Nhân viên sửa chữa',
      render: (_, data) => <>{data.user?.name}</>
    },
    {
      title: 'Điều khiển',
      render: (_, data) => (
        <Space>
          <Popover placement="top" trigger="hover" content="Chi tiết">
            <Button
              style={{ borderColor: 'white' }}
              onClick={() =>
                router.push({
                  pathname: `/user/repair/${data.id}`
                })
              }
              icon={<SettingFilled />}
            />
          </Popover>
          <Popover placement="top" trigger="hover" content="Xóa">
            <Popconfirm
              placement="topRight"
              title="Cảnh báo"
              description="Bạn có chắc muốn xóa phiếu sửa chữa này?"
              onConfirm={async () => {
                await onDelete(data)
                fetch({ page: page, page_size: pageSize })
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
          </Popover>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columnSearch}
        dataSource={repairs}
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
export default Search
