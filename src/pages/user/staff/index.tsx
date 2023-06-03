import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types/next-page'

import { Button, Input, Space, notification } from 'antd'
import User from '@/components/layouts/user'
import { paginationConfig } from '@/config/pagination'
import { notificationError } from '@/helpers/notification'
import { DiffOutlined, SearchOutlined } from '@ant-design/icons'
import router from 'next/router'
import Staffs from '@/components/list/listStaff'
import { UserInfo, UserPayload } from '@/types/user'
import { userService } from '@/services/user'

const Page: NextPageWithLayout = () => {
  const [listUser, setListUser] = useState<UserInfo[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  /*Filter */
  const [search, setSearch] = useState<string>('')

  /*Pagination */
  const [page, setPage] = useState<number>(paginationConfig.page)
  const [pageSize, setPageSize] = useState<number>(paginationConfig.page_size)
  const [total, setTotal] = useState<number>(0)

  const getCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const fetchListUser = async () => {
    const payload: UserPayload = {
      name: search,
      page: page,
      page_size: pageSize
    }
    try {
      setLoading(true)
      const response = await userService.getListUser(payload)
      if (response) {
        setListUser(response.data)
        setPage(response.current_page)
        setTotal(response.total)
      }
    } catch (error: unknown) {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListUser()
  }, [page, pageSize])

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
          onClick={() => router.push('/user/staff/create')}
        >
          Thêm Mới Nhân Sự
        </Button>
        <Space wrap>
          <Input
            name="search"
            placeholder="Nhập tên nhân viên"
            style={{ width: 400 }}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ fontWeight: '500' }}
            loading={loading}
            onClick={() => fetchListUser()}
          >
            Lọc
          </Button>
        </Space>
      </div>
      <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <Staffs
          user={listUser}
          fetch={fetchListUser}
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
