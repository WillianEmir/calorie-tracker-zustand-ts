
export default function Footer() {
  return (
    <footer className="mt-auto bg-lime-700">
      <div className="container mx-auto">
        <p className="text-[17px] text-gray-200 text-center py-2.5">Este proyecto está bajo Licencia MIT © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
