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

export const t = (e: string) => e
