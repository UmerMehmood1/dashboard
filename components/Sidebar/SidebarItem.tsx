"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  href: string;
  label: string;
  children?: SidebarItemProps[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div
      className={`mb-2 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <Link href={href}>
        <p className="block px-4 py-2 rounded-md">{label}</p>
      </Link>
      {children && (
        <div className="pl-4">
          {children.map((child, index) => (
            <SidebarItem key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
