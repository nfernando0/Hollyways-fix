import { FormatRupiah } from '@arismun/format-rupiah'
import React from 'react'
import { Card } from 'react-bootstrap'

function MyRaiseFundComponent(funds) {


  return (
    <div>
      <Card className='w-100 gap-2 mb-2'>
        <Card.Body>
          <h5>{funds?.funds?.user?.username}</h5>
          <p style={{ color: 'var(--bg)' }}>Total:
            {<FormatRupiah value={funds?.funds?.donate_amount} />}
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MyRaiseFundComponent