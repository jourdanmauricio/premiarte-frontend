type BannerProps = {
  message: string;
};

const Banner = ({ message }: BannerProps) => {
  return (
    <div className='bg-violet-500'>
      <p className='text-center text-white'>{message}</p>
    </div>
  );
};

export { Banner };
