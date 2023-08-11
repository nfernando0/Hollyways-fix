import { FormatRupiah } from '@arismun/format-rupiah'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'

function MyRaiseFundComponent(funds) {

  // const hitungTotalBayar = funds.funds.donate_amount
  // console.log(hitungTotalBayar)

  // const totalDonasi = hitungTotalBayar.reduce(function (result, item) {
  //   return result + item.donate_amount
  // }, 0)





  return (
    <div>
      <Card className='mb-2'>
        <Card.Body>
          <h5>{funds.funds.user.fullname}</h5>
          <p>Saturday, 10 August 2023</p>
          <p style={{ color: 'var(--bg)' }} className='fw-bold'>Total:
            {<FormatRupiah value={funds.funds.donate_amount} />}
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MyRaiseFundComponent