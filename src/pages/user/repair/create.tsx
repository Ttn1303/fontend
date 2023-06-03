import { ReactElement, useEffect, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  SelectProps,
  Space
} from 'antd'
import router from 'next/router'
import { notificationError } from '@/helpers/notification'
import axios from 'axios'
import { repairService } from '@/services/repair'
import { Brand, Repair } from '@/types/repair'
import { UserInfo } from '@/types/user'
import { accessaryService } from '@/services/accessary'

const Create: NextPageWithLayout = () => {
  const [staffOptions, setStaffOptions] = useState<SelectProps['options']>([])
  const [brandOptions, setBrandOptions] = useState<SelectProps['options']>([])

  const [loading, setLoading] = useState<boolean>(false)

  const fetchListService = async () => {
    const staffRes = await accessaryService.getListUser()
    const staff = staffRes.filter(staff => staff.role === 'staff')
    if (staff) {
      formatStaff(staff)
    }
    const brandRes = await repairService.getListBrand()
    formatBrand(brandRes)
  }

  useEffect(() => {
    fetchListService()
  }, [])

  const formatBrand = (brands: Brand[]) => {
    const options = [{ value: 0, label: '--Thương hiệu--' }]
    brands.forEach(val => {
      options.push({
        value: val.id,
        label: val.name
      })
    })
    setBrandOptions(options)
  }

  const formatStaff = (staffs: UserInfo[]) => {
    const options = [{ value: 0, label: '--Nhân viên--' }]
    staffs.forEach(val => {
      options.push({
        value: val.id,
        label: val.name
      })
    })
    setStaffOptions(options)
  }

  const [messageSuccess, contextHolder] = message.useMessage()
  const onSubmit = async (repair: Repair) => {
    try {
      setLoading(true)
      await repairService.addRepair(repair)
      messageSuccess.success({
        type: 'success',
        content: 'Tạo phiếu sửa chữa mới thành công!',
        duration: 3,
        onClose: () => router.push('/user/repair')
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Có lỗi xảy ra!')
        }
      } else {
        notification.destroy()
        notificationError('Vui lòng nhập đủ dữ liệu !')
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      style={{
        margin: '5px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px',
        height: '100%'
      }}
    >
      {contextHolder}
      <Divider style={{ fontSize: '20px', fontWeight: 'bold' }} plain>
        Thông tin khách hàng
      </Divider>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        size="large"
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input />
        </Form.Item>
        <Divider
          style={{ border: 0, fontWeight: 'bold' }}
          orientation="left"
          plain
        >
          Thông tin xe
        </Divider>
        <Row>
          <Col span={7}>
            <Form.Item
              label="Biển số xe"
              name="licensePlates"
              rules={[{ required: true, message: 'Vui lòng nhập biển số xe!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại xe"
              name="typeVehicle"
              initialValue={'Xe ga'}
            >
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: 'Xe ga', label: 'Xe ga' },
                  { value: 'Xe số', label: 'Xe số' },
                  { value: 'Xe côn', label: 'Xe côn' }
                ]}
              />
            </Form.Item>
            <Form.Item label="Năm sản suất" name="yearProduct">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Số khung" name="frameNumber">
              <Input />
            </Form.Item>
            <Form.Item
              label="Màu sơn"
              name="color"
              rules={[{ required: true, message: 'Vui lòng nhập màu sơn!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Dung tích"
              name="capacity"
              rules={[{ required: true, message: 'Vui lòng nhập dung tích!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Hãng xe" name="brand" initialValue={1}>
              <Select style={{ width: '100%' }} options={brandOptions} />
            </Form.Item>
            <Form.Item label="Model" name="model">
              <Input />
            </Form.Item>
            <Form.Item
              label="Số KM"
              name="kmNumber"
              rules={[{ required: true, message: 'Vui lòng số công tơ mét!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider
          style={{ border: 0, fontWeight: 'bold' }}
          orientation="left"
          plain
        >
          Thông tin phiếu nhận
        </Divider>
        <Row>
          <Col span={7}>
            <Form.Item
              label="Mã Phiếu"
              name="repairCode"
              rules={[{ required: true, message: 'Vui lòng nhập mã phiếu!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name="state" initialValue={1}>
              <span style={{ fontSize: 18, marginLeft: 15 }}>Tiếp nhận</span>
            </Form.Item>
            <Form.Item label="Người nhận" name="staff" initialValue={0}>
              <Select style={{ width: '100%' }} options={staffOptions} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Ngày lập"
              name="created_at"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày lập!'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Ngày hẹn"
              name="appointmentDate"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày hẹn!'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Dịch vụ"
              name="service"
              initialValue={'Bảo dưỡng'}
            >
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: 'Bảo dưỡng', label: 'Bảo dưỡng' },
                  { value: 'Sửa chữa', label: 'Sửa chữa' }
                ]}
              />
            </Form.Item>
            <Form.Item label="Hiện trạng xe" name="vehicleCondition">
              <Input />
            </Form.Item>
            <Form.Item label="Yêu cầu khách hàng" name="customerRequest">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />

        <Form.Item>
          <Space
            style={{ display: 'flex', justifyContent: 'end', marginRight: 50 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Tạo mới
            </Button>
            <Button size="large" onClick={() => router.push('/user/repair')}>
              Quay lại
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Create
