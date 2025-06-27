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

export const FooterRight = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 0;

  li {
    margin-bottom: 0.5rem;

    a {
      color: ${({ theme }) => theme.linkColor};
      font-size: 0.9rem;

      &:hover {
        color: ${({ theme }) => theme.linkHover};
        text-decoration: underline;
      }
    }
  }
`;

export const BottomNote = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.subTextColor};
  margin-top: 2rem;
`;
