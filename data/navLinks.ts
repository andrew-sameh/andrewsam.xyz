export const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog', disabled: false, tooltip: 'Soon..' },
  { href: '/tags', title: 'Tags', hidden: true },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
  { href: '/resume', title: 'Resume' },
]


export type DashboardNavLinks = {
  title: string
  label: string
  icon: string
  href: string
  variant: string
  active?: boolean
  hidden?: boolean
  location: "top" | "bottom"
}
export const dashboardNavLinks: DashboardNavLinks[] = [
  {
    title: "Dashboard",
    label: "",
    icon: "dashboard",
    href: "/x",
    variant: "ghost",
    active: true,
    location: "top",
  },
  {
    title: "Tools",
    label: "",
    icon: "pizza",
    href: "/x/tools",
    variant: "ghost",
    active: true,
    location: "top",

  },
  {
    title: "Admin",
    label: "InProgress",
    icon: "candy",
    href: "/x/candy",
    variant: "ghost",
    active: false,
    location: "bottom",
    hidden: false,

  },
  {
    title: "Settings",
    label: "InProgress",
    icon: "settings",
    href: "/x/settings",
    variant: "ghost",
    active: false,
    location: "top",
    hidden: false,

  },
  {
    title: "Logout",
    label: "",
    icon: "logout",
    href: "/x/",
    variant: "ghost",
    active: true,
    location: "bottom",
    hidden: true,
  },
]