import { MainInfo } from 'config/index';
import { Row, Col } from 'react-bootstrap';

export const AuthorIntro = () => {
  const introParts = MainInfo.pageIntro.split('\n');

  return (
    <Row>
      <Col md="8">
        <div className="d-flex mb-4 admin-intro">
          <div className="flex-grow-1">
            <h5 className="fw-bold mb-0">Welcome to {MainInfo.brandName},</h5>
            <br />
            {introParts.map((part, index) => (
              <p className="welcome-text" key={index}>
                {part}
              </p>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};
