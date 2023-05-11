import React from 'react'
import { Link } from 'react-router-dom'

export function SeeTab() {
  return (
    <div className='white-box'>
      <h4 className='header header-xl'>
        See
      </h4>
      <div className='util-flex util-flex-column util-gap-sm'>
        <Link to="/" className='link util-border-between util-pb-sm'>All seller's items</Link>
        <Link to="/" className='link util-border-between util-pb-sm'>Ask a question </Link>
      </div>
    </div>
  )
}