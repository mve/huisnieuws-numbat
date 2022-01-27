import React from 'react';

type Props = {
  currentLength: number
  maxLength: number
}

const InputCounter: React.FC<Props> = ({ currentLength, maxLength }) => {
  const percentage = Math.round(((maxLength - currentLength) / maxLength) * 100);
  let stateColor = 'blue';
  if (percentage <= 20 && percentage > 10) stateColor = 'yellow';
  if (percentage <= 10) stateColor = 'red';

  return (
    <div className={`c100 center p${percentage} ${stateColor}`}>
      <span id="input-counter" className={`${stateColor}`}>
        {maxLength - currentLength}
      </span>
      <div className="slice">
        <div className="bar" />
        <div className="fill" />
      </div>
    </div>
  );
};

export default InputCounter;
