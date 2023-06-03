import { Col } from 'antd'

type Props = {
  title: string
  content: string | number
}

const DetailInfo = (props: Props) => {
  const { title, content } = props

  return (
    <>
      <Col
        span={2}
        style={{
          color: '#858585',
          fontSize: '1 rem',
          margin: 10
        }}
      >
        {title}:
      </Col>
      <Col span={5} style={{ fontSize: '1.1rem' }}>
        {content}
      </Col>
    </>
  )
}

export default DetailInfo
