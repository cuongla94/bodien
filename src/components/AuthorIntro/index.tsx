// components/AuthorIntro/index.tsx
import { MainInfo } from 'config/index';
import { Row, Col } from 'react-bootstrap';
import { IntroWrapper, IntroContent, Heading, IntroText } from './styles';

export const AuthorIntro = () => {
  const introParts = MainInfo.pageIntro.split('\n');

  return (
    <Row>
      <Col md="8">
        <IntroWrapper>
          <IntroContent>
            <Heading>Welcome to {MainInfo.brandName},</Heading>
            {introParts.map((part, index) => (
              <IntroText key={index}>{part}</IntroText>
            ))}
          </IntroContent>
        </IntroWrapper>
      </Col>
    </Row>
  );
};
