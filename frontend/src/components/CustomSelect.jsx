import { useEffect, useRef, useState } from 'react';

function CustomSelect({ label, value, options, onChange, placeholder = 'Select an option' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className="field-shell relative rounded-[24px] px-4 py-3">
      {label && <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-slate-500">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`field-input block ${selectedOption ? 'text-slate-800' : 'text-slate-400'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <span
          className={`mt-0.5 h-3 w-3 shrink-0 border-b-2 border-r-2 border-slate-500 transition duration-200 ${
            open ? 'translate-y-[1px] rotate-[-135deg]' : 'rotate-45'
          }`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+10px)] z-30 rounded-[24px] border border-white/70 bg-white/95 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <ul className="max-h-64 overflow-y-auto py-1" role="listbox">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full rounded-[18px] px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky/20 to-mint/20 font-semibold text-slate-950'
                        : 'text-slate-700 hover:bg-slate-900/5'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
