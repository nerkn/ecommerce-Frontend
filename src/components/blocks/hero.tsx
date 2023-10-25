import { useEffect, useState } from 'react'
import { GenSiteInfo } from 'src/hooks/genSiteInfo'

export function Hero() {
  const [randomPhoto, randomPhotoSet] = useState('/i/front.webp')
  const { hero } = GenSiteInfo((s) => ({ hero: s.hero }))
  /*
  useEffect(() => {
    fetch('/api2/unsplash')
      .then((r) => r.json())
      .then((r) => randomPhotoSet(r))
  }, [])
  console.log(randomPhoto)
  */
  return (
    <section className="bg-white dark:bg-gray-900">
      <div
        className="relative h-[400px] overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(${randomPhoto})`, fontSize: '12px' }}
      >
        <div className="mr-auto place-self-center lg:col-span-7" style={{ backgroundColor: `rgba(250,250,250,.6)` }}>
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            {hero.title}
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            {hero.desc}
          </p>
          <a
            href="#"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Speak to Sales
          </a>
        </div>
      </div>
    </section>
  )
}
