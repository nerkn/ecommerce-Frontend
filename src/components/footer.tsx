import { Facebook, Github, Instagram, LucideAlarmClockOff, LucideLampDesk, Twitter } from 'lucide-react'

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li className="mb-4">
      <a href={href} className="hover:underline">
        {text}
      </a>
    </li>
  )
}

export function Footer() {
  return (
    <footer className="bg-white p-2 py-4 dark:bg-gray-800 sm:py-6">
      <div className="">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a className="flex items-center">
              <LucideLampDesk scale={2} />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Sitem</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Resources</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <FooterLink href="/" text="Anasayfa" />
                <FooterLink href="/" text="Anasayfa" />
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Follow us</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <FooterLink href="/ust-giyim" text="Son Bahar Icin" />
                <FooterLink href="/cocuklar" text="Çocuklara elbise" />
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <FooterLink href="/b/gizlilik" text="Gizlilik Sözleşmesi" />
                <FooterLink href="/b/kurallar" text="Kurallar ve Koşullar" />
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2022{' '}
            <a href="https://flowbite.com" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Facebook />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Instagram />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Twitter />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Github />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
