function SearchBar({ value, onChange }) {
  return (
    <div className="glass mb-6 rounded-2xl p-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by scientific name, scientist, or year..."
        className="w-full rounded-xl border border-white/40 bg-white/70 px-4 py-3 text-sm outline-none ring-sky/30 transition focus:ring"
      />
    </div>
  );
}

export default SearchBar;
