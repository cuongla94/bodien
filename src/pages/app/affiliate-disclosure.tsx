import { Breadcrumbs } from 'common/Breadcrumbs';
import { AffiliatePrograms, MainInfo } from 'config/main-config';
import PageLayout from 'layouts/PageLayout';
import React from 'react';

const AffiliateDisclosurePage = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Affiliate Disclosure' }
    ];

  return (
    <PageLayout>
        <div className='mt-5'>
            <Breadcrumbs items={breadcrumbItems} className="mb-3" />
            <h2 className="mb-4">Affiliate Disclosure</h2>

            <p>
            At <strong>{MainInfo.brandName}</strong>, we believe in transparency and honesty. To comply with the Federal Trade Commission (FTC) guidelines and earn your trust, this page outlines how affiliate links work on our site.
            </p>

            <h4 className="mt-4 mb-2 text-secondary">What Are Affiliate Links?</h4>
            <p>
            Some links on our website are affiliate links. This means if you click on one and make a purchase, we may earn a small commission — at no extra cost to you. These commissions support our ability to provide quality, unbiased tech content.
            </p>

            <h4 className="mt-4 mb-2 text-secondary">Why We Use Them</h4>
            <ul>
            <li>💡 To fund high-quality, reader-focused content.</li>
            <li>🧪 To test and review products in-depth before recommending them.</li>
            <li>💬 To keep our website free and accessible for everyone.</li>
            </ul>

            <h4 className="mt-4 mb-2 text-secondary">Our Promise to You</h4>
            <ul>
            <li>✅ We only promote products we personally trust or would use ourselves.</li>
            <li>✅ Affiliate relationships do not influence our editorial decisions or reviews.</li>
            <li>✅ You pay the same price — or sometimes even get a discount — through our links.</li>
            <li>✅ We never accept compensation in exchange for positive reviews.</li>
            </ul>

            <h4 className="mt-4 mb-2 text-secondary">Who We Partner With</h4>
            <p>We are currently partnered with the following affiliate programs (among others):</p>
            <ul>
                {AffiliatePrograms.map(item => (
                     <li>🔗 {item}</li>
                ))}
            </ul>

            <p>
            Any product page or blog post containing affiliate links will have a brief disclosure statement near the top or before the first link.
            </p>

            <h4 className="mt-4 mb-2 text-secondary">Why This Matters</h4>
            <p>
            Supporting our site by using affiliate links allows us to keep delivering in-depth, ad-free tech content you can rely on. It helps us remain independent and accountable only to you — our readers.
            </p>

            <h4 className="mt-4 mb-2 text-secondary">Have Questions?</h4>
            <p>
            Transparency is key. If you ever have questions about our affiliate links, how we earn money, or how we choose the products we review —{' '}
            <a href="/contact" className="text-decoration-underline">please get in touch</a>. We're happy to explain.
            </p>

            <p className="text-muted mt-4">
            Thank you for your trust and support. ❤️ — The <strong>[Your Blog Name]</strong> Team
            </p>
        </div>
    </PageLayout>
  );
};

export default AffiliateDisclosurePage;
