type SummaryTagProps = {
  summary: number,
  text: string
}

export default function SummaryTag({summary, text} : SummaryTagProps) {
  return (
    <>
      <div className="text-white py-5 text-center">
        <p className="text-6xl font-bold">{summary}</p>
        <p>{text}</p>
      </div>
    </>
  )
}
