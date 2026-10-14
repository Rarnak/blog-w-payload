import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      published: {
        equals: true,
      },
    },
    sort: '-createdAt',
    limit: 10,
  })

  return (
    <main>
      <h1>My Blog</h1>
      <p>Welcome to my personal blog.</p>

      <section>
        <h2>Latest Posts</h2>

        {posts.docs.length === 0 ? (
          <p>No posts published yet.</p>
        ) : (
          posts.docs.map((post) => (
            <article key={post.id}>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p>{post.excerpt}</p>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
