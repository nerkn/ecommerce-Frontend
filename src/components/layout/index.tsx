import React from 'react'
import { Header } from '../header' 
import { Footer } from '../footer'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="h-min-screen w-[1400px] mx-auto">
      <Header />
      <div className='mt-24 border-cyan-500 '>
      {page}
      </div>
      <Footer />
    </div>
  )
}
