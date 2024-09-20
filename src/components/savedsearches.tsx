import { useEffect, useState } from 'preact/hooks'
import { Button, Input } from './inputs'
import Section from './section'

export default function SavedSearches(props: {
  selectedSearch: String
  setSelectedSearch: (arg0: String) => void
}) {
  const [saveName, setSaveName] = useState<string>('')
  const [savedSearches, setSavedSearches] = useState<string[]>([])
  const SearchList = (list: string[]) =>
    list.map((val: String, key: number) => {
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

  useEffect(() => {
    let set = JSON.parse(localStorage.getItem('savedSearches'))
    setSavedSearches(set)
  }, [])

  useEffect(() => {
    console.log(savedSearches)
    console.log(JSON.stringify(savedSearches))
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches))
    console.log(localStorage)
  }, [savedSearches])

  return (
    <Section className="p-4 pb-5 m-4 h-fit">
      <div>
        <Input
          id="saveName"
          value={saveName}
          inputType="text"
          onChange={(e) => {
            let val = e.target as HTMLInputElement
            setSaveName(val.value)
          }}
        />
        <Button
          id="saveSearch"
          child="Save"
          type="button"
          onClick={() => {
            setSavedSearches([...savedSearches, saveName])
          }}
        />
      </div>
      <ul>{SearchList(savedSearches)}</ul>
    </Section>
  )
}
