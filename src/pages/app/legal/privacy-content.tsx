import PageLayout from 'layouts/PageLayout';
import Link from 'next/link';
import React from 'react';
import { AppLinks, LegalLinks, MainInfo } from 'config';
import { getEffectiveDate } from 'utils/getDates';
import { Container } from 'react-bootstrap';
import { PageTitle } from 'common/PageTitle';

const PrivacyPolicyPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Content' }
  ];

  return (
    <PageLayout>
      <PageTitle title="Privacy Policy" breadcrumbs={breadcrumbItems} />
      <Container className="mt-5">
        <p className="text-muted">Effective Date: {getEffectiveDate()}</p>

        <p>
          At <strong>{MainInfo.brandName}</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">1. Information We Collect</h4>
        <ul>
          <li><strong>Personal Information:</strong> such as your name and email address when you sign up for newsletters or contact us.</li>
          <li><strong>Usage Data:</strong> including IP address, browser type, visited pages, and time spent on the site — collected through tools like Google Analytics.</li>
          <li><strong>Cookies:</strong> to remember your preferences, improve your experience, and track affiliate clicks.</li>
        </ul>

        <h4 className="mt-4 mb-2 text-secondary">2. How We Use Your Information</h4>
        <ul>
          <li>📬 To send newsletters (only if you opt in)</li>
          <li>🔧 To improve content and website performance</li>
          <li>📊 To analyze traffic and engagement</li>
          <li>🛒 To track affiliate commissions</li>
          <li>📥 To respond to inquiries and feedback</li>
        </ul>
        <p><strong>We never sell or share your data with third parties for marketing.</strong></p>

        <h4 className="mt-4 mb-2 text-secondary">3. Third-Party Services</h4>
        <p>We may use the following third-party tools and platforms:</p>
        <ul>
          <li>🔹 Google Analytics</li>
          <li>🔹 Email marketing tools (e.g., Mailchimp, ConvertKit)</li>
          <li>🔹 Affiliate platforms (e.g., Amazon Associates)</li>
        </ul>
        <p>These services may use cookies or similar technologies to gather user data. You can manage cookie settings in your browser.</p>

        <h4 className="mt-4 mb-2 text-secondary">4. Affiliate Links</h4>
        <p>
          We use affiliate links throughout the site. When you click a product link and make a purchase, we may earn a commission — at no additional cost to you. See our{' '}
          <Link href={LegalLinks.affiliateDisclosure.link} className="text-decoration-underline">
            {LegalLinks.affiliateDisclosure.title}
          </Link>{' '}
          for more.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">5. Your Rights</h4>
        <ul>
          <li>🔍 Access, correct, or delete your personal information</li>
          <li>🚫 Opt out of newsletters at any time</li>
          <li>📄 Request a copy of your personal data</li>
        </ul>
        <p>
          To make a request or ask questions, please{' '}
          <Link href={AppLinks.contact.link} className="text-decoration-underline">
            contact us
          </Link>.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">6. Data Security</h4>
        <p>We use standard security practices to protect your data. However, no method of transmission over the internet is 100% secure.</p>

        <h4 className="mt-4 mb-2 text-secondary">7. Changes to This Policy</h4>
        <p>This Privacy Policy may be updated occasionally. We’ll post changes here with an updated effective date at the top of the page.</p>

        <p className="text-muted mt-4">
          Thank you for trusting <strong>[Your Blog Name]</strong>. We’re committed to protecting your privacy and providing a transparent user experience.
        </p>
      </Container>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
