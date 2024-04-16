import { DescriptionBody, Header, List, Body } from '../utils/jobdata'

export function Description(props: { test: string }) {
  const test = new DescriptionBody('test')

  const selectHeadingLevel = (data: Heading) => {
    switch (data.level) {
      case 1:
        return <h1>{data.title}</h1>
      case 2:
        return <h2>{data.title}</h2>
      case 3:
        return <h3>{data.title}</h3>
      case 4:
        return <h4>{data.title}</h4>
      case 5:
        return <h5>{data.title}</h5>
      default:
        return <h6>{data.title}</h6>
    }
  }

  const processedText = (tags: [Header | List | Body]) => {
    return tags.map((val: Header | List | Body) => {
      switch (val.variant) {
        case 'Header':
          return selectHeadingLevel(val)
        case 'List':
          return (
            <ul className="list-disc p-2">
              {val.title}
              {val.children.map((val) => {
                switch (typeof val) {
                  case 'string':
                    return <li className="ml-2">{val}</li>
                  default:
                    return <li>{processedText(val.children)}</li>
                }
              })}
            </ul>
          )
        default:
          return <p>{val.paragraph}</p>
      }
    })
  }

  // console.log(processedText(test))

  return <div>{processedText(test.tags)}</div>
}
