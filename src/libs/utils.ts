import { type ClassValue, clsx } from 'clsx'
import { FormEventds } from 'src/types/db'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return inputs.join(', ')
}
export function cn2(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formSubmit(callback = console.log, error = () => {}) {
  return (event: FormEventds) => {
    event.preventDefault()
    console.log('formSubmitting', event)
    let emptyRec: Record<string, any> = {}
    let fields2Save = [...event.target.elements].reduce((a, e) => {
      if (e.name) if (e.value && e.value != '0') a[e.name as string] = e.value
      return a
    }, emptyRec)
    console.log('savnig  object', fields2Save)
    fetch(event.target.action, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields2Save),
    })
      .then(callback)
      .catch(error)
  }
}
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const t = (e: string) => e

export function onClickViewTX(
  elem2TX: string,
  TXName: string,
  navigate: {
    (to: string, options?: { replace?: boolean | undefined } | undefined): void
  },
) {
  return (e: { preventDefault: () => void; currentTarget: any }) => {
    e.preventDefault()
    let element = e.currentTarget
    if (!element.querySelector(elem2TX))
      return console.log('element cant found in element', element, 'selector;', elem2TX)
    console.log('element  found in element', element, 'selector;', elem2TX)
    element.querySelector(elem2TX).style.viewTransitionName = TXName
    let tx = document.startViewTransition(async () => {
      console.log('going to', element.href)
      navigate(element.href)
      await wait(200)
    })
  }
}
