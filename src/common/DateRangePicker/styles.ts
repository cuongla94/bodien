import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const StyledDatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  z-index: 1000; /* ensure calendar appears above other elements */
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor || '#ccc'};
  border-radius: 4px;
  font-size: 1rem;
`;

export const CalendarIcon = styled.div`
  position: absolute;
  left: 10px;
  pointer-events: none;
  color: ${({ theme }) => theme.subTextColor || '#888'};
`;
