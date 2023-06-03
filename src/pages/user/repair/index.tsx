import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from '@/types/next-page'

import { notification } from 'antd'
import User from '@/components/layouts/user'
import { paginationConfig } from '@/config/pagination'
import { notificationError } from '@/helpers/notification'
import Search from '@/components/list/listSearch'
import { repairService } from '@/services/repair'
import { Repair, RepairPayload } from '@/types/repair'
import FilterRepair from '@/config/filter'

const Page: NextPageWithLayout = () => {
  const [listRepair, setListRepair] = useState<Repair[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  /*Filter */
  const [status, setStatus] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  /*Pagination */
  const [page, setPage] = useState<number>(paginationConfig.page)
  const [pageSize, setPageSize] = useState<number>(paginationConfig.page_size)
  const [total, setTotal] = useState<number>(paginationConfig.total)

  const getCurrentStatus = (selectedStatus: string) => {
    setStatus(selectedStatus)
  }

  const getCurrentSearch = (selectedSearch: string) => {
    setSearch(selectedSearch)
  }

  const getCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const fetchListRepairService = async (payload: RepairPayload) => {
    try {
      setLoading(true)
      const response = await repairService.getListRepair(payload)
      if (response) {
        setListRepair(response.data)
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
    fetchListRepairService({
      state: status,
      name: search,
      page: page,
      page_size: pageSize
    })
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
      <FilterRepair
        fetchListRepairService={fetchListRepairService}
        onChangeStatus={getCurrentStatus}
        onChangeSearch={getCurrentSearch}
        loading={loading}
        page={page}
        pageSize={pageSize}
        selectedStatus={status}
        selectedSearch={search}
      />
      <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <Search
          repairs={listRepair}
          fetch={fetchListRepairService}
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
