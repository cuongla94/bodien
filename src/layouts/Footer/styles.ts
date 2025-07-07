import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.footerBackground};
  padding: 2rem 0 1rem 0;
  color: ${({ theme }) => theme.subTextColor};
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  gap: 3rem;
`;

export const FooterLeft = styled.div`
  flex: 1;
  min-width: 250px;

  p {
    margin-bottom: 1rem;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const FooterInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const FooterInput = styled.input`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.mainTextColor};
  width: 100%;
  max-width: 250px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const FollowButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.linkHover};
  }
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* two columns */
  gap: 0.5rem 1.5rem;

  li {
    a {
      color: ${({ theme }) => theme.linkColor};
      font-size: 0.9rem;
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.linkHover};
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr; /* fallback to 1 column on small screens */
  }
`;

export const BottomNote = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.subTextColor};
  margin-top: 2rem;
`;

export const FooterLinksColumn = styled.div`
  flex: 1;

  h6 {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.mainTextColor};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.4rem;

      a {
        color: ${({ theme }) => theme.subTextColor || '#6b7280'};  // Neutral gray by default
        font-size: 0.9rem;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease, text-decoration 0.2s ease;

        &:hover,
        &:focus {
          color: ${({ theme }) => theme.linkHover || '#2563eb'};  // Accent color on interaction
          text-decoration: underline;
        }
      }
    }
  }
`;

export const FooterRight = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const FooterNavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.mainTextColor};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &.active {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  &:hover {
    text-decoration: underline;
  }
`;
