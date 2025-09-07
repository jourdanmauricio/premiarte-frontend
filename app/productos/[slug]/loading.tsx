export default function Loading() {
  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 font-montserrat text-3xl font-semibold'>Productos</h1>
      </div>
      <div className='flex gap-12 px-40'>
        <div className='w-1/2'>
          <div className='h-96 w-full animate-pulse rounded-lg bg-gray-200'></div>
        </div>
        <div className='w-1/2'>
          <div className='mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200'></div>
          <div className='mb-2 h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='mb-2 h-4 w-5/6 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-4/6 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
}
