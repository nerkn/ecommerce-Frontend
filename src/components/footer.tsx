import { Facebook, Github, Instagram, Twitter } from "lucide-react"


function FooterLink ({href, text}:{href:string, text:string}){
    return <li className="mb-4">
            <a href={href} className="hover:underline">{text}</a>
            </li>
}



export function Footer(){


    return <footer className="py-4 bg-white sm:py-6 dark:bg-gray-800">
    <div className="">
        <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
                <a href="https://flowbite.com" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <FooterLink href="/" text='Anasayfa' />
                        <FooterLink href="/" text='Anasayfa' />
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <FooterLink href="/ust-giyim" text='Son Bahar Icin' />
                        <FooterLink href="/cocuklar" text='Çocuklara elbise' />
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <FooterLink href='/blog/gizlilik' text='Gizlilik Sözleşmesi' />
                        <FooterLink href='/blog/kurallar' text='Kurallar ve Koşullar' />
                    </ul>
                </div>
            </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com" className="hover:underline">Flowbite™</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
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
}