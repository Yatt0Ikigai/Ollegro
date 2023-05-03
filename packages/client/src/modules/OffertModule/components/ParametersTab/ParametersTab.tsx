import React from 'react'

import "./ParametersTab.scss";

export function ParametersTab() {
  return (
    <div className='white__box'>
        <h4 className='header header-xl'>
          Params
        </h4>
      <div className=''>
        <table className='table util-w-full'>
          {staticParams.map((param) => {
            return(
              <tr className='table-row'>
                <td className='table-header'>{param.header}</td>
                <td className='table-value'>{param.value}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

const staticParams = [{ header: "Condition", value: "New" }, { header: "Material", value: "plastic" }, { header: "Gender", value: "Boys, Girls" }]