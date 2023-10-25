import React from 'react'
import { Header } from '../header'
import { Footer } from '../footer'

export const LayoutGetNone = (page: React.ReactElement) => page

export function LayoutGetDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-min-screen  mx-auto 2xl:w-[1400px]">
      <Header />
      <div className="mt-16 border-cyan-500 ">{children}</div>
      <Footer />
    </div>
  )
}
