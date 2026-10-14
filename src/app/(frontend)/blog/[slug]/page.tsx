import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          published: {
            equals: true,
          },
        },
      ],
    },
    limit: 1,
  })
  const post = result.docs[0]
  const date = post.createdAt.split('T')[0]
  !post && notFound()
  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <h2>{date}</h2>
        <p>{post.content}</p>
      </article>
    </main>
  )
}
