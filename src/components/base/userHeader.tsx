import React from 'react'

import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover } from 'antd'
import UserDropdown from './userDropdown'
import { UserInfo } from '@/types/user'
import { useRouter } from 'next/router'

type Prop = {
  user: UserInfo
}

const UserDesktop = (prop: Prop) => {
  const { user } = prop
  const router = useRouter()

  return (
    <div
      style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}
    >
      <Popover
        placement="bottomRight"
        // content={<UserDropdown />}
        trigger="click"
      >
        <div style={{ cursor: 'pointer' }}>
          <span>Xin chào, {user.name}</span>
          <Avatar
            style={{ marginLeft: '5px' }}
            shape="circle"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
      <div
        style={{
          paddingLeft: '1rem',
          paddingBottom: '1rem'
        }}
      >
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc là muốn đăng xuất không?"
          okText="Có"
          cancelText="Không"
          onConfirm={async () => router.push('/')}
        >
          <Button
            type="primary"
            style={{ background: '#01d28e', color: 'white' }}
          >
            <LogoutOutlined />
            ĐĂNG XUẤT
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default UserDesktop
