import Image from 'next/image'
interface CountryFlagProps {
  country: string
}
// Parameter: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
export default function CountryFlag({ country }: CountryFlagProps) {
  if (!country) return null

  return (
    <Image
      src={`https://flagcdn.com/20x15/${country}.png`}
      alt={country}
      width={20}
      height={15}
      className="align-text-middle !m-0 !mr-1 inline-block rounded-none border-none"
    />
  )
}
