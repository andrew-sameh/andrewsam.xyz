'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  TouchProvider,
  HybridTooltip,
  HybridTooltipTrigger,
  HybridTooltipContent,
} from '@/components/ui/hybrid-tooltip'
import { LuChevronLeft as ChevronLeft } from 'react-icons/lu'
import { LuChevronRight as ChevronRight } from 'react-icons/lu'

import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { skillsData } from '@/data/mainData'
import { type Skill } from '@/data/mainData'
import IconsBundle from '../social-icons'
import { useState } from 'react'

function filterSkillsData(skillsData: Skill[]) {
  // returns an object with each category as a key and an array of skills as the value
  const acc: Record<string, Skill[]> = { 'Most Used': [] }

  skillsData.forEach((skill) => {
    if (!skill.hidden) {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)

      // If the skill is most used, add it to the "Most Used" category
      if (skill.mostUsed) {
        acc['Most Used'].push(skill)
      }
    }
  })

  return acc
}

export function Technologies() {
  const filteredSkillsData = filterSkillsData(skillsData)
  const categories = Object.keys(filteredSkillsData)
  const [tabIndex, setTabIndex] = useState(0)

  const onTabChange = (value: string) => {
    const index = categories.indexOf(value)
    setTabIndex(index)
  }

  const onNextTab = () => {
    const nextIndex = (tabIndex + 1) % categories.length
    setTabIndex(nextIndex)
  }

  const onPrevTab = () => {
    const prevIndex = (tabIndex - 1 + categories.length) % categories.length
    setTabIndex(prevIndex)
  }

  return (
    <div className="my-10 w-full">
      <h3 className="text-2xl font-extrabold leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        Technologies I've worked with
      </h3>
      <div className="mt-5">
        <TouchProvider>
          <Tabs
            value={categories[tabIndex]}
            onValueChange={onTabChange}
            defaultValue={categories[0]}
            className=""
          >
            <TabsList
              className={`h-27 grid w-full grid-cols-2 gap-2 md:h-9 md:grid-cols-5 md:gap-1 lg:grid-cols-5 xl:gap-2`}
            >
              {categories.map((category) => (
                <TabsTrigger
                  key={`trigger-${category}`}
                  value={category}
                  className={
                    category === 'Most Used'
                      ? ' col-span-2 from-blue-300 via-sky-300 to-cyan-300 data-[state=active]:bg-gradient-to-tr data-[state=active]:text-slate-900 md:col-span-1 '
                      : ''
                  }
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <Card key={category} className="w-full">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    {category === 'Most Used' && (
                      <CardDescription>These are my most used technologies.</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10">
                      {filteredSkillsData[category].map((skill) => (
                        <HybridTooltip key={skill.id}>
                          <HybridTooltipTrigger asChild>
                            <Button
                              className={`h-14 p-2 sm:p-2 ${skill.level === 'learning' ? 'border border-green-300' : ''}`}
                              variant="outline"
                            >
                              <IconsBundle kind={skill.id} size={10} iconType="icon" />
                            </Button>
                          </HybridTooltipTrigger>
                          <HybridTooltipContent className="w-auto">
                            {skill.name}
                          </HybridTooltipContent>
                        </HybridTooltip>
                      ))}
                    </div>
                  </CardContent>
                  {category !== 'Most Used' && (
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                      {/* <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div> */}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="mx-1 inline-block h-3 w-3 rounded-full bg-green-300"></span>
                        <span>Currently Learning</span>
                      </div>
                      <Pagination className="ml-auto mr-0 w-auto">
                        <PaginationContent>
                          <PaginationItem>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={onPrevTab}
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                              <span className="sr-only">Previous Page</span>
                            </Button>
                          </PaginationItem>
                          <PaginationItem>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={onNextTab}
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                              <span className="sr-only">Next Page</span>
                            </Button>
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TouchProvider>
      </div>
    </div>
  )
}
