import type { NextPageWithLayout } from '@/types/next-page'
import { ReactElement, useEffect, useState } from 'react'

import { Button, Col, Row, Space, Table, Tag, notification } from 'antd'
import User from '@/components/layouts/user'
import { notificationError } from '@/helpers/notification'
import { Repair, RepairPayload } from '@/types/repair'
import { repairService } from '@/services/repair'
import { repairColumn } from '@/config/config-column'
import { Transaction } from '@/types/config'
import { Chart } from '@/config/chart'
import { ColumnsType } from 'antd/es/table'
import router from 'next/router'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'
import { roleSelect } from '@/config/state'

const Page: NextPageWithLayout = () => {
  const [sale, getSale] = useState<number[]>([])
  const [listRepair, setListRepair] = useState<Repair[]>([])
  const [transactionManagement, setTransactionManagement] = useState<
    Transaction[]
  >([])
  const userLocalInfo = useLocalStorage<UserInfo>('user', null)
  const role = roleSelect.find(item => item.value === userLocalInfo[0].role)

  const fetchListRepair = async () => {
    try {
      const payload: RepairPayload = {
        state: 1,
        page: 1,
        page_size: 10
      }
      const { data } = await repairService.getListRepair(payload)
      if (data) {
        setListRepair(data)
      }
      const transaction = await repairService.getTransaction()
      if (transaction) {
        setTransactionManagement(transaction)
      }
    } catch {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    }
  }

  const fetchSales = async () => {
    const sales = await repairService.getSales()
    if (sales) getSale(sales)
  }

  useEffect(() => {
    fetchListRepair()
    fetchSales()
  }, [])

  const columnTransaction: ColumnsType<Transaction> = [
    {
      title: 'Trạng thái',
      width: '60%',
      render: (_, data) => <>{data.status}</>
    },
    {
      title: 'Thống kê',
      width: '20%',
      render: (_, data) => <>{data.total}</>
    },
    {
      key: 'action',
      render: (_, data) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              router.push(`/user/repair/?state=${data.id}`)
            }}
          >
            Chi tiết
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ color: '#555', padding: '1rem', height: '100%' }}>
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={15} style={{ position: 'relative' }}>
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#0080ff'
              }}
            >
              Doanh thu
            </h3>
            <div style={{ display: 'flex', width: '900px', height: '850px' }}>
              <Chart sales={sale} />
            </div>
          </div>

          {/* <div
            style={{
              position: 'absolute',
              left: '0px',
              right: '0px',
              bottom: '20px'
            }}
          >
            <h3
              style={{
                marginTop: '2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#0080ff'
              }}
            >
              Danh sách phiếu sửa chữa
            </h3>
            <Table
              columns={repairColumn}
              dataSource={listRepair}
              size="small"
              pagination={false}
              scroll={{ y: '25vh' }}
              bordered={true}
            />
          </div> */}
        </Col>
        <Col span={9}>
          <div className="account-info">
            <p
              style={{
                textTransform: 'uppercase',
                fontSize: '1.2rem',
                marginBottom: '0.25rem',
                fontWeight: '500'
              }}
            >
              Họ và tên: {userLocalInfo[0].name}
            </p>
            <p
              style={{
                marginTop: '1.5rem',
                textAlign: 'left',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}
            >
              Chức vụ:
              <Tag
                color="#72BE2E"
                style={{ marginLeft: '0.25rem', fontSize: '1rem' }}
              >
                {role?.label}
              </Tag>
            </p>
          </div>
          <h3
            style={{
              marginTop: '2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#0080ff'
            }}
          >
            Danh sách phiếu sửa chữa
          </h3>
          <Table
            columns={repairColumn}
            dataSource={listRepair}
            size="small"
            pagination={false}
            scroll={{ y: '25vh' }}
            bordered={true}
            rowKey="id"
          />
          <h3
            style={{
              marginTop: '1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#0080ff'
            }}
          >
            Thống kê giao dịch
          </h3>
          <Table
            columns={columnTransaction}
            dataSource={transactionManagement}
            size="small"
            pagination={false}
            bordered={true}
            rowKey="id"
          />
        </Col>
      </Row>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
