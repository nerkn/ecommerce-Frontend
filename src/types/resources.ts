import translation from '../i18n/locales/en/translation.json'
import notfound from '../i18n/locales/en/notfound.json'
import { BlogType, OrderProducts, Orders, UserAddress } from './db'
import { newDate } from 'src/lib/newDate'

const resources = {
  notfound,
  translation,
} as const

export default resources

export const noAddress:UserAddress = {
  id:0,
  title:'Başlık',
  address:'',
  city:'Antalya',
  detail:'',
  orderby:99
}
export const noOrders: Orders = {
  id: 0,
  address: '',
  commentUser: '',
  discount: 0,
  status: 'process',
  user: 0,
  total: 0,
  createdAt: newDate(),
  modifiedAt: newDate(),
  paymentMethod: '',
  paymentStatus:'',
  cargo: '',
  comment:'',
}
export const noOrderProducts: OrderProducts = {
  id: 0,
  options: '',
  order: 0,
  quantity: 0,
  status: 'process', 
  user: 0,
  price: 0,
  product:0
}
export const noBlog: BlogType = {
  id: 0,
  title: '',
  short: '',
  long: '',
  slug: '',
  status: 'draft',
  createdAt: newDate(),
  updatedAd: newDate()
}