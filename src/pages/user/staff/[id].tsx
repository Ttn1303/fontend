import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification
} from 'antd'

import User from '@/components/layouts/user'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import axios from 'axios'
import { userService } from '@/services/user'
import { UserInfo } from '@/types/user'
const Detail: NextPageWithLayout = () => {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo>()
  const [formModal] = Form.useForm()

  const [loading, setLoading] = useState<boolean>(false)

  const fetchUserDetailService = async () => {
    const res = await userService.getUserbyId(router.query.id)
    if (res) setUser(res)
  }

  useEffect(() => {
    if (router.query.id) {
      fetchUserDetailService()
    }
  }, [router])

  useEffect(() => {
    formModal.setFieldsValue({ ...user })
  }, [user])

  const onUpdate = async (UserInfo: UserInfo) => {
    try {
      setLoading(true)
      await userService.updateUser(user?.id, UserInfo)
      notificationSuccess('Cập nhật thành công!')
      router.push('/user/staff')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Có lỗi xảy ra!')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#f8f9fd', display: 'block' }}>
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
                <h2 className="homepage-title">Thông tin nhân viên</h2>
                <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onUpdate}
                  autoComplete="off"
                  form={formModal}
                >
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Tên nhân viên" name="name">
                    <Input disabled />
                  </Form.Item>
                  <Row>
                    <Col span={6}>
                      <Form.Item label="Tuổi" name="age">
                        <Input style={{ width: 90 }} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Giới tính" name="sex">
                        <Input style={{ width: 125 }} disabled />
                      </Form.Item>
                    </Col>
                    <Form.Item label="Chức vụ" name="role">
                      <Select
                        style={{ width: 185 }}
                        options={[
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
                        Cập nhật
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

Detail.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Detail
