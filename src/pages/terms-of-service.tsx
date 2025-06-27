import PageLayout from 'layouts/PageLayout';
import Link from 'next/link';
import React from 'react';
import { AppLinks, MainInfo } from 'config';
import { getEffectiveDate } from 'utils/getDates';
import { Breadcrumbs } from 'common/Breadcrums';

const TermsOfServicePage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' },
  ];

  return (
    <PageLayout>
      <div className="mt-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        <h2 className="mt-4 mb-4 text-primary">Terms of Service</h2>
        <p className="text-muted">Effective Date: {getEffectiveDate()}</p>

        <p>
          By accessing or using <strong>{MainInfo.brandName}</strong>, you agree to the following terms and conditions.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">1. Content</h4>
        <p>
          All content is provided for informational and educational purposes only. While we strive for accuracy, we make no guarantees regarding the completeness or reliability of any content.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">2. Affiliate Relationships</h4>
        <p>
          We participate in affiliate marketing programs, which means we may earn a commission on qualifying purchases made through links on our site. Please read our{' '}
          <Link href={AppLinks.affiliateDisclosure.link} className="text-decoration-underline">
            {AppLinks.affiliateDisclosure.title}
          </Link>{' '}
          for full details.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">3. Intellectual Property</h4>
        <p>
          All original content — including text, images, logos, and layout — is the property of <strong>{MainInfo.brandName}</strong> unless otherwise stated. Unauthorized reproduction or redistribution is prohibited without prior written consent.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">4. User Conduct</h4>
        <ul>
          <li>🚫 Do not use the site for illegal or unauthorized purposes.</li>
          <li>🚫 Do not attempt to hack, breach, or disrupt the functionality of the website.</li>
          <li>🚫 Do not post spam, malicious, or offensive content in comments or messages.</li>
        </ul>

        <h4 className="mt-4 mb-2 text-secondary">5. Disclaimer</h4>
        <p>
          All content is provided “as is” without any warranties. We are not liable for any damages, losses, or harm resulting from the use of this site or any linked third-party sites.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">6. Changes to These Terms</h4>
        <p>
          We reserve the right to update or modify these Terms of Service at any time. Continued use of the site after updates constitutes your agreement to the revised terms.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Questions?</h4>
        <p>
          If you have any questions about our Privacy Policy or Terms of Service, please{' '}
          <Link href={AppLinks.contact.link} className="text-decoration-underline">
            contact us
          </Link>. We’re here to help.
        </p>

        <p className="text-muted mt-4">
          Thank you for using <strong>{MainInfo.brandName}</strong>. We appreciate your trust and readership.
        </p>
      </div>
    </PageLayout>
  );
};

export default TermsOfServicePage;
