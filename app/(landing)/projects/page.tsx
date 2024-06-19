import { projectsData } from '@/data/mainData'
import { ProjectCard } from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
  // await delay(10000)
  const workProjects = projectsData.filter(({ type }) => type === 'work')
  const sideProjects = projectsData.filter(({ type }) => type === 'self')
  return (
    <>
      <SectionContainer>
        {/* <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {workProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div> */}

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Projects
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
              Showcase your projects
            </p>
          </div>
          <div className="container py-12">
            <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
              Work
            </h3>
            <div className="-m-4 flex flex-wrap">
              {workProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
          <div className="container py-12">
            <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
              Side Projects
            </h3>
            <div className="-m-4 flex flex-wrap">
              {sideProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
