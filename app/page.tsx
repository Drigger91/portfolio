import Portfolio from './portfolio/Portfolio'
import { getAllPosts } from './portfolio/posts'

export default function Page() {
  const posts = getAllPosts()
  return <Portfolio posts={posts} />
}
