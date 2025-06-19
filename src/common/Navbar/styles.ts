import styled from 'styled-components';
import Image from 'next/image';

export const BrandWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

export const BrandTitle = styled.span`
  color: ${({ theme }) => theme.mainTextColor};
  font-weight: bold;
  font-size: 1.6rem;
`;

export const Logo = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;
