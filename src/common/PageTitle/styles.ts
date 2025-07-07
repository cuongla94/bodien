import styled from 'styled-components';

export const PageTitleWrapper = styled.div`
  padding: 3rem 1rem;
  background: linear-gradient(
    135deg,
    #0f172a 0%,
    #1e293b 35%,
    #263544 65%,
    #3c4858 100%
  );
  color: ${({ theme }) => theme.buttonText};
`;

export const TitleHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

background: linear-gradient(90deg, #1976d2, #42a5f5, #7b2ff7, #f107a3, #ff6a00);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

export const TitleSubheading = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.buttonText};
  opacity: 0.85;
  margin-top: 0.5rem;
`;
