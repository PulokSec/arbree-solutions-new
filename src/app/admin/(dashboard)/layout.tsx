import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Users2,
  Quote,
  Building2,
  Mail,
  FileText,
  Newspaper,
  Search,
  BarChart3,
  LogOut,
} from "lucide-react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Page Content", icon: FileText },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/team", label: "Team", icon: Users2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/clients", label: "Client Logos", icon: Building2 },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#f8f8f8]">
      <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-ink/10 bg-white p-6">
        <div className="flex flex-col gap-8">
          <p className="text-lg font-semibold text-ink">
            <span className="text-primary">arbree</span> admin
          </p>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary"
              >
                <item.icon className="size-4.5" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="size-4.5" strokeWidth={1.75} />
            Sign out
          </button>
        </form>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
