export default function Header() {
  return (
    <header
      className="flex items-center space-x-4 px-6 py-4"
      style={{ backgroundColor: "#8F94FB" }}
    >
      <img
        src="logo.png"
        alt="App Logo"
        className="w-10 h-10 object-contain"
      />
      <h2
        className="text-2xl font-bold"
        style={{ color: "#311B92" }}
      >
        QuikForm
      </h2>
    </header>
  )
}
