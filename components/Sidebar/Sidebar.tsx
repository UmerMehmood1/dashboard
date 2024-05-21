import SidebarItem, { SidebarItemProps } from "./SidebarItem";

const Sidebar: React.FC = () => {
  const menuItems: SidebarItemProps[] = [
    { href: "/", label: "Home" },
    {
      href: "/product",
      label: "Product",
    },
    {
      href: "/category",
      label: "Category",
    },
    {
      href: "/order",
      label: "Order",
    },
    {
      href: "/customer",
      label: "Customer",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      {menuItems.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Sidebar;
