import { NavLink } from "./NavLink";

const navItems = [
  { to: "/", label: "Properties", matchPaths: ["/edit"] },
  { to: "/products", label: "Products" },
  { to: "/profile", label: "Profile" },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 min-h-screen p-4 flex flex-col gap-1">
      <div className="text-white text-lg font-bold mb-6 px-4">RTK Practice</div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            label={item.label}
            matchPaths={item.matchPaths}
          />
        ))}
      </nav>
    </aside>
  );
}