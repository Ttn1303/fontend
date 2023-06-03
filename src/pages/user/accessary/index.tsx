import React, { ReactElement, useEffect, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import { Button, Select, SelectProps, Space, notification } from 'antd'
import { DatabaseOutlined, SearchOutlined } from '@ant-design/icons'
import Accessaries from '@/components/list/accessary'
import { paginationConfig } from '@/config/pagination'
import router from 'next/router'
import { accessaryService } from '@/services/accessary'
import { notificationError } from '@/helpers/notification'
import { Accessary, AccessaryGroup, AccessaryPayload } from '@/types/accessary'

const Page: NextPageWithLayout = () => {
  const [group, setGroup] = useState<string>('')
  const [listAccessary, setListAccessary] = useState<Accessary[]>()
  const [groupOptions, setGroupOptions] = useState<SelectProps['options']>([])

  // Pagination
  const [total, setTotal] = useState<number>(paginationConfig.total)
  const [page, setPage] = useState<number>(paginationConfig.page)
  const [pageSize, setPageSize] = useState<number>(paginationConfig.page_size)

  const [loading, setLoading] = useState<boolean>(false)

  const getCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const fetchListAccessaryService = async () => {
    const payload: AccessaryPayload = {
      group: group,
      page: page,
      page_size: pageSize
    }
    try {
      setLoading(true)
      const response = await accessaryService.getListAccessary(payload)
      if (response) {
        setListAccessary(response.data)
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

  const fetchListGroupAccessaryService = async () => {
    const group = await accessaryService.getListGroup()
    formatGroup(group)
  }

  useEffect(() => {
    fetchListAccessaryService()
    fetchListGroupAccessaryService()
  }, [page, pageSize])

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
          icon={<DatabaseOutlined />}
          onClick={() => router.push('/user/accessary/create')}
        >
          Thêm Mới Phụ Tùng
        </Button>
        {/* Filter */}
        <Space wrap>
          <Select
            value={group}
            style={{ width: 150 }}
            onChange={setGroup}
            options={groupOptions}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ fontWeight: '500' }}
            loading={loading}
            onClick={fetchListAccessaryService}
          >
            Lọc
          </Button>
        </Space>
      </div>
      {/* Tickets */}
      <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <Accessaries
          accessaries={listAccessary}
          fetch={fetchListAccessaryService}
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
