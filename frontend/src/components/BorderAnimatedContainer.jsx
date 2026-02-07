const BorderAnimatedContainer = ({ children }) => {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500">
      <div className="rounded-2xl bg-slate-900 h-full">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimatedContainer;
