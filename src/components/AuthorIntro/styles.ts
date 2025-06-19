// components/AuthorIntro/styles.ts
import styled from 'styled-components';

export const IntroWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  padding: 0px 3px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const IntroContent = styled.div`
  flex-grow: 1;
`;

export const Heading = styled.h5`
  font-weight: bold;
  margin-bottom: 0;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const IntroText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.subTextColor};
  line-height: 1.6;
  font-size: 1rem;
`;
