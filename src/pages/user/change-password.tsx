import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input } from 'antd'
import axios from 'axios'
import type { NextPageWithLayout } from '@/types/next-page'
import { ChangePasswordPayload } from '@/types/auth'
import User from '@/components/layouts/user'
import { AuthService } from '@/services/auth'

const ChangePassword: NextPageWithLayout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ChangePasswordPayload) => {
    setLoading(true)
    try {
      await AuthService.changePassword(values)
      console.log(values)
      router.push('/user')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <div
        style={{
          marginTop: 35,
          width: '25%'
        }}
      >
        <h2 className="homepage-title">Thay đổi mật khẩu</h2>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item label="Mật khẩu cũ" name="old_password">
            <Input.Password />
          </Form.Item>

          <Form.Item label="Mật khẩu mới" name="new_password">
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="new_password_confirmation"
          >
            <Input.Password />
          </Form.Item>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default ChangePassword
