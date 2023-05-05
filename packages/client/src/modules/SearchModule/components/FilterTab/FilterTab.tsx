import { NormalizedInput } from 'globalCompontents'
import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import "./FilterTab.scss";

export function FilterTab() {
  let minimumPriceRef = useRef<HTMLInputElement | null>(null);
  let maximumPriceRef = useRef<HTMLInputElement | null>(null);
  let newConditionRef = useRef<HTMLInputElement | null>(null);
  let usedConditionRef = useRef<HTMLInputElement | null>(null);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const url = location.search
    let min_price = getQueryValues(url, "min_price")[0];
    let max_price = getQueryValues(url, "max_price")[0];
    let usedCondition = getQueryValues(url, "condition").find(e => e === "used");
    let newCondition = getQueryValues(url, "condition").find(e => e === "new");

    if (min_price && minimumPriceRef.current) minimumPriceRef.current.value = min_price;
    if (max_price && maximumPriceRef.current) maximumPriceRef.current.value = max_price;
    if (usedCondition && usedConditionRef.current) usedConditionRef.current.checked = true;
    if (newCondition && newConditionRef.current) newConditionRef.current.checked = true;
  }, [])

  return (
    <form className='white__box util-max-height-content' onSubmit={(e) => {
      e.preventDefault();

      let resultUrl = location.search.replace(/&.+/, '')

      if (minimumPriceRef.current && minimumPriceRef.current.value) resultUrl = appendQuery(resultUrl, "min_price", minimumPriceRef.current.value);
      if (maximumPriceRef.current && maximumPriceRef.current.value) resultUrl = appendQuery(resultUrl, "max_price", maximumPriceRef.current.value);
      if (newConditionRef.current && newConditionRef.current.checked) resultUrl = appendQuery(resultUrl, "condition", "new");
      if (usedConditionRef.current && usedConditionRef.current.checked) resultUrl = appendQuery(resultUrl, "condition", "used");

      setSearchParams(resultUrl);
    }}>
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
            <input type="checkbox" className='checkbox' id='checkbox-new' ref={newConditionRef} />
            <label htmlFor="checkbox-new" >New</label>
          </span>
          <span className='util-flex util-gap-md'>
            <input type="checkbox" className='checkbox' id='checkbox-used' ref={usedConditionRef} />
            <label htmlFor="checkbox-used">Used</label>
          </span>
        </div>
      </div>
      <button type='submit' className='submit-button'>
        Filter
      </button>
    </form>
  )
}

const appendQuery = (url: string, query: string, value: string) => {
  const isValueAlreadyAdded = getQueryValues(url, query).find(v => v === value);
  if (isValueAlreadyAdded) return url
  return url + `&${query}=${value}`
}

const getQueryValues = (url: string, query: string) => {
  return url.split("&").filter(p => p.startsWith(query + "=")).map((el) => el.split("=")[1]);
}