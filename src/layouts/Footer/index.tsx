import { Container } from "react-bootstrap"
import { FooterContainer, FooterText } from "./styles"
import { MainInfo } from "config/main-config"

export const Footer = () => (
    <FooterContainer>
        <Container>
          <FooterText>
            {MainInfo.brandName} &copy; {new Date().getFullYear()} {MainInfo.footerCopyRight}
          </FooterText>
        </Container>
    </FooterContainer>
);
