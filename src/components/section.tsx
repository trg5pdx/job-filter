import { ComponentChildren } from 'preact'

export default function Section(props: {
  className?: string
  children: ComponentChildren
}) {
  return (
    <section
      className={`dark:bg-primary-900 bg-primary-300 dark:text-white 
       text-black rounded-xl border-2 
       dark:border-secondary-500 border-secondary-900 ${props.className}`}
    >
      {props.children}
    </section>
  )
}
