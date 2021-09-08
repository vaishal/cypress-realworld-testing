import fs from "fs"
import matter from "gray-matter"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Head from "next/head"
import dynamic from "next/dynamic"
import path from "path"
import glob from "glob"
import { find, findIndex } from "lodash/fp"
import { useActor } from "@xstate/react"
import rehypeSlug from "rehype-slug"
import rehypePrism from "@mapbox/rehype-prism"
import { progressService } from "../../machines/progressService"
import Layout from "../../components/Layout"
import LessonHero from "../../components/RealWorldExamples/Lesson/LessonHero"
import LessonLayout from "../../components/RealWorldExamples/Lesson/LessonLayout"
const NextLessonBtn = dynamic(
  () => import("../../components/RealWorldExamples/Lesson/NextLessonBtn"),
  {
    ssr: false,
  }
)
import {
  LessonTableOfContents,
  MultipleChoiceChallenge,
  FreeFormChallenge,
} from "../../types/common"
import {
  REAL_WORLD_EXAMPLES_PATH,
  allRealWorldExamplesFilePaths,
  getToCForMarkdown,
  getRealWorldExamplePath,
} from "../../utils/mdxUtils"
import { isLessonCompleted } from "../../utils/machineUtils"
import rweJson from "../../real-world-examples.json"

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  //a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  //TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    [key: string]: any
  }
  toc: LessonTableOfContents[]
  lessonData: {
    title: string
    slug: string
    description: string
    status: string
    videoURL: string
    challenges: MultipleChoiceChallenge[] | FreeFormChallenge[]
  }
  sectionLessons: []
  nextLesson: string
  sectionTitle: string
  lessonPath: string
  rweJson: object
  sections: []
}

export default function LessonPage({
  source,
  toc,
  lessonData,
  sectionLessons,
  nextLesson,
  sectionTitle,
  lessonPath,
  rweJson,
  sections,
}: Props) {
  // TODO: Figure out a better way to do this. It is necessary for the UI to update when state changes.
  const [progressState] = useActor(progressService)

  return (
    <Layout content={rweJson} sections={sections}>
      <Head>
        <title>{lessonData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {lessonData.videoURL && <LessonHero lessonData={lessonData} />}

      <LessonLayout
        toc={toc}
        source={source}
        components={components}
        sectionLessons={sectionLessons}
        sectionTitle={sectionTitle}
        progressService={progressService}
        lessonPath={lessonPath}
      />

      <NextLessonBtn
        path={nextLesson}
        isCompleted={isLessonCompleted(progressService, lessonPath)}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const sections = Object.keys(rweJson)
  const contentFilePath = getRealWorldExamplePath(
    path.join(REAL_WORLD_EXAMPLES_PATH, `/**/${params.slug}.mdx`)
  )
  const realWorldExampleDirectory = path.dirname(contentFilePath[0]).split("/")
  const section =
    realWorldExampleDirectory[realWorldExampleDirectory.length - 1]

  const source = fs.readFileSync(contentFilePath[0])
  const { content, data } = matter(source)
  const toc: LessonTableOfContents[] = getToCForMarkdown(content)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      // @ts-ignore
      rehypePlugins: [rehypeSlug, rehypePrism],
    },
    scope: data,
  })
  const lessonData = find({ slug: params.slug }, rweJson[section].lessons)
  const { title, lessons } = rweJson[section]

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      toc,
      lessonData,
      sectionLessons: lessons,
      sectionTitle: title,
      lessonPath: `${section}/${params.slug}`,
      rweJson,
      sections,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = allRealWorldExamplesFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((filePath) => {
      const [section, slug] = filePath.split("/")
      return { params: { slug, section } }
    })

  return {
    paths,
    fallback: false,
  }
}