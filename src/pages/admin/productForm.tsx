import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { formSubmit } from 'src/libs/utils'
import { ApiReturn, Category, Product } from 'src/types/site'

export default function ProductForm({ product }: { product: Product }) {
  const [desc, descSet] = useState('')
  const [loading, loadingSet] = useState('')
  //org-C9TUfOHyE3QRlSoMdk8gtL6Q
  const sorBakalim = () => {
    console.log(product.description)
    loadingSet('loading')
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
        'OpenAI-Organization': 'org-C9TUfOHyE3QRlSoMdk8gtL6Q',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Bu ürün için uzun samimi bir tanım yaz: ' + product.name,
          },
        ],
        temperature: 0.7,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        descSet(r.choices[0].message.content)
        loadingSet('loaded')
      })
      .catch((e) => {
        loadingSet('error oldu')
        console.log(e)
      })
  }

  console.log(product)
  return (
    <form className="form flex flex-col gap-4" onSubmit={formSubmit()} action="/api/v1/product">
      <h1>{product.id ? 'Yeni' : 'Duzenleme'} Formu</h1>
      <input name="id" defaultValue={product.id} type="hidden" />
      <div className="flex">
        <label className="w32trpr4">Name</label>
        <input name="name" defaultValue={product.name} className="w-full" />
      </div>
      <div className="flex">
        <label className="w32trpr4">Description</label>
        <textarea
          name="description"
          className="h-48 w-full"
          defaultValue={product.description
            .replaceAll('&uuml;', 'ü')
            .replaceAll('&Uuml;', 'Ü')
            .replaceAll('&ouml;', 'Ü')
            .replaceAll('&Ouml;', 'Ö')
            .replaceAll('&ccedil;', 'ç')
            .replaceAll('&Ccedil;', 'Ç')}
        />
      </div>
      <div className="flex">
        <label className="w32trpr4">AI Description</label>
        <div className="border p-4 ">
          {desc}
          <a className="button" onClick={sorBakalim}>
            generate
          </a>
          {loading}
        </div>
      </div>
      <div className="flex">
        <label className="w32trpr4">Price</label>
        <input name="price" defaultValue={product.price} />
      </div>
      <input type="submit" />
    </form>
  )
}
