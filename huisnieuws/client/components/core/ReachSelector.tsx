import Image from 'next/image';
import React from 'react';
import { Reach } from '../../enums/reach';

type ReachSelectorProps = {
  selected: Reach,
  onChange: Function,
  title: String,
};

const ReachSelector: React.FC<ReachSelectorProps> = ({ selected, onChange, title }) => {
  const options = [
    { icon: 'street.svg', name: Reach.STREET, label: 'Straat' },
    { icon: 'neighbourhood.svg', name: Reach.NEIGHBOURHOOD, label: 'Buurt' },
    { icon: 'city.svg', name: Reach.CITY, label: 'Stad' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-left font-medium text-gray-800 mb-1">{title}</h2>
      <section className="inline-flex rounded-md overflow-hidden cursor-pointer">
        {options.map(({ icon, name, label }) => (
          <div
            key={name}
            role="radio"
            aria-checked={name === selected}
            tabIndex={0}
            className={`px-7 py-2 grid place-items-center transition-all ${name === selected ? 'bg-gray-300' : 'bg-gray-200'}`}
            onClick={() => onChange(name)}
            onKeyDown={() => onChange(name)}
          >
            <Image src={`/icons/${icon}`} width="24" height="24" />
            <small className="mt-1">{label}</small>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReachSelector;
