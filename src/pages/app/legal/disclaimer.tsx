import React from 'react';
import { Breadcrumbs } from 'common/Breadcrumbs';
import PageLayout from 'layouts/PageLayout';
import { MainInfo } from 'config/main-config';
import { Container } from 'react-bootstrap';

const DisclaimerPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Disclaimer' }
  ];

  return (
    <PageLayout>
      <Container className="mt-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        <h2 className="mb-4">Disclaimer</h2>

        <p>
          By using this website, blog, or making a purchase, you agree to the terms outlined below.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">General Information</h4>
        <p>
          The information provided on <strong>{MainInfo.brandName}</strong> is for general educational and informational purposes only. While we strive to ensure accuracy, we cannot guarantee that all information is complete, reliable, or up to date.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Not Professional Advice</h4>
        <p>
          The content on this site is not intended as legal, financial, or professional advice. We recommend consulting a qualified professional before making financial or business decisions.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Affiliate Disclosure</h4>
        <p>
          Some links on this site are affiliate links. If you click and purchase through them, we may earn a commission at no extra cost to you. These commissions support the site’s operations and content production. We only recommend products or services we genuinely believe in.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Sponsored Content & Reviews</h4>
        <p>
          We may receive compensation, discounts, or free products for sponsored posts or reviews. Regardless, all opinions expressed are our own and based on honest evaluations. You are encouraged to do your own research before making any purchasing decision.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Earnings Disclaimer</h4>
        <p>
          While we may discuss or share earnings or business results, these are not typical and do not guarantee similar outcomes for you. Your results depend on your individual effort, skills, and circumstances. We do not offer any "get rich quick" programs.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Limitation of Liability</h4>
        <p>
          <strong>{MainInfo.brandName}</strong> shall not be held liable for any errors, omissions, or outcomes resulting from the use of this website. All content and services are provided “as is” without warranties of any kind. We are not liable for any losses or damages arising from your use of the site or linked products and services.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Forward-Looking Statements</h4>
        <p>
          Some information may contain forward-looking statements that are not based on historical facts. These reflect our expectations or projections and may differ from actual results. We make no guarantees regarding future performance.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Changes to This Disclaimer</h4>
        <p>
          We reserve the right to update or modify this disclaimer at any time without notice. It is your responsibility to review it periodically.
        </p>

        <p className="text-muted mt-4">
          Thank you for visiting <strong>{MainInfo.brandName}</strong> and trusting us to provide helpful content.
        </p>
      </Container>
    </PageLayout>
  );
};

export default DisclaimerPage;
