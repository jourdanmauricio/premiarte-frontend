const ITEMS_PER_PAGE = 9;

const CustomPagination = ({
  currentPage,
  total,
  categorySlug,
}: {
  currentPage: number;
  total: number;
  categorySlug: string;
}) => {
  const safeCurrentPage = currentPage > 1 ? currentPage : 1;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const getPageUrl = (page: number) =>
    `/productos?category=${categorySlug}&page=${page}`;

  return (
    <div className="flex justify-between items-center my-20 mx-auto max-w-[300px]">
      {/* deshabilitar el botón si es la primera página */}
      {safeCurrentPage > 1 ? (
        <a
          href={getPageUrl(Math.max(safeCurrentPage - 1, 1))}
          className="p-2 bg-orange-500 text-white rounded transition-colors hover:bg-orange-500/90"
        >
          Anterior
        </a>
      ) : (
        <span className="p-2 bg-orange-500 text-white rounded opacity-50 cursor-default">
          Anterior
        </span>
      )}
      <span>
        Página {safeCurrentPage} de {totalPages}
      </span>
      {safeCurrentPage < totalPages ? (
        <a
          href={getPageUrl(Math.min(safeCurrentPage + 1, totalPages))}
          className="p-2 bg-orange-500 text-white rounded hover:bg-orange-500/90 transition-colors"
        >
          Siguiente
        </a>
      ) : (
        <span className="p-2 bg-orange-500 text-white rounded opacity-50 cursor-default">
          Siguiente
        </span>
      )}
    </div>
  );
};

export { CustomPagination };
