'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import {
  StyledDatePickerWrapper,
  StyledDatePicker,
  CalendarIcon,
} from './styles';
import { FaRegCalendarAlt } from 'react-icons/fa';

// Dynamically import react-datepicker with SSR disabled
const ReactDatePicker = dynamic(() => import('react-datepicker'), {
  ssr: false,
});

export type DateRange = [Date | null, Date | null];

interface Props {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangePicker = ({ dateRange, onChange }: Props) => {
  const [startDate, endDate] = Array.isArray(dateRange)
    ? dateRange
    : [null, null];

  useEffect(() => {
    registerLocale('en-US', enUS);
  }, []);

  return (
    <StyledDatePickerWrapper>
      <CalendarIcon>
        <FaRegCalendarAlt />
      </CalendarIcon>

      <StyledDatePicker
        as={ReactDatePicker}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          if (Array.isArray(update)) {
            onChange(update as DateRange);
          }
        }}
        isClearable
        placeholderText="Select date range"
        locale="en-US"
      />
    </StyledDatePickerWrapper>
  );
};
