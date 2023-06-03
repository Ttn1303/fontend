import React, { ReactElement, useEffect, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import { Chart } from '@/config/chart'
import { repairService } from '@/services/repair'

const Page: NextPageWithLayout = () => {
  const [sale, getSale] = useState<number[]>([])
  const fetchSales = async () => {
    const sales = await repairService.getSales()
    if (sales) getSale(sales)
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return (
    <div style={{ display: 'flex', width: '900px', height: '900px' }}>
      <Chart sales={sale}/>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
