import React, { ReactElement, useEffect, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import { Button, Input, Space, notification } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { paginationConfig } from '@/config/pagination'
import { notificationError } from '@/helpers/notification'
import History from '@/components/list/history'
import { HistoryPayload, Histoy } from '@/types/receipt'
import { historyService } from '@/services/receipt'

const Page: NextPageWithLayout = () => {
  const [name, setName] = useState<string>('')

  const [receipt, setListReceipt] = useState<Histoy[]>()

  // Pagination
  const [total, setTotal] = useState<number>(paginationConfig.total)
  const [page, setPage] = useState<number>(paginationConfig.page)
  const [pageSize, setPageSize] = useState<number>(paginationConfig.page_size)

  const [loading, setLoading] = useState<boolean>(false)

  const getCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const fetchListReceiptService = async () => {
    const payload: HistoryPayload = {
      name: name,
      page: page,
      page_size: pageSize
    }
    try {
      setLoading(true)
      const response = await historyService.getListReceipt(payload)
      if (response) {
        setListReceipt(response.data)
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
    fetchListReceiptService()
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
          justifyContent: 'end',
          marginRight: '20px'
        }}
      >
        {/* Filter */}
        <Space wrap>
          <Input
            name="search"
            placeholder="Nhập tên mặt hàng"
            style={{ width: 400 }}
            onChange={e => setName(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ fontWeight: '500' }}
            loading={loading}
            onClick={fetchListReceiptService}
          >
            Lọc
          </Button>
        </Space>
      </div>
      {/* Tickets */}
      <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <History
          history={receipt}
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
