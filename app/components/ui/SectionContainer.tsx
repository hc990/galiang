import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-2 sm:px-6 md:max-w-4xl xl:max-w-5xl xl:px-0">{children}</section>
  )
 
}
