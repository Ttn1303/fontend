import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Checkbox, Form, Input } from 'antd'
import type { NextPageWithLayout } from '@/types/next-page'
import Landing from '@/components/layouts/landing'
import { LoginPayload } from '@/types/auth'
import { AuthService } from '@/services/auth'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const userLocalInfo = useLocalStorage<UserInfo>('user', null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: LoginPayload) => {
    try {
      setLoading(true)
      const response = await AuthService.login(values)
      if (response[0].role === 'staff') {
        notificationError('Bạn không có quyền truy cập vào website này')
        router.push('/')
      } else {
        userLocalInfo[1]({ ...response[0] })
        notificationSuccess('Đăng nhập thành công!')
        if (response[0].role === 'admin') {
          router.push('/user')
        } else router.push('/user/repair')
      }
    } catch {
      notificationError('Tài khoản hoặc mật khẩu không đúng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'block',
        padding: '15em 0',
        background: '#f8f9fd'
      }}
    >
      <div
        style={{
          height: '100vh',
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
            margin: '0 -15px',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              padding: '0 15px',
              flexBasis: '83%',
              maxWidth: '83%'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                background: '#fff',
                borderRadius: '5px',
                boxShadow: '0px 10px 34px -15px rgba(0, 0, 0, 0.24)'
              }}
            >
              <div
                style={{ position: 'relative', padding: '3rem', width: '50%' }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>
                    Đăng Nhập
                  </h3>
                </div>
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
                      { required: true, message: 'Vui lòng nhập password!' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Button
                    style={{
                      width: '100%',
                      background: '#01d28e',
                      color: 'white',
                      border: '1px solid #01d28e'
                    }}
                    size="large"
                    type="text"
                    htmlType="submit"
                    loading={loading}
                  >
                    Đăng nhập
                  </Button>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Form.Item
                      style={{ marginTop: '20px' }}
                      name="remember"
                      valuePropName="checked"
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/* <a href="#">Quên mật khẩu</a> */}
                  </div>
                </Form>
              </div>
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  padding: '3rem',
                  width: '50%',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  alignItems: 'center',
                  color: 'white',
                  background: '#01d28e',
                  fontSize: '17px'
                }}
              >
                <div style={{ width: '100%' }}>
                  <h2
                    style={{
                      fontWeight: 800,
                      fontSize: '2rem',
                      lineHeight: 1.5
                    }}
                  >
                    Chào mừng đến với trang đăng nhập
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Login
