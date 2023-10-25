import { useEffect, useState } from 'react'
import { useParams } from 'wouter'
import snarkdown from 'snarkdown'
import { fetchX } from 'src/libs/fetchx'
import { BlogType } from 'src/types/db'
import { noBlog } from 'src/types/resources'

export function BlogPage() {
  let { slug } = useParams()
  let [blog, blogSet] = useState<BlogType>(noBlog)
  useEffect(() => {
    fetchX('blog?where=slug,eq,' + slug).then((r) => (r.length ? blogSet(r[0]) : ''))
  }, [slug])
  return (
    <>
      <h3>{blog.title}</h3>
      <p>{blog.short}</p>
      <div dangerouslySetInnerHTML={{ __html: snarkdown(blog.long) }}></div>
    </>
  )
}
