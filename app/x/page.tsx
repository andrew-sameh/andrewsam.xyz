import { Shell, ShellHeader, DashedShellContainer } from '@/components/x/Shell'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'X' })

export default function XPage() {
  return (
    <Shell className="">
      <ShellHeader heading="Dashboard" text="Welcome to my dashboard, nothing here yet!" />
      <DashedShellContainer
        header="Check the header.."
        text="Try the pizza, maybe there's something there"
        className="h-full"
      ></DashedShellContainer>
    </Shell>
  )
}
