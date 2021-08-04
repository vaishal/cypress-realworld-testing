import fs from "fs"
import matter from "gray-matter"
import Head from "next/head"
import Link from "next/link"
import path from "path"
import Layout from "../components/Layout"
import { allContentFilePaths, CONTENT_PATH } from "../utils/mdxUtils"

export default function Home({ content }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Real World Testing with Cypress</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <ul>
            {content.map((lesson) => (
              <li key={lesson.filePath}>
                <Link
                  as={`/${lesson.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/[section]/[slug]`}
                >
                  <a>{lesson.data.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  const content = allContentFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { content } }
}
