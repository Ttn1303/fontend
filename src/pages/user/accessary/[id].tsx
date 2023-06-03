import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  SelectProps,
  Space,
  message,
  notification
} from 'antd'

import User from '@/components/layouts/user'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { accessaryService } from '@/services/accessary'
import { UserInfo, UserPayload } from '@/types/user'
import { userService } from '@/services/user'
import { Accessary } from '@/types/accessary'
import { ReceiptDetail } from '@/types/receipt'

const Detail: NextPageWithLayout = () => {
  const router = useRouter()
  const [acces, setAcces] = useState<Accessary>()
  const [adminOptions, setAdminOptions] = useState<SelectProps['options']>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number | null>(1)
  const [formModal] = Form.useForm()

  const fetchServiceUser = async () => {
    const staffRes = await accessaryService.getListUser()
    const staff = staffRes.filter(staff => staff.role === 'admin')

    if (staff) {
      formatAdmin(staff)
    }
  }

  const fetchServiceAccessary = async () => {
    try {
      setLoading(true)
      const detail = await accessaryService.getAccessarybyId(router.query.id)
      if (detail) setAcces(detail)
    } catch (error: unknown) {
      notification.destroy()
      notificationError('Không tìm thấy dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchServiceUser()
      fetchServiceAccessary()
    }
  }, [router])

  useEffect(() => {
    formModal.setFieldsValue({ ...acces })
  }, [acces])

  const formatAdmin = (staffs: UserInfo[]) => {
    const options = [{ value: '', label: '--Người nhập--' }]
    staffs.forEach(val => {
      options.push({
        value: val.id.toString(),
        label: val.name
      })
    })
    setAdminOptions(options)
  }

  const [messageSuccess, contextHolder] = message.useMessage()
  const updateQuantity = async (receipt: ReceiptDetail) => {
    try {
      setLoading(true)
      await accessaryService.updateAccessary(acces?.id, receipt)
      messageSuccess.success({
        type: 'success',
        content: 'Nhập hàng thành công!',
        duration: 2,
        onClose: () => router.push('/user/accessary')
      })
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

  return (
    <div style={{ background: '#f8f9fd', display: 'block' }}>
      {contextHolder}
      <div
        style={{
          height: '95vh',
          width: '100%',
          padding: '0 15px',
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '1140px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '50px -15px',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              padding: '0 15px',
              flexBasis: '50%',
              maxWidth: '50%'
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#fff',
                borderRadius: '5px',
                boxShadow: '0px 10px 34px -15px rgba(0, 0, 0, 0.24)'
              }}
            >
              <div style={{ position: 'relative', padding: '3rem' }}>
                <h2 className="homepage-title">Phiếu nhập hàng</h2>
                <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={updateQuantity}
                  autoComplete="off"
                  form={formModal}
                >
                  <Row>
                    <Col span={12} style={{ marginRight: 25 }}>
                      <Form.Item
                        label="Mã phiếu"
                        name="receipt_name"
                        rules={[
                          { required: true, message: 'Vui lòng nhập mã phiếu!' }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      label="Ngày nhập"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn ngày nhập!'
                        }
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Row>
                  <Form.Item
                    label="Người nhập hàng"
                    name="user_id"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn người nhập hàng!'
                      }
                    ]}
                    initialValue={''}
                  >
                    <Select style={{ width: '100%' }} options={adminOptions} />
                  </Form.Item>
                  <Form.Item label="Tên mặt hàng" name="name">
                    <Input disabled />
                  </Form.Item>
                  <Row>
                    <Col span={7}>
                      <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập số lượng!'
                          }
                        ]}
                      >
                        <InputNumber
                          min={1}
                          value={quantity}
                          onChange={value => setQuantity(value)}
                        />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      label="Giá nhập"
                      name="import_price"
                      rules={[
                        { required: true, message: 'Vui lòng nhập giá nhập!' }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Row>

                  <Form.Item label="Ghi chú" name="note">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Space
                      style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
                      >
                        Nhập hàng
                      </Button>
                      <Button
                        size="large"
                        onClick={() => router.push('/user/accessary')}
                      >
                        Quay lại
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Detail
