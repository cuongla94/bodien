import { MainInfo } from 'config/main-config';
import { AppLinks } from 'config/navigation-config';
import { FooterContainer, FooterWrapper, FooterLeft, FooterRight, FooterLinks, FooterInputGroup, FooterInput, FollowButton, BottomNote } from './styles';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterWrapper>
          <FooterLeft>
            <p className="fw-bold mb-1">{MainInfo.brandName}</p>
            <p className="text-muted mb-2">
              We write honest reviews & insights on the best tools, apps, and tech products.
              <br />
              Our mission is to help you make smarter, more confident tech decisions.
            </p>
            <p className="text-secondary mb-2">
              📬 Follow us to stay updated on the latest reviews, guides & tools!
            </p>
            <FooterInputGroup>
              <FooterInput type="email" placeholder="Enter your email..." />
              <FollowButton>Follow</FollowButton>
            </FooterInputGroup>
          </FooterLeft>

          <FooterRight>
            <FooterLinks>
              {Object.values(AppLinks).map((link) => (
                <li key={link.link}>
                  <Link href={link.link} className="text-decoration-none">{link.title}</Link>
                </li>
              ))}
            </FooterLinks>
          </FooterRight>
        </FooterWrapper>

        <BottomNote>
          &copy; {new Date().getFullYear()} {MainInfo.brandName}. All rights reserved.
        </BottomNote>
      </Container>
    </FooterContainer>
  );
};
