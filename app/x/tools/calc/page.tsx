import { Shell, ShellHeader, DashedShellContainer, ShellContainer } from '@/components/x/Shell'
import { genPageMetadata } from 'app/seo'
import { CalculatorSettingsDrawer } from '@/components/x/calc/settings'
import { IncomeForm } from '@/components/x/calc/IncomeForm'
import { IncomeView } from '@/components/x/calc/CalcView'
import { DefaultValuesDrawer } from '@/components/x/calc/defaultValuesButton'
export const metadata = genPageMetadata({ title: 'Income Calculator' })

export default function XPage() {
  return (
    <Shell className="">
      <ShellHeader heading="Income Calculator">
        <div className="flex flex-row space-x-2">
          <CalculatorSettingsDrawer />
          <DefaultValuesDrawer />
        </div>
      </ShellHeader>
      <ShellContainer>
        <div className="relative flex flex-col items-start gap-8">
          <IncomeForm />
          <IncomeView />
        </div>
      </ShellContainer>
    </Shell>
  )
}
