import Link from "next/link"

export default function Home() {
  return (
    <div
      style={{ background: "#6190E8" }}
      className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-white">
        Home page in costruzione!! 🚧👷🏻‍♂️
      </h1>
      <Link href="/login" className="my-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Accedi all &apos;app</Link>
    </div>
  )
}
