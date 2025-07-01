import styled from 'styled-components';

export const CardItemHorizontalWrapper = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

export const CardItemHorizontalImageWrapper = styled.div`
  min-width: 100px;
  height: 100px;
background-color: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #888;
  padding: 1rem 0;
`;

export const CardItemHorizontalContent = styled.div`
  flex: 1;
`;

export const CardItemHorizontalCategory = styled.div`
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const CardItemHorizontalTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

export const CardItemHorizontalMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
  gap: 1rem; /* Controls spacing between date and Read More */

  svg {
    margin-right: 0.25rem;
    vertical-align: middle;
  }
`;


export const CardItemHorizontalReadMore = styled.button`
  font-size: 0.75rem;
  color: #2563eb;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
