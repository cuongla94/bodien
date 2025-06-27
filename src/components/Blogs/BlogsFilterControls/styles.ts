import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

export const FilterWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const FeaturedToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.disabledText};
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 36px;
  font-size: 15px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  background: transparent;
  outline: none;
  border-radius: 0;

  &::placeholder {
    color: ${({ theme }) => theme.subTextColor};
  }

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledSelectTrigger = styled(Select.Trigger)`
  all: unset;
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.mainTextColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledSelectContent = styled(Select.Content)`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 9999;
  width: var(--radix-select-trigger-width);
  max-height: 240px;
  overflow: hidden;
`;

export const StyledSelectViewport = styled(Select.Viewport)`
  padding: 4px 0;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.borderColor} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.borderColor};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const StyledSelectItem = styled(Select.Item)`
  padding: 10px 12px;
  font-size: 15px;
  color: ${({ theme }) => theme.mainTextColor};
  cursor: pointer;
  user-select: none;

  &:hover,
  &[data-highlighted] {
    background-color: ${({ theme }) => theme.codeBackground};
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.disabledText};
    pointer-events: none;
  }
`;

export const StyledSelectSearchWrapper = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.background};
`;

export const StyledSelectSearchInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.mainTextColor};

  &::placeholder {
    color: ${({ theme }) => theme.subTextColor};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const ClearIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.disabledText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.subTextColor};
  }
`;
