import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Image, Layout, Menu, MenuProps } from 'antd'
import {
  AreaChartOutlined,
  BankOutlined,
  FileSearchOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  UserOutlined
} from '@ant-design/icons'
import UserDesktop from '../base/userHeader'
import useLocalStorage from '@/hooks/localStorage'
import { UserInfo } from '@/types/user'

type LayoutProps = {
  children: React.ReactNode
}

export default function User({ children }: LayoutProps) {
  const { Header, Sider } = Layout
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const userLocalInfo = useLocalStorage<UserInfo>('user', null)
  const user = userLocalInfo[0]

  const menuItems: MenuProps['items'] = [
    {
      type: 'group',
      label: 'Quản lý',
      children: [
        {
          key: '/user',
          icon: <AreaChartOutlined />,
          label: 'Dashboard'
        },
        {
          key: '/user/accessary',
          icon: <ToolOutlined />,
          label: 'Danh sách phụ tùng'
        },
        {
          key: '/user/repair',
          icon: <FileSearchOutlined />,
          label: 'Phiếu sửa chữa'
        },
        {
          key: '/user/staff',
          icon: <UserOutlined />,
          label: 'Nhân sự'
        },
        {
          key: '/user/history',
          icon: <HistoryOutlined />,
          label: 'Lịch sử nhập hàng'
        }
      ]
    },
    {
      type: 'group',
      label: 'Thống kê',
      children: [
        {
          key: '/user/sales',
          icon: <BankOutlined />,
          label: 'Doanh thu'
        }
        // {
        //   key: '/user/inventory',
        //   icon: <HomeOutlined />,
        //   label: 'Tồn kho'
        // }
      ]
    }
  ]
  const menuItems1: MenuProps['items'] = [
    {
      type: 'group',
      label: 'Quản lý',
      children: [
        {
          key: '/user/accessary',
          icon: <ToolOutlined />,
          label: 'Danh sách phụ tùng'
        },
        {
          key: '/user/repair',
          icon: <FileSearchOutlined />,
          label: 'Phiếu sửa chữa'
        },
        {
          key: '/user/history',
          icon: <HistoryOutlined />,
          label: 'Lịch sử nhập hàng'
        }
      ]
    },
    {
      type: 'group',
      label: 'Thống kê',
      children: [
        {
          key: '/user/sales',
          icon: <BankOutlined />,
          label: 'Doanh thu'
        }
      ]
    }
  ]

  const menuOnClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key || '/')
  }

  return (
    <>
      <Head>
        <title>N&N - Cửa hàng sửa chữa xe máy</title>
        <meta name="title" content="N&N - Cửa hàng sửa chữa xe máy" />
        <meta name="description" content="N&N - Cửa hàng sửa chữa xe máy" />
      </Head>
      <main>
        <Layout className="layout">
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <Image
              onClick={() =>
                user.role === 'admin'
                  ? router.push('/user')
                  : router.push('/user/repair')
              }
              style={{ padding: '1rem', width: '100%', cursor: 'pointer' }}
              preview={false}
              src="/images/logo.jpg"
            />
            <Menu
              mode="inline"
              items={user.role === 'admin' ? menuItems : menuItems1}
              defaultSelectedKeys={[router.pathname]}
              onClick={menuOnClick}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                position: 'sticky',
                top: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 0,
                zIndex: 50,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px'
              }}
            >
              <div>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed)
                  }
                )}
              </div>
              <UserDesktop user={user} />
            </Header>
            {children}
          </Layout>
        </Layout>
      </main>
    </>
  )
}
