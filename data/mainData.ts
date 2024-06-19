export interface Project {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith: string[]
  hidden?: boolean

}

export interface Company {
  name: string
  location?: string
  imgSrc?: string
  startDate?: string
  endDate?: string
  url?: string
  active?: boolean
  hidden?: boolean
  description?: string
  descCard?: string
  items: Experience[]

}

export interface TechStackType {
  name: string
  href?: string

}
export interface Experience {
  title: string
  roleType: 'Fulltime' | 'Part-time' | 'Consultant' | 'Freelance'
  startDate: string
  endDate?: string
  description: string
  active?: boolean
  techStack?: TechStackType[]
  hidden?: boolean
}

export interface Skill {
  name: string
  id: string
  category: "Languages" | "Web Development" | "AI & Data Science" | "DevOps & Tools" 
  field?: string
  subfield?: string
  description?: string
  imgSrc?: string
  level: 'advanced' | 'familiar' | 'learning'
  hidden?: boolean
  href?: string
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

export let experienceData: Company[] =
[
  {
    name: 'Valsoft - Aspire',
    location: 'CA - Remote',
    description: 'FlairsTech is a software development company that specializes in building custom software solutions for businesses. We help businesses automate their processes and improve their efficiency.',
    imgSrc: '/static/images/weaverse.png',
    url: 'https://www.weaverse.io?ref=leohuynh.dev',
    active: true,
    items: [
      {
        title: 'Backend Developer - DockMaster',
        roleType: 'Fulltime',
        startDate: '2024/04/15',
        description: 'Building the first Hydrogen-driven website builder powered by AI. Weaverse is a Shopify sales channel that allows you to create a website in minutes with no coding required.',
        techStack: [{
          name: 'prisma',
          href: 'https://prisma.io',
        },
        {
          name: 'react',
          href: 'https://reactjs.org',
        },
        {
          name: 'tailwind',
          href: 'https://tailwindcss.com',
        },
        {
          name: 'openai',
          href: 'https://openai.com',
        }],
      
        active: true,
      },
      {
        title: 'AI Backend Developer - Hospitality Portfolio',
        roleType: 'Fulltime',
        startDate: '2023/10/15',
        endDate: '2024/04/15',
        description: 'Building the first Hydrogen-driven website builder powered by AI. Weaverse is a Shopify sales channel that allows you to create a website in minutes with no coding required.',
        techStack: [{
          name: 'prisma',
          href: 'https://prisma.io',
        },
        {
          name: 'react',
          href: 'https://reactjs.org',
        },
        {
          name: 'tailwind',
          href: 'https://tailwindcss.com',
        },
        {
          name: 'openai',
          href: 'https://openai.com',
        }],
      },
      {
        title: 'API Implementation Engineer - InnQuest',
        roleType: 'Fulltime',
        startDate: '2022/10/24',
        endDate: '2023/10/15',
        description: 'Building the first Hydrogen-driven website builder powered by AI. Weaverse is a Shopify sales channel that allows you to create a website in minutes with no coding required.',
        techStack: [{
          name: 'prisma',
          href: 'https://prisma.io',
        },
        {
          name: 'react',
          href: 'https://reactjs.org',
        },
        {
          name: 'tailwind',
          href: 'https://tailwindcss.com',
        },
        {
          name: 'openai',
          href: 'https://openai.com',
        }],
      },
    ],
  },
  {
    name: 'FlairsTech',
    location: 'Remote',
    description: 'FlairsTech is a software development company that specializes in building custom software solutions for businesses. We help businesses automate their processes and improve their efficiency.',
    imgSrc: '/static/images/weaverse.png',
    url: 'https://www.weaverse.io?ref=leohuynh.dev',
    active: true,
    items: [
      {
        title: 'AI Developer',
        roleType: 'Consultant',
        startDate: '2023/02/14',
        description: 'Building the first Hydrogen-driven website builder powered by AI. Weaverse is a Shopify sales channel that allows you to create a website in minutes with no coding required.',
        techStack: [{
          name: 'prisma',
          href: 'https://prisma.io',
        },
        {
          name: 'react',
          href: 'https://reactjs.org',
        },
        {
          name: 'tailwind',
          href: 'https://tailwindcss.com',
        },
        {
          name: 'openai',
          href: 'https://openai.com',
        }],        active: true,

      },
    ],
  },
]

export let skillsData: Skill[] = [
  {
    name: 'Javascript',
    id: 'javascript',
    category: 'Languages',
    level: 'advanced',
  },
  {
    name: 'Typescript',
    id: 'typescript',
    category: 'Languages',
    level: 'advanced',
  },
  {
    name: 'React',
    id: 'react',
    category: 'Web Development',
    field: 'Frontend',
    level: 'advanced',
  },
  {
    name: 'Next.js',
    id: 'nextjs',
    category: 'Web Development',
    field: 'Fullstack',
    subfield: 'Frameworks',
    level: 'advanced',
  },
  {
    name: 'Tailwind',
    id: 'tailwind',
    category: 'Web Development',
    field: 'Frontend',
    subfield: 'Styling',
    level: 'advanced',
  },
  {
    name: 'ShadCN',
    id: 'shadcn',
    category: 'Web Development',
    field: 'Frontend',
    subfield: 'Styling',
    level: 'advanced',
  },
  {
    name: 'CSS',
    id: 'css',
    category: 'Web Development',
    field: 'Frontend',
    subfield: 'Styling',
    level: 'advanced',
  },
  {
    name: 'Prisma',
    id: 'prisma',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'ORM',
    level: 'advanced',
  },
  {
    name: 'OpenAI',
    id: 'openai',
    category: 'AI & Data Science',
    field: 'AI',
    description: 'GPTs, Whisper',
    level: 'familiar',
  },
  {
    name: 'LangChain',
    id: 'langchain',
    category: 'AI & Data Science',
    field: 'AI',
    subfield: 'Frameworks',
    level: 'familiar',
  },
  {
    name: 'Python',
    id: 'python',
    category: 'Languages',
    level: 'familiar',
  },
  {
    name: 'C Lang',
    id: 'clang',
    category: 'Languages',
    level: 'familiar',
  },
  {
    name: 'Node.js',
    id: 'nodejs',
    category: 'Web Development',
    field: 'Backend',
    level: 'familiar',
  },
  {
    name: 'Fast API',
    id: 'fastapi',
    category: 'Web Development',
    field: 'Backend',
    level: 'familiar',
  },
  {
    name: 'Django',
    id: 'django',
    category: 'Web Development',
    field: 'Backend',
    level: 'advanced',
  },
  {
    name: 'Flask',
    id: 'flask',
    category: 'Web Development',
    field: 'Backend',
    level: 'advanced',
  },
  {
    name: 'Docker',
    id: 'docker',
    category: 'DevOps & Tools',
    field: 'Containers',
    level: 'advanced',
  },
  {
    name: 'AWS',
    id: 'aws',
    category: 'DevOps & Tools',
    field: 'Cloud Providers',
    level: 'advanced',
  },
  {
    name: 'Azure',
    id: 'azure',
    category: 'DevOps & Tools',
    field: 'Cloud Providers',
    level: 'advanced',
  },
  {
    name: 'Git',
    id: 'git',
    category: 'DevOps & Tools',
    field: 'Source Control',
    level: 'advanced',
  },
  {
    name: 'Github',
    id: 'github',
    category: 'DevOps & Tools',
    field: 'Source Control',
    level: 'advanced',
  },
  {
    name: 'Azure DevOps',
    id: 'azuredevops',
    category: 'DevOps & Tools',
    field: 'Source Control',
    level: 'advanced',
  },
  {
    name: 'Bash',
    id: 'bash',
    category: 'DevOps & Tools',
    field: 'Shell',
    level: 'advanced',
  },
  {
    name: 'Powershell',
    id: 'powershell',
    category: 'DevOps & Tools',
    field: 'Shell',
    level: 'advanced',
  },
  {
    name: 'Linux',
    id: 'linux',
    category: 'DevOps & Tools',
    field: 'OS',
    level: 'advanced',
  },
  {
    name: 'SQL',
    id: 'sql',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'advanced',
    hidden: true,
  },
  {
    name: 'NoSQL',
    id: 'nosql',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'advanced',
    hidden: true,

  },
  {
    name: 'MongoDB',
    id: 'mongodb',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'learning',
  },
  {
    name: 'PostgreSQL',
    id: 'postgres',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'advanced',
  },
  {
    name: 'MySQL',
    id: 'mysql',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'advanced',
  },
  {
    name: 'Redis',
    id: 'redis',
    category: 'Web Development',
    field: 'Backend',
    subfield: 'Databases',
    level: 'advanced',
  },
  {
    name: 'Bootstrap',
    id: 'bootstrap',
    category: 'Web Development',
    field: 'Frontend',
    subfield: 'Styling',
    level: 'advanced',
  },
  {
    name: 'Pandas',
    id: 'pandas',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Analytics',
    level: 'advanced',
  },
  {
    name: 'Numpy',
    id: 'numpy',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Analytics',
    level: 'advanced',
  },
  {
    name: 'Anaconda',
    id: 'anaconda',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Tools',
    level: 'advanced',
  },
  {
    name: 'Jupyter',
    id: 'jupyter',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Tools',
    level: 'advanced',
  },
  {
    name: 'Matplotlib',
    id: 'matplotlib',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Visualization',
    level: 'advanced',
  },
  {
    name: 'Plotly',
    id: 'plotly',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Visualization',
    level: 'advanced',
  },
  {
    name: 'Seaborn',
    id: 'seaborn',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Visualization',
    level: 'advanced',
  },
  {
    name: 'Scikit-learn',
    id: 'scikitlearn',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'ML',
    level: 'advanced',
  },
  {
    name: 'Postman',
    id: 'postman',
    category: 'DevOps & Tools',
    field: 'Tools',
    level: 'advanced',
  },
  {
    name: 'DataDog',
    id: 'datadog',
    category: 'DevOps & Tools',
    field: 'Analytics',
    level: 'advanced',
  },
  {
    name: 'Umami',
    id: 'umami',
    category: 'DevOps & Tools',
    field: 'Analytics',
    level: 'advanced',
  },
  {
    name: 'PowerBI',
    id: 'powerbi',
    category: 'AI & Data Science',
    field: 'Data Science',
    subfield: 'Visualization',
    level: 'advanced',
  },
  {
    name: 'Celery',
    id: 'celery',
    category: 'Web Development',
    field: 'Backend',
    level: 'advanced',
  },
  {
    name: 'NGINX',
    id: 'nginx',
    category: 'Web Development',
    field: 'Backend',
    level: 'advanced',
  },
  {
    name: 'Vercel',
    id: 'vercel',
    category: 'DevOps & Tools',
    field: 'Cloud Providers',
    level: 'advanced',
  },
  {
    name: 'VLLM',
    id: 'vllm',
    category: 'AI & Data Science',
    field: 'AI',
    subfield: 'Frameworks',
    level: 'advanced',
  },
  {
    name: 'OpenSource LLMs, Mistral, LLAMA, Vicuna',
    id: 'mistral',
    category: 'AI & Data Science',
    field: 'AI',
    level: 'advanced',
  },
  {
    name: 'Streamlit',
    id: 'streamlit',
    category: 'AI & Data Science',
    field: 'Prototyping',
    level: 'advanced',
  },
  {
    name: 'Gradio',
    id: 'gradio',
    category: 'AI & Data Science',
    field: 'Prototyping',
    level: 'advanced',
  },
  {
    name: 'Huggingface',
    id: 'huggingface',
    category: 'AI & Data Science',
    field: 'AI',
    level: 'advanced',
  },
  {
    name: 'GoLang',
    id: 'golang',
    category: 'Languages',
    level: 'learning',
  },
  {
    name: 'Jira',
    id: 'jira',
    category: 'DevOps & Tools',
    field: 'DevOps & Tools',
    subfield: 'Fullstack',
    level: 'advanced',
  },
  {
    name: 'Sanity',
    id: 'sanity',
    category: 'Web Development',
    field: 'CMS',
    level: 'advanced',
  },
  {
    name: 'Pinecone',
    id: 'pinecone',
    category: 'AI & Data Science',
    field: 'AI',
    subfield: 'Vectors',
    level: 'advanced',
  },
  {
    name: 'TestRail',
    id: 'testrail',
    category: 'Web Development',
    field: 'Testing',
    level: 'advanced',
  },
  {
    name: 'Locust',
    id: 'locust',
    category: 'Web Development',
    field: 'Testing',
    level: 'advanced',
  },
  {
    name: 'Grafana',
    id: 'grafana',
    category: 'DevOps & Tools',
    field: 'DevOps & Tools',
    subfield: 'Fullstack',
    level: 'advanced',
  },
  {
    name: 'Selenium',
    id: 'selenium',
    category: 'Web Development',
    field: 'Testing',
    level: 'advanced',
  },
  {
    name: 'PyTest',
    id: 'pytest',
    category: 'Web Development',
    field: 'Testing',
    level: 'advanced',
  },
  {
    name: 'Svelte',
    id: 'svelte',
    category: 'Web Development',
    field: 'Frontend',
    subfield: 'Fullstack',
    level: 'advanced',
  },
  {
    name: 'SvelteKit',
    id: 'sveltekit',
    category: 'Web Development',
    field: 'Fullstack',
    level: 'advanced',
  },
  {
    name: 'Vite',
    id: 'vite',
    category: 'Web Development',
    field: 'Frontend',
    level: 'advanced',
  },
  {
    name: 'Yarn',
    id: 'yarn',
    category: 'Web Development',
    field: 'Frontend',
    level: 'advanced',
  },
  {
    name: 'Tableau',
    id: 'tableau',
    category: 'AI & Data Science',
    field: 'Analytics',
    level: 'advanced',
  },
  {
    name: 'Three.js',
    id: 'threejs',
    category: 'Web Development',
    field: 'Frontend',
    level: 'learning',
  },
  {
    name: 'Poetry',
    id: 'poetry',
    category: 'DevOps & Tools',
    field: 'Tools',
    level: 'advanced',
  },  {
    name: 'PNPM',
    id: 'pnpm',
    category: 'DevOps & Tools',
    field: 'Tools',
    level: 'advanced',
  },
   {
    name: 'Github Actions',
    id: 'githubactions',
    category: 'DevOps & Tools',
    field: 'Deployment',
    level: 'advanced',
  },
   {
    name: 'Framer Motion',
    id: 'framermotion',
    category: 'Web Development',
    field: 'Frontend',
    level: 'learning',
  },
  {
    name: 'VS Code',
    id: 'vscode',
    category: 'DevOps & Tools',
    field: 'Tools',
    level: 'advanced',
  },
  {
    name: 'MeiliSearch',
    id: 'meilisearch',
    category: 'Web Development',
    field: 'Backend',
    level: 'advanced',
  },
]

