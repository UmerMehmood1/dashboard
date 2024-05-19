import SidebarItem, { SidebarItemProps } from "./SidebarItem";

const Sidebar: React.FC = () => {
  const menuItems: SidebarItemProps[] = [
    { href: "/", label: "Home" },
    {
      href: "/product",
      label: "Product",
      children: [
        { href: "/product/create", label: "Create" },
        { href: "/product/read", label: "Read" },
      ],
    },
    {
      href: "/category",
      label: "Category",
      children: [
        { href: "/category/create", label: "Create" },
        { href: "/category/read", label: "Read" },
      ],
    },
    {
      href: "/order",
      label: "Order",
      children: [
        { href: "/order/create", label: "Create" },
        { href: "/order/read", label: "Read" },
      ],
    },
    {
      href: "/customer",
      label: "Customer",
      children: [
        { href: "/customer/create", label: "Create" },
        { href: "/customer/read", label: "Read" },
      ],
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
