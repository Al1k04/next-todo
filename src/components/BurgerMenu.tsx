"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import { Menu, Home, List, X } from "lucide-react";
import { handleSignIn, handleSigout } from "@/actions/authActions";

export default function BurgerMenu({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Menu size={26} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* background */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* sidebar */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col p-5 animate-slide-in">
            {/* header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-700">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* nav */}
            <nav className="flex flex-col gap-2">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                  <Home size={20} className="text-gray-700" />
                  <span className="text-base font-medium text-gray-700">
                    Home
                  </span>
                </div>
              </Link>

              <Link href="/tasks" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                  <List size={20} className="text-gray-700" />
                  <span className="text-base font-medium text-gray-700">
                    My tasks
                  </span>
                </div>
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200 text-gray-700">
              {session?.user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={session.user.image || "/avatar.png"}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {session.user.name || "User"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </div>
                  </div>

                  <form action={handleSigout}>
                    <button className="w-full mt-2 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                      Sign out
                    </button>
                  </form>
                </div>
              ) : (
                <form action={handleSignIn}>
                  <button className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition">
                    Sign in
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
