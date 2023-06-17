import React from 'react'

import "./ParametersTab.scss";

export function ParametersTab({
  condition
}: {
  condition: string
}) {
  return (
    <div className='white-box'>
      <h4 className='header header-xl'>
        Params
      </h4>
      <div className=''>
        <table className='table util-w-full'>
          <tbody>
            <tr className='table-row'>
              <td className='table-header'>Condition</td>
              <td className='table-value'>{condition}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
