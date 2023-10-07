const CommonAppContainer = ({ children: children }: { children: any }) => {
  return (
    <main className='flex flex-1 flex-col mt-20 pt-10 max-w-7xl mx-auto w-full items-center'>
      {children}
    </main>
  );
};
export default CommonAppContainer;
