import translation from '../i18n/locales/en/translation.json'
import notfound from '../i18n/locales/en/notfound.json'
import { UserAddress } from './site'

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