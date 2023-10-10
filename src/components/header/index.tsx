import React, { ReactNode } from 'react'
import { LanguageSelector } from '../language-selector'
import { Button } from '../ui/button' 
import { Github } from 'lucide-react'
import { NavigationMenuDemo } from './menu'
import { Link } from 'react-router-dom'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) { 

  return (
    <>
    <div className="fixed top-0 flex w-[1400px] items-center justify-between border bg-slate-50 bg-opacity-70 px-4 py-4 md:px-12 z-30 ">
      <Link to="/" className="text-xs md:text-base">
        Dükkanım
      </Link>
    <NavigationMenuDemo />
      <div className="flex items-center gap-4">
        {/*<LanguageSelector />*/}
        <Button size={'icon'} asChild className="rounded-full">
          <Link to="https://github.com/Quilljou/vite-react-ts-tailwind-starter" target="_blank" rel="noreferrer">
            <Github />
          </Link>
        </Button>
      </div>
    </div>
    
    </>
  )
}
