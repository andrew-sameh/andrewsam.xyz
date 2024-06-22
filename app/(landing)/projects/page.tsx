import { projectsData } from '@/data/mainData'
import { ProjectCard } from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
import { Separator } from '@/components/ui/separator'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
  // await delay(10000)
  const workProjects = projectsData.filter(({ type }) => type === 'work')
  const sideProjects = projectsData.filter(({ type }) => type === 'self')
  return (
    <>
      <SectionContainer>
        <div className="">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Projects
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
              Some of my the stuff I have worked on.
            </p>
          </div>
          <Separator />
          <div className="py-12">
            <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight">Work</h3>
            <div className="-m-4 grid grid-cols-1 gap-2 md:grid-cols-2">
              {workProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
          <Separator />
          <div className=" py-12">
            <h3 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight">Side Projects</h3>
            <div className="-m-4 grid grid-cols-1 gap-2 md:grid-cols-2">
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
