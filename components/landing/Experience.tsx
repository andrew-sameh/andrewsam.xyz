import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { skillsData } from '@/data/mainData'
import IconsBundle from '../social-icons'
import { experienceData, type Experience, type TechStackType } from '@/data/mainData'
import {
  Timeline,
  TimelineItemDescription,
  TimelineItemSmallText,
  TimelineItemDateRange,
  type TimelinePropsItem,
} from '@/components/ui/timeline'

function TechnologyIcons({ technologies }: { technologies: TechStackType[] }) {
  return (
    <div className="flex flex-wrap items-center space-x-2 pt-1 text-xs">
      <span className="mr-2">Technologies used:</span>
      {technologies.map((tech, index) => (
        <IconsBundle
          key={index}
          kind={tech.name.toLowerCase()}
          size={4}
          iconType="link"
          href={tech.href}
        />
      ))}
    </div>
  )
}

function createTimelineItems(experiences: Experience[]): TimelinePropsItem[] {
  return experiences.map((experience) => ({
    title: experience.title,
    children: (
      <>
        <TimelineItemSmallText>{experience.roleType}</TimelineItemSmallText>
        <TimelineItemDateRange
          startDate={new Date(experience.startDate)}
          endDate={experience.endDate ? new Date(experience.endDate) : undefined}
        />
        <TimelineItemDescription>{experience.description}</TimelineItemDescription>
        {experience.techStack && <TechnologyIcons technologies={experience.techStack} />}
      </>
    ),
    isActive: experience.active,
    isActiveBullet: experience.active,
  }))
}

export function Experience() {
  return (
    <div className="my-10 w-full">
      <h3 className="text-2xl font-extrabold leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        Experience
      </h3>
      <div className="mt-5">
        <Tabs
          defaultValue={experienceData[0]?.name}
          className="flex flex-col md:flex-row md:space-x-4"
          orientation="vertical"
        >
          <TabsList className={`flex h-max w-full flex-col space-y-2  md:w-64`}>
            {experienceData.map((company) => (
              <TabsTrigger
                key={`trigger-${company.name}`}
                className="flex w-full text-left "
                value={company.name}
              >
                <div className="flex w-full items-center justify-between">
                  <span>{company.name}</span>
                  <span
                    className={`mx-1 inline-block h-3 w-3 rounded-full  ${company.active ? 'bg-green-300' : ''}`}
                  />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator
            orientation="vertical"
            className="mx-[15px] hidden data-[orientation=vertical]:h-56 data-[orientation=vertical]:w-px md:flex"
          />
          {experienceData.map((company) => (
            <TabsContent key={company.name} value={company.name} className="mt-4 w-full md:mt-0">
              <Card
                key={`card-${company.name}`}
                className="border-none shadow-sm outline-none ring-0"
              >
                <CardHeader>
                  <CardTitle>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="px-0 text-2xl">
                          {company.name}
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <Avatar>
                            <AvatarImage src={company.imgSrc} />
                            <AvatarFallback>VC</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@{company.name}</h4>
                            <h4 className="text-sm font-semibold">{company.location}</h4>
                            <p className="text-sm">{company.description}</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </CardTitle>
                  <CardDescription>{company.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline
                    items={createTimelineItems(company.items)}
                    activeItem={0}
                    mode="manual"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
