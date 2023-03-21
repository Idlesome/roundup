import React from 'react';
import { Week } from './types';

type Props = {
  weeks: Week[];
  onWeekSelect: (selectedWeekIndex: number) => void;
};

export function SelectWeek({ weeks, onWeekSelect }: Props) {
  return (
    <div>
      Select week:
      <select
        onChange={e => {
          const selectedWeekIndex = Number(e.target.value);
          onWeekSelect(selectedWeekIndex);
        }}
      >
        {weeks.map((week, index) => (
          <option key={week.name} value={index}>
            {week.name}
          </option>
        ))}
      </select>
    </div>
  );
}
