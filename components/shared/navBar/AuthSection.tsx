"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthSection() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-gray-400 text-sm">...</span>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-300 text-sm truncate max-w-[120px]">
          {session.user.name ?? session.user.email}
        </span>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-gray-400 hover:text-white text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="text-gray-300 hover:text-white text-sm"
    >
      Iniciar sesión
    </button>
  );
}
