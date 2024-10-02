import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'preact/hooks'
import { Button, Input } from './inputs'
import Section from './section'
import { Query } from 'src/utils/query'

interface searchID {
  name: string
  uuid: string
}

export default function SavedSearches(props: {
  query: Query
  setQuery: (arg0: Query) => void
}) {
  const [saveName, setSaveName] = useState<string>('')
  const [savedSearches, setSavedSearches] = useState<searchID[]>([])
  const button_style = 'h-fit w-fit ml-2 justify-self-end'

  const deleteSearch = (list: searchID[], key: number): searchID[] => {
    if (list.length == 0) {
      return []
    }

    let new_list = []
    let index = list.length - 1

    while (list.length > 0) {
      let val = list.pop()
      if (index != key) {
        new_list.push(val)
      }
      --index
    }

    return new_list
  }

  const SearchList = (list: searchID[]) =>
    list.map((val: searchID, key: number) => {
      return (
        <li className="flex justify-between mb-2" key={key}>
          <div className="hyphens-auto col-span-2">{val.name}</div>
          <div className="flex">
            <Button
              id={`load-${key}`}
              child="Load"
              className={button_style}
              onClick={() => {
                let new_query = JSON.parse(localStorage.getItem(val.uuid))
                props.setQuery(new_query)
              }}
            />
            <Button
              id={`delete-${key}`}
              child="Delete"
              className={button_style}
              onClick={() => setSavedSearches(deleteSearch(list, key))}
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
      <div className="flex flex-nowrap justify-between items-end mb-2">
        <Input
          id="saveName"
          value={saveName}
          inputType="text"
          className="w-full"
          onChange={(e) => {
            let val = e.target as HTMLInputElement
            setSaveName(val.value)
          }}
        />
        <Button
          id="saveSearch"
          child="Save"
          type="button"
          className={button_style}
          onClick={() => {
            let uuid: string = uuidv4()
            setSavedSearches([...savedSearches, { name: saveName, uuid }])
            localStorage.setItem(uuid, JSON.stringify(props.query))
          }}
        />
      </div>
      <ul>{SearchList(savedSearches)}</ul>
    </Section>
  )
}
