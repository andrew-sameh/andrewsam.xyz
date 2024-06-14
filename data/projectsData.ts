export interface Project {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith: string[]
}

export interface Experience {
  title: string
  company: string
  companyId: string
  location: string
  startDate: string
  endDate: string
  description: string
  imgSrc: string
  url?: string
  active?: boolean
  techStack: string[]
}

export interface Skill {
  name: string
  id: string
  category: string
  description?: string
  field: string[]
  level: 'advanced' | 'familiar' | 'learning'
}

export let projectsData: Project[] = [
  {
    type: 'work',
    title: 'Weaverse - Shopify Hydrogen Theme Customizer & Headless CMS',
    description: `The first Hydrogen-driven website builder powered by AI. Weaverse is a Shopify sales channel that allows you to create a website in minutes with no coding required.`,
    imgSrc: '/static/images/time-machine.jpg',
    url: 'https://www.weaverse.io?ref=leohuynh.dev',
    builtWith: ['Remix', 'Prisma', 'Tailwind', 'OpenAI'],
  },
  {
    type: 'work',
    title: 'Weaverse SDKs',
    description:
      'Open-source toolkits for seamless integration and development of Shopify Hydrogen themes and headless commerce solutions.',
    imgSrc: '/static/images/google.png',
    repo: 'andrewsam.xyz',
    builtWith: ['Turborepo', 'Hydrogen', 'React', 'Typescript'],
  },
  {
    type: 'self',
    title: 'Personal website',
    imgSrc: '/static/images/google.png',
    repo: 'andrewsam.xyz',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'Prisma', 'Umami'],
  },
  {
    type: 'self',
    title: 'Shopify theme starter',
    imgSrc: '/static/images/google.png',
    builtWith: ['Shopify', 'Liquid', 'Webpack', 'Tailwind', 'Theme-kit'],
  },
  {
    type: 'self',
    title: 'Exercism solutions',
    imgSrc: '/static/images/google.png',
    repo: 'andrewsam.xyz',
    builtWith: ['Javascript', 'Bash', 'Exercism'],
  },
]

export default projectsData

export let experienceData: Experience[] = []

export let skillsData: Skill[] = [
  {
    name: 'Javascript',
    id: 'javascript',
    category: 'Programming Languages',
    field: ['Frontend', 'Backend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'Typescript',
    id: 'typescript',
    category: 'Programming Languages',
    field: ['Frontend', 'Backend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'React',
    id: 'react',
    category: 'Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'Next.js',
    id: 'nextjs',
    category: 'Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'Tailwind',
    id: 'tailwind',
    category: 'CSS Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'Prisma',
    id: 'prisma',
    category: 'ORMs',
    field: ['Backend', 'Fullstack'],
    level: 'advanced',
  },
  {
    name: 'OpenAI',
    id: 'openai',
    description: 'OpenAI APIs, Whisper models',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'familiar',
  },
  {
    name: 'LangChain',
    id: 'langchain',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'familiar',
  },

  {
    name: 'Webpack',
    id: 'webpack',
    category: 'Bundlers',
    field: ['Frontend', 'Fullstack'],
    level: 'familiar',
  },
  {
    name: 'Python',
    id: 'python',
    category: 'Programming Languages',
    field: ['Backend', 'Fullstack'],
    level: 'familiar',
  },
  {
    name: 'Node.js',
    id: 'nodejs',
    category: 'Frameworks',
    field: ['Backend', 'Fullstack'],
    level: 'familiar',
  },
  {
    name: 'Fast API',
    id: 'fastapi',
    category: 'Frameworks',
    field: ['Backend', 'Fullstack'],
    level: 'familiar',
  },
  {
    name: 'Django',
    id: 'django',
    category: 'Frameworks',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Flask',
    id: 'flask',
    category: 'Frameworks',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Docker',
    id: 'docker',
    category: 'Tools',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'AWS',
    id: 'aws',
    category: 'Cloud Providers',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Azure',
    id: 'azure',
    category: 'Cloud Providers',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Git',
    id: 'git',
    category: 'Version Control',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Github',
    id: 'github',
    category: 'Version Control',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Azure DevOps',
    id: 'azure-devops',
    category: 'Version Control',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Bash',
    id: 'bash',
    category: 'Shell',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Linux',
    id: 'linux',
    category: 'OS',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'SQL',
    id: 'sql',
    category: 'Databases',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'NoSQL',
    id: 'nosql',
    category: 'Databases',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'MongoDB',
    id: 'mongodb',
    category: 'Databases',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'PostgreSQL',
    id: 'postgresql',
    category: 'Databases',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Redis',
    id: 'redis',
    category: 'Databases',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Bootstrap',
    id: 'bootstrap',
    category: 'CSS Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Pandas',
    id: 'pandas',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Numpy',
    id: 'numpy',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Anaconda',
    id: 'anaconda',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Jupyter',
    id: 'jupyter',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Matplotlib',
    id: 'matplotlib',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Seaborn',
    id: 'seaborn',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Scikit-learn',
    id: 'scikit-learn',
    category: 'Data Analysis',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Postman',
    id: 'postman',
    category: 'APIs',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'DataDog',
    id: 'datadog',
    category: 'Monitoring',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'PowerBI',
    id: 'powerbi',
    category: 'BI',
    field: ['Data Science', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Celery',
    id: 'celery',
    category: 'Task Queues',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'NGINX',
    id: 'nginx',
    category: 'Servers',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Vercel',
    id: 'vercel',
    category: 'Hosting',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'VLLM',
    id: 'vllm',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'OpenSource LLMs',
    id: 'opensource-llms',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Streamlit',
    id: 'streamlit',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Gradio',
    id: 'gradio',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Huggingface',
    id: 'huggingface',
    category: 'AI',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'GoLang',
    id: 'golang',
    category: 'Programming Languages',
    field: ['Backend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Jira',
    id: 'jira',
    category: 'Project Management',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Sanity',
    id: 'sanity',
    category: 'CMS',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Pinecode',
    id: 'pinecode',
    category: 'CMS',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'TestRail',
    id: 'testrail',
    category: 'Testing',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Locust',
    id: 'locust',
    category: 'Testing',
    field: ['DevOps', 'Fullstack'],
    level:
      'learning',
  },
  {
    name: 'Grafana',
    id: 'grafana',
    category: 'Monitoring',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Selenium',
    id: 'selenium',
    category: 'Testing',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Pytest',
    id: 'pytest',
    category: 'Testing',
    field: ['DevOps', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Svelte',
    id: 'svelte',
    category: 'Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'SvelteKit',
    id: 'sveltekit',
    category: 'Frameworks',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
  {
    name: 'Vite',
    id: 'vite',
    category: 'Bundlers',
    field: ['Frontend', 'Fullstack'],
    level: 'learning',
  },
]
