import { NormalizedInput } from 'globalCompontents'
import React, { useRef } from 'react'

import "./FilterTab.scss";

export function FilterTab() {
  let minimumPriceRef = useRef<HTMLInputElement | null>(null);
  let maximumPriceRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='white__box util-max-height-content'>
      <div>
        <h4 className='header header-md'>Price(PLN)</h4>
        <span className='util-flex util-gap-xl'>
          <NormalizedInput ref={minimumPriceRef} placeholder='from' />
          <NormalizedInput ref={maximumPriceRef} placeholder='to' />
        </span>
      </div>
      <div>
        <h4 className='header header-md util-pb-xl'>Condition</h4>
        <div className='util-flex util-flex-column util-gap-md'>
          <span className='util-flex util-gap-md'>
            <input type="checkbox" className='checkbox' id='checkbox-used'/>
            <label htmlFor="checkbox-used">New</label>
          </span>
          <span className='util-flex util-gap-md'>
            <input type="checkbox" className='checkbox' id='checkbox-used'/>
            <label htmlFor="checkbox-used">Used</label>
          </span>
        </div>
      </div>
    </div>
  )
}
