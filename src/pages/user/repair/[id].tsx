import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'
import {
  Button,
  InputNumber,
  Select,
  SelectProps,
  Skeleton,
  Space,
  Tabs,
  TabsProps,
  notification
} from 'antd'

import User from '@/components/layouts/user'
import RepairInfo from '@/components/detailRepair/repairInfo'
import { TableAccessaryInforData } from '@/types/config'
import AccessaryInfor from '@/components/detailRepair/accessaryInfor'
import { repairService } from '@/services/repair'
import { Repair } from '@/types/repair'
import { accessaryService } from '@/services/accessary'
import { Accessary, AccessaryPayload, AccessarySelect } from '@/types/accessary'
import dayjs from 'dayjs'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { repairDetailService } from '@/services/repairdetail'

const Detail: NextPageWithLayout = () => {
  const router = useRouter()
  const [repair, setRepair] = useState<Repair>()
  const [repairDetail, setRepairDetail] = useState<TableAccessaryInforData[]>(
    []
  )
  const [accessaryOptions, setAccessaryOptions] = useState<
    SelectProps['options']
  >([])
  const [quantity, setQuantity] = useState<number | null>(1)
  const [totalPrice, setTotalPrice] = useState<number>()
  const [search, setSearch] = useState<number>()

  const [loading, setLoading] = useState<boolean>(false)
  const getCurrentTotal = (total: number) => {
    setTotalPrice(total)
  }

  const fetchServiceRepair = async () => {
    const res = await repairService.getRepairbyId(router.query.id)
    if (res) setRepair(res)
  }

  const fetchServiceRepairDetail = async () => {
    try {
      setLoading(true)
      const detail = await repairDetailService.getRepairDetailbyId(
        router.query.id
      )
      if (detail) setRepairDetail(detail)
    } catch (error: unknown) {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  const fetchListAccessaryService = async () => {
    const payload: AccessaryPayload = {
      group: '',
      page: 1,
      page_size: 10
    }
    const accessary = await accessaryService.getListAccessary(payload)
    formatAccessarySelect(accessary.data)
  }

  const formatAccessarySelect = (select: Accessary[]) => {
    const options: AccessarySelect[] = []
    select.forEach(val => {
      options.push({
        value: val.id,
        label: val.name
      })
    })
    setAccessaryOptions(options)
  }

  useEffect(() => {
    fetchListAccessaryService()
    if (router.query.id) {
      fetchServiceRepair()
      fetchServiceRepairDetail()
    }
  }, [router])

  const onAdd = async () => {
    try {
      setLoading(true)
      await repairDetailService.addRepairDetail(repair?.id, search, quantity)
      notificationSuccess('Thêm phụ tùng thành công!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Phụ tùng này không tồn tại!')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (payments: TableAccessaryInforData[]) => {
    try {
      setLoading(true)
      const update = await repairDetailService.payment(
        repair?.id,
        totalPrice,
        payments
      )
      notificationSuccess('Thanh toán thành công!')
      // if (update) {
      // } else notificationError('Mặt hàng này không tồn tại!')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Mặt hàng này không tồn tại!')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Thông tin chi tiết`,
      children: loading ? (
        <Skeleton active />
      ) : (
        <RepairInfo repairDetail={repair} state={repair?.state} />
      )
    },
    {
      key: '2',
      label: `Thông tin phụ tùng sửa chữa`,
      children: (
        <>
          {repair?.state === '3' ? (
            <></>
          ) : (
            <div style={{ alignContent: 'center' }}>
              <Space style={{ marginBottom: 15 }}>
                <Select
                  style={{ marginRight: 15, width: 500 }}
                  showSearch
                  placeholder="Chọn mặt hàng"
                  optionFilterProp="children"
                  onChange={value => {
                    setSearch(value)
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toString()
                      .toLowerCase()
                      .includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toString()
                      .toLowerCase()
                      .localeCompare(
                        (optionB?.label ?? '').toString().toLowerCase()
                      )
                  }
                  options={accessaryOptions}
                />
                <InputNumber
                  style={{ width: 100 }}
                  value={quantity}
                  onChange={value => setQuantity(value)}
                />
                <Button
                  type="primary"
                  style={{ width: 90 }}
                  onClick={async () => {
                    await onAdd()
                    fetchServiceRepairDetail()
                  }}
                >
                  Thêm
                </Button>
              </Space>
            </div>
          )}
          <AccessaryInfor
            repair={repair}
            accessaries={repairDetail}
            loading={loading}
            fetch={fetchServiceRepairDetail}
            onChangeTotal={getCurrentTotal}
          />
          {repair?.state === '3' ? (
            <></>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
              }}
            >
              <Button
                type="primary"
                style={{ width: 130 }}
                onClick={async () => {
                  await onUpdate(repairDetail)
                  fetchServiceRepair()
                }}
              >
                Thanh toán
              </Button>
            </div>
          )}
        </>
      )
    }
  ]

  return (
    <div
      style={{
        background: 'white',
        marginLeft: '1rem',
        marginRight: '1rem',
        marginTop: '1rem'
      }}
    >
      {/* Row 1 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem'
        }}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>
                Thông tin phiếu sửa chữa {repair?.code}
              </div>
              <span>
                Ngày tạo: {dayjs(repair?.created_at).format('DD/MM/YYYY')}
              </span>
            </div>
          </>
        )}
      </div>
      {/* Row 2 - tab */}
      <div
        style={{
          paddingRight: '1.5rem',
          paddingLeft: '1.5rem',
          paddingBottom: '1rem'
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Detail
