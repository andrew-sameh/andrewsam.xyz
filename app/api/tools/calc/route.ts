import { getSalaryDict } from '@/components/x/calc/CalFunctions'

export async function POST(req, res) {
  try {
    const requestBody = await req.json()
    const { startingDate, gross, grossBonus, allocations, lap, deductions, adjustment, increase } =
      requestBody
    const adjustmentUpdated = adjustment ? adjustment / 100 : 0
    const increaseUpdated = increase ? increase / 100 : 0
    const updatedGross = gross * (1 + increaseUpdated)

    const salaryDict = getSalaryDict(
      startingDate,
      updatedGross,
      grossBonus,
      lap,
      allocations,
      deductions,
      0.255,
      adjustmentUpdated
    )

    return new Response(JSON.stringify(salaryDict), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
  }
}
