import { useState, useEffect } from 'preact/hooks'
import { Checkbox } from './textbox'
import { workOptions } from '../utils/query'

const checkStyle = `pt-2 pb-2`
export default function WorkChoice(props: {
  choice: workOptions[]
  setChoice: (arg0: workOptions[]) => void
}) {
  const [options, setOptions] = useState({
    remote: true,
    hybrid: true,
    inperson: true
  })

  useEffect(() => {
    props.setChoice(
      Object.entries(options)
        .filter((val) => val[1])
        .map((val) => {
          switch (val[0]) {
            case 'remote':
              return workOptions.Remote
            case 'hybrid':
              return workOptions.Hybrid
            default:
              return workOptions.InPerson
          }
        })
    )
  }, [options, props])

  return (
    <div>
      <Checkbox
        id="Remote"
        title="Remote"
        value={options.remote}
        onClick={() => {
          setOptions({
            ...options,
            remote: !options.remote
          })
        }}
        className={checkStyle}
      />
      <Checkbox
        id="Hybrid"
        title="Hybrid"
        value={options.hybrid}
        onClick={() => {
          setOptions({
            ...options,
            hybrid: !options.hybrid
          })
        }}
        className={checkStyle}
      />
      <Checkbox
        id="Inperson"
        title="Inperson"
        value={options.inperson}
        onClick={() => {
          setOptions({
            ...options,
            inperson: !options.inperson
          })
        }}
        className={checkStyle}
      />
    </div>
  )
}
