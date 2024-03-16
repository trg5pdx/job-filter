import { useState, useEffect } from 'preact/hooks'
import { Industry } from '../utils/jobdata'
import { Checkbox } from './textbox'
import Modal from './modal'

export default function IndustrySelect(props: {
  industry: [bool]
  setIndustry: (number) => void
}) {
  const [select, setSelect] = useState(new Array(16).fill(false))
  /* Width code obtained from:
   * https://stackoverflow.com/questions/62954765/how-to-do-conditional-rendering-according-to-screen-width-in-react
   * */
  const [width, setWidth] = useState(window.innerWidth)
  const [viewModal, setViewModal] = useState(false)
  const breakpoint = 700
  const industries = (
    Object.keys(Industry) as Array<keyof typeof Industry>
  ).map((val, key) => {
    return (
      <Checkbox
        id={key}
        title={Industry[val]}
        value={props.industry[key]}
        onClick={() => {
          props.setIndustry(key)
        }}
      />
    )
  })

  console.log(typeof industries)

  useEffect(() => {
    const handleResizeWindow = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])
  /* if (width > breakpoint) {
    return (
      <div className="flex flex-col">
        <label>Industries:</label>
        {industries}
      </div>
    )
  } */
  return <div className="flex flex-col">{industries}</div>
}
