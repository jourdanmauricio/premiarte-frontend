"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function UserInitial({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
      {initial}
    </span>
  );
}

export function AuthSection() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-4 w-20 rounded bg-gray-700" />
        <div className="h-8 w-8 rounded-full bg-gray-700" />
      </div>
    );
  }

  if (session?.user) {
    const displayName = session.user.name ?? session.user.email ?? "";
    const email = session.user.email ?? "";

    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-gray-300 text-sm truncate max-w-[140px]">
            {displayName}
          </span>
          <UserInitial name={displayName} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-700 bg-background/95 backdrop-blur-sm shadow-xl overflow-hidden z-50">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <UserInitial name={displayName} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">
                  {displayName}
                </p>
                {email && (
                  <p className="text-xs text-gray-400 truncate">{email}</p>
                )}
              </div>
            </div>

            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="text-gray-300 hover:text-white text-sm cursor-pointer"
    >
      Iniciar sesión
    </button>
  );
}
