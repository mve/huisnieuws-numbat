import React from 'react';
import { lightenOrDarkenColor } from '../../support/utils';

type Props = {
  color: string,
  name: string,
  className: string,
};

const TagLabel: React.FC<Props> = ({ color, name, className }) => {
  const styles = {
    backgroundColor: color,
    color: lightenOrDarkenColor(color, 180),
    borderColor: lightenOrDarkenColor(color, 100),
  };

  return (
    <span
      style={styles}
      className={`tag-label rounded-xl border-2 py-1 px-3 text-[14px] font-medium ${className}`}
    >
      {name}
    </span>
  );
};

export default TagLabel;
