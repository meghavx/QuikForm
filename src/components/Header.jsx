export default function Header() {
  return (
    <header
      className="flex items-center space-x-4 px-6 py-4"
      style={{ backgroundColor: "#311B92" }}
    >
      <img
        src="logo.png"
        alt="App Logo"
        className="w-10 h-10 object-contain"
      />
      <h2
        className="text-2xl font-semibold"
        style={{ color: "#E8DAEF" }}
      >
        QuikForm
      </h2>
    </header>
  )
}
