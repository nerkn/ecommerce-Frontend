import { Dispatch, useEffect, useState } from 'react'
import { PaymentType } from 'src/types/site'

export function Payment({ paymentSet }: { paymentSet: Dispatch<React.SetStateAction<PaymentType>> }) {
  const [activePM, activePMSet] = useState(1)
  function setPayment(method: string) {
    return () => paymentSet({ paid: true, method })
  }

  return (
    <div className="Payments">
      <dl>
        <dt onClick={() => activePMSet(1)}>Kredi Karti</dt>
        <dd className={activePM == 1 ? 'grid' : 'hidden'}>
          <p>Tüm kredi kartları ile ödeme yapabilirsiniz</p>
          <a href="" className="disabled">
            Kredi Kartı ile şimdi öde
          </a>
        </dd>
        <dt onClick={() => activePMSet(2)}>Havale</dt>
        <dd className={activePM == 2 ? 'grid' : 'hidden'}>
          Havale
          <p>
            <b>IBAN</b> TR1234 5678 9012 2434 4556
            <br /> Turkiye IS Bankasi
          </p>
          <a onClick={setPayment('IsBankasi')}>Ödeme yaptım</a>
        </dd>
        <dt onClick={() => activePMSet(3)}>Cep Havale</dt>
        <dd className={activePM == 3 ? 'grid' : 'hidden'}>
          Garanti Bankasi:{' '}
          <span>
            <a href="tel:+90 543 987 65 43">+90 543 987 65 43</a>
          </span>
          <a onClick={setPayment('Garanti Cep')}>Ödeme yaptım</a>
        </dd>
      </dl>
    </div>
  )
}
