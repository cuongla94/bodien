import { Breadcrumbs } from 'common/Breadcrumbs';
import PageLayout from 'layouts/PageLayout';
import { MainInfo } from 'config/main-config';
import React from 'react';

const AccessibilityDisclaimerPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Accessibility Statement' }
  ];

  return (
    <PageLayout>
      <div className="mt-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        <h2 className="mb-4">Accessibility Statement</h2>

        <p>
          <strong>{MainInfo.brandName}</strong> is committed to making our website accessible to all individuals, regardless of ability or technology. We continuously strive to improve the user experience for everyone.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Our Accessibility Goals</h4>
        <ul>
          <li>✅ Ensure all users can access essential content and features.</li>
          <li>✅ Follow best practices for accessibility outlined in WCAG 2.1 standards.</li>
          <li>✅ Regularly test and update our site for usability improvements.</li>
        </ul>

        <h4 className="mt-4 mb-2 text-secondary">Ongoing Improvements</h4>
        <p>
          We regularly audit and improve our site based on accessibility tools and user feedback. Technologies we consider include screen readers, keyboard navigation, and color contrast tools.
        </p>

        <h4 className="mt-4 mb-2 text-secondary">Contact Us</h4>
        <p>
          If you encounter any difficulty accessing our site or have suggestions on how we can do better, please{' '}
          <a href="/contact" className="text-decoration-underline">contact us</a>. Your feedback is valuable in helping us serve everyone better.
        </p>

        <p className="text-muted mt-4">
          Thank you for helping us build an inclusive and accessible digital space. 💙
        </p>
      </div>
    </PageLayout>
  );
};

export default AccessibilityDisclaimerPage;
