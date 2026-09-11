export default function SectionTitle({children}:{children:React.ReactNode}) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      {children}
    </h2>
  )
}