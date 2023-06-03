import { formatPrice } from '@/helpers/currency'
import { Button, Col, Divider, Row, Select, notification } from 'antd'
import { useState } from 'react'
import DetailInfo from './detailInfo'
import { statesSelect } from '@/config/state'
import { Repair } from '@/types/repair'
import dayjs from 'dayjs'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { repairService } from '@/services/repair'

type Props = {
  repairDetail?: Repair
  state: string | undefined
}

const RepairInfo = (props: Props) => {
  const { repairDetail, state } = props
  const [status, setStatus] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const states = statesSelect.find(
    item => item.value === Number(repairDetail?.state)
  )

  const fetchListRepairService = async () => {
    try {
      setLoading(true)
      await repairService.updateStateRepair(repairDetail?.id, status)
      notificationSuccess('Sửa trạng thái thành công!')
    } catch (error: unknown) {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Divider
        style={{ fontWeight: 'bold', fontSize: 15 }}
        orientation="left"
        plain
      >
        Thông tin khách hàng
      </Divider>
      {/* Row 1 */}
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo
          title="Họ và tên"
          content={repairDetail?.customer.name || ''}
        />
        <DetailInfo
          title="Số điện thoại"
          content={repairDetail?.customer.phone || ''}
        />
        <DetailInfo
          title="Địa chỉ"
          content={repairDetail?.customer.address || ''}
        />
      </Row>
      <Divider
        style={{ fontWeight: 'bold', fontSize: 15 }}
        orientation="left"
        plain
      >
        Thông tin xe
      </Divider>
      {/* Row 2 */}
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo
          title="Biển số xe"
          content={repairDetail?.vehicle_infor.licensePlates || ''}
        />
        <DetailInfo
          title="Số khung"
          content={repairDetail?.vehicle_infor.frameNumber || ''}
        />
        <DetailInfo
          title="Hãng xe"
          content={repairDetail?.vehicle_infor.brand.name || ''}
        />
      </Row>
      {/* Row 3 */}
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo
          title="Loại xe"
          content={repairDetail?.vehicle_infor.type_vehicle || ''}
        />
        <DetailInfo
          title="Màu sơn"
          content={repairDetail?.vehicle_infor.color || ''}
        />
        <DetailInfo
          title="Model"
          content={repairDetail?.vehicle_infor.model || ''}
        />
      </Row>
      {/* Row 4 */}
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo
          title="Năm sản xuất"
          content={repairDetail?.vehicle_infor.yearProduct || ''}
        />
        <DetailInfo
          title="Dung tích"
          content={repairDetail?.vehicle_infor.capacity || ''}
        />
        <DetailInfo
          title="Số KM"
          content={formatPrice(repairDetail?.vehicle_infor.kmNumber || 0)}
        />
      </Row>
      <Divider
        style={{ fontWeight: 'bold', fontSize: 15 }}
        orientation="left"
        plain
      >
        Thông tin phiếu nhận
      </Divider>
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo title="Mã phiếu" content={repairDetail?.code || ''} />
        <DetailInfo
          title="Ngày lập"
          content={dayjs(repairDetail?.created_at).format('DD/MM/YYYY') || ''}
        />
        <DetailInfo title="Dịch vụ" content={repairDetail?.service || ''} />
      </Row>
      <Row style={{ alignItems: 'center' }}>
        {state === '3' ? (
          <DetailInfo title="Trạng thái" content={states?.label || ''} />
        ) : (
          <>
            <Col
              span={2}
              style={{
                color: '#858585',
                fontSize: '1rem',
                margin: 10
              }}
            >
              Trạng thái:
            </Col>
            <Col span={5}>
              {state === '2' ? (
                <Select
                  defaultValue={states?.label}
                  value={status}
                  style={{ width: 125 }}
                  options={[
                    { value: 2, label: 'Đang xử lý' },
                    { value: 3, label: 'Hoàn thành' }
                  ]}
                  onChange={setStatus}
                />
              ) : (
                <Select
                  defaultValue={states?.label}
                  value={status}
                  style={{ width: 125 }}
                  options={[
                    { value: 1, label: 'Tiếp nhận' },
                    { value: 2, label: 'Đang xử lý' }
                  ]}
                  onChange={setStatus}
                />
              )}
            </Col>
          </>
        )}
        <DetailInfo
          title="Ngày hẹn"
          content={
            dayjs(repairDetail?.appointmentDate).format('DD/MM/YYYY') || ''
          }
        />
        <DetailInfo
          title="Hiện trạng xe"
          content={repairDetail?.vehicleCondition || ''}
        />
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <DetailInfo
          title="Người nhận"
          content={repairDetail?.user.name || ''}
        />
        <DetailInfo title="Ghi chú" content={repairDetail?.note || ''} />
        <DetailInfo
          title="Yêu cầu khách hàng"
          content={repairDetail?.customerRequest || ''}
        />
      </Row>
      {state === '3' ? (
        <></>
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Button
            type="primary"
            size="large"
            style={{ width: 100 }}
            loading={loading}
            onClick={() => fetchListRepairService()}
          >
            Lưu
          </Button>
        </div>
      )}
    </div>
  )
}

export default RepairInfo
