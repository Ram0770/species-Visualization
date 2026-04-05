function SearchBar({ value, onChange }) {
  return (
    <div className="glass panel-hover mb-6 rounded-[28px] p-3">
      <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/65 px-4 py-3">
        <div className="soft-pulse flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/20 to-mint/20 text-slate-700">
          <span className="text-lg">+</span>
        </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by scientific name, scientist, or year..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
      </div>
    </div>
  );
}

export default SearchBar;
