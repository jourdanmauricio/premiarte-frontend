const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <h2 className="text-center text-2xl font-semibold tracking-tight text-orange-500 md:text-5xl">
      <span>{subtitle}</span>
    </h2>
  );
};

export default Subtitle;
