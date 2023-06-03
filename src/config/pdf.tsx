import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  // page: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   backgroundColor: 'white'
  // },
  section: {
    margin: 10,
    padding: 10
    // flexGrow: 1
  },
  head: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  image: {
    display: 'flex',
    width: '300px',
    height: '300px'
  },
  table: {
    border: '1px solid'
  }
})

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4">
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'white'
        }}
      >
        <View >
          {/* <Image src="/images/logo.jpg" style={styles.image} /> */}
          <Text>
            <p style={styles.head}>GARAGE - N&N</p>
            <p>Địa chỉ: Long Biên, Long Biên, Hà Nội</p>
            <p>ĐT: 0985 489 409</p>
            <p style={styles.head}>Hóa đơn sửa chữa - bảo dưỡng</p>
          </Text>
        </View>
      </View>
      {/* <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
        <table style={{ width: '100%' }}>
          <tr>
            <th>Thông tin xe</th>
            <th>Thông tin khách hàng</th>
            <th>Mã phiếu:</th>
            <th>{}</th>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
        </table>
        <Table
        columns={tablePDF}
        // dataSource={listRepair}
        size="middle"
        pagination={false}
        bordered={true}
      />
      </View> */}
    </Page>
  </Document>
)

export default MyDocument
