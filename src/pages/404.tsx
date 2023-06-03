import { ReactElement } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Row } from 'antd'

import Landing from '@/components/layouts/landing'

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <Row style={{ background: 'white' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 16, offset: 4 }}
        lg={{ span: 18, offset: 3 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <div
          style={{
            color: '#00264D',
            paddingTop: '3rem',
            paddingBottom: '3rem',
            height: '65vh'
          }}
        >
          <p
            style={{
              fontSize: '1.5rem',
              lineHeight: '2rem',
              fontWeight: 'bold'
            }}
          >
            404 - Page not found
          </p>
        </div>
      </Col>
    </Row>
  )
}

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default NotFoundPage
