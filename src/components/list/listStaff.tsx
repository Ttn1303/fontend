import {
  Button,
  Popconfirm,
  Popover,
  Space,
  Table,
  notification
} from 'antd'
import { paginationConfig } from '@/config/pagination'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, SettingFilled } from '@ant-design/icons'
import router from 'next/router'
import { useState } from 'react'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { UserInfo } from '@/types/user'
import { roleSelect } from '@/config/state'
import { userService } from '@/services/user'

type Props = {
  user: UserInfo[]
  fetch: () => void
  total: number
  page: number
  pageSize: number
  loading: boolean
  onTableChange: (page: number, pageSize: number) => void
}
const Staffs = (props: Props) => {
  const { user, fetch, total, pageSize, onTableChange, loading, page } = props
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const onDelete = async (staff: UserInfo) => {
    try {
      setLoadingButton(true)
      await userService.deleteUserById(staff.id)
      notificationSuccess('Xóa nhân viên thành công!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Nhân viên này không tồn tại!')
        }
      }
    } finally {
      setLoadingButton(false)
    }
  }

  const columnSearch: ColumnsType<UserInfo> = [
    {
      title: 'TT',
      width:'5%',
      render: (_, data) => <>{data.id}</>
    },
    {
      title: 'Tên nhân viên',
      width:'25%',
      render: (_, data) => <>{data.name}</>
    },
    {
      title: 'Địa chỉ',
      render: (_, data) => <>{data.address}</>
    },
    {
      title: 'Số điện thoại',
      width: '10%',
      render: (_, data) => <>{data.phone}</>
    },
    {
      title: 'Giới tính',
      width: '7%',
      align:'center',
      render: (_, data) => <>{data.sex}</>
    },
    {
      title: 'Chức vụ',
      width: '15%',
      render: (_, data) => {
        const role = roleSelect.find(item => item.value === data.role)
        return <>{role?.label}</>
      }
    },
    {
      title: 'Điều khiển',
      width: '10%',
      align: 'center',
      render: (_, data) => (
        <Space>
          <Popover placement="top" trigger="hover" content="Chi tiết">
            <Button
              style={{ borderColor: 'white' }}
              onClick={() =>
                router.push({
                  pathname: `/user/staff/${data.id}`
                })
              }
              icon={<SettingFilled />}
            />
          </Popover>
          <Popover placement="top" trigger="hover" content="Xóa">
            <Popconfirm
              placement="topRight"
              title="Cảnh báo"
              description="Bạn có chắc muốn xóa nhân viên này?"
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
          </Popover>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columnSearch}
        dataSource={user}
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
export default Staffs
