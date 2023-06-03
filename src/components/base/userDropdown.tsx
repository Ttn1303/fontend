import { useRouter } from 'next/router'

import { LockOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

const UserDropdown = () => {
  const router = useRouter()

  return (
    <div style={{ width: '300px', background: 'white' }}>
      {/* Menu */}
      <div
        style={{
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#F7F8FA'
        }}
      >
        <div>
          <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <Button
              type="link"
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => router.push('/user/change-password')}
            >
              <LockOutlined style={{ color: '#0080FF' }} />
              <span>Thay đổi mật khẩu</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Logout button */}
      <div
        style={{
          paddingLeft: '1rem',
          paddingBottom: '1rem',
          paddingTop: '1rem'
        }}
      >
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc là muốn đăng xuất không?"
          okText="Có"
          cancelText="Không"
          onConfirm={async () => router.push('/')}
        >
          <Button style={{ background: '#2EA7F5', color: 'white' }}>
            <LogoutOutlined />
            ĐĂNG XUẤT
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default UserDropdown
