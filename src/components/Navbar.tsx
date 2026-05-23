import { handleSignIn, handleSigout } from "@/actions/authActions";
import { auth } from "@/auth";
import { Home, List } from "lucide-react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer">
              Taskly
            </h1>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-4">
              <Link href="/">
                <li className="flex items-center text-base lg:text-lg py-2 px-4 rounded-xl cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                  <Home size={20} className="mr-2" />
                  Home
                </li>
              </Link>

              <Link href="/tasks">
                <li className="flex items-center text-base lg:text-lg py-2 px-4 rounded-xl cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                  <List size={20} className="mr-2" />
                  My tasks
                </li>
              </Link>
            </ul>

            {/* AUTH */}
            {session?.user ? (
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={session.user.image ?? undefined}
                  alt="User avatar"
                />

                <p className="text-sm lg:text-base max-w-[180px] truncate">
                  {session.user.email}
                </p>

                <form action={handleSigout}>
                  <button className="hover:bg-blue-900 py-2 px-5 rounded-xl cursor-pointer transition-all duration-200">
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <form action={handleSignIn}>
                <button className="hover:bg-blue-900 py-2 px-5 rounded-xl cursor-pointer transition-all duration-200">
                  Sign in
                </button>
              </form>
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <BurgerMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}
