const MobileButtonMenu = () => {
  return (
    <label
      htmlFor="menu-toggle"
      className="cursor-pointer text-gray-300 hover:text-white focus-within:text-white ml-8"
      aria-label="Abrir menú"
    >
      <span className="sr-only">Abrir o cerrar menú</span>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </label>
  );
};

export { MobileButtonMenu };
