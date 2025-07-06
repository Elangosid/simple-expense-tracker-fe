function Navbar({ title = "Dashboard" }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hello, user-123</span>
        <img
          src="https://ui-avatars.com/api/?name=U&background=4f46e5&color=fff"
          alt="User"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}

export default Navbar;
