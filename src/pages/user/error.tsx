import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { Button, Result } from 'antd'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { code } = router.query

  const getErrorCode = () => {
    switch (code) {
      case '404':
        return '404'
      case '403':
        return '403'
      default:
        return '500'
    }
  }

  const getErrorMessage = () => {
    switch (code) {
      case '404':
        return 'Trang không tồn tại'
      case '403':
        return 'Bạn không có quyền truy cập trang này'
      default:
        return 'Lỗi không xác định'
    }
  }

  return (
    <>
      <Result
        status={getErrorCode()}
        title={getErrorCode()}
        subTitle={getErrorMessage()}
        extra={
          <Button type="primary" onClick={() => router.push('/user')}>
            Về trang chính
          </Button>
        }
      />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
