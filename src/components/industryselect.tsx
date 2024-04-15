import { useState, useEffect } from 'preact/hooks'
import { Industry, IndustryNum } from '../utils/jobdata'
import { Checkbox } from './textbox'
import Modal from './modal'

export default function IndustrySelect(props: {
  industry: [boolean]
  setIndustry: (arg0: number) => void
}) {
  // const [select, setSelect] = useState(new Array(16).fill(false))
  /* Width code obtained from:
   * https://stackoverflow.com/questions/62954765/how-to-do-conditional-rendering-according-to-screen-width-in-react
    const [width, setWidth] = useState(window.innerWidth)
    const [viewModal, setViewModal] = useState(false)
    const breakpoint = 700
   * */
  const industries = (
    Object.keys(Industry)
  ).map((val, key) => {
    return (
      <Checkbox
        key={key}
        id={key.toString()}
        title={Object.values(Industry)[key]} /* Do this better, this seems inefficient*/
        value={props.industry[key]}
        onClick={() => {
          props.setIndustry(key)
          console.log(props.industry, key)
        }}
        className='pb-2 pt-2'
      />
    )
  })

  /* useEffect(() => {
    const handleResizeWindow = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])
  if (width > breakpoint) {
    return (
      <div className="flex flex-col">
        <label>Industries:</label>
        {industries}
      </div>
    )
  } */
  return <div className="flex flex-col">{industries}</div>
}
