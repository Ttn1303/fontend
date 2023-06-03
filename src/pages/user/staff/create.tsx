import { ReactElement, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
  Space
} from 'antd'
import router from 'next/router'
import { notificationError } from '@/helpers/notification'
import axios from 'axios'
import { UserInfo } from '@/types/user'
import { userService } from '@/services/user'

const Create: NextPageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const [messageSuccess, contextHolder] = message.useMessage()
  const onSubmit = async (staff: UserInfo) => {
    try {
      setLoading(true)
      await userService.addUser(staff)
      messageSuccess.success({
        type: 'success',
        content: 'Thêm mới nhân sự thành công!',
        duration: 2,
        onClose: () => router.push('/user/staff')
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Có lỗi xảy ra!')
        } else {
          notification.destroy()
          notificationError('Vui lòng nhập đủ dữ liệu !')
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
                <h2 className="homepage-title">Thông tin nhân viên mới</h2>
                <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu!' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Tên nhân viên"
                    name="name"
                    rules={[
                      { required: true, message: 'Vui lòng nhập họ và tên!' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Row>
                    <Col span={6}>
                      <Form.Item label="Tuổi" name="age">
                        <InputNumber min={0} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Giới tính"
                        name="sex"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn giới tính!'
                          }
                        ]}
                        initialValue={''}
                      >
                        <Select
                          style={{ width: 125 }}
                          options={[
                            { value: '', label: '--Giới tính--' },
                            { value: 'Nam', label: 'Nam' },
                            { value: 'Nữ', label: 'Nữ' }
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      label="Chức vụ"
                      name="role"
                      rules={[
                        { required: true, message: 'Vui lòng chọn chức vụ!' }
                      ]}
                      initialValue={''}
                    >
                      <Select
                        style={{ width: 185 }}
                        options={[
                          { value: '', label: '--Chức vụ--' },
                          { value: 'admin', label: 'Quản lý' },
                          {
                            value: 'business_staff',
                            label: 'Nhân viên kinh doanh'
                          },
                          { value: 'staff', label: 'Nhân viên sửa chữa' }
                        ]}
                      />
                    </Form.Item>
                  </Row>

                  <Form.Item label="Số điện thoại" name="phone">
                    <Input maxLength={10} />
                  </Form.Item>
                  <Form.Item label="Địa chỉ" name="address">
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
                        Thêm mới
                      </Button>
                      <Button
                        size="large"
                        onClick={() => router.push('/user/staff')}
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

Create.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Create
