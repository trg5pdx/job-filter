import { Button } from './inputs'
import Section from './section'

export default function SavedSearches(props: {
  tempSet: String[]
  selectedSearch: String
  setSelectedSearch: (arg0: String) => void
}) {
  const SearchList = props.tempSet.map((val: String, key: number) => {
    return (
      <li key={key}>
        <div className="flex justify-between">
          {val}
          <Button
            id={`load-${key}`}
            child="Load"
            onClick={() => alert(`clicked! ${key}`)}
          />
        </div>
      </li>
    )
  })

  return (
    <Section className="p-4 pb-5 m-4 h-fit">
      <ul>{SearchList}</ul>
    </Section>
  )
}
