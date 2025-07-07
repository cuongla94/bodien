import styled from 'styled-components';

export const SectionWrapper = styled.div`
  // margin-top: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme?.fontSize.md};
  font-weight: 700;
  margin: 0;
  color: #1f2937;
  line-height: 1.4;
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;
