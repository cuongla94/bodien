const appRoute = '/app';
const legalRoute = `${appRoute}/legal`;

export const AppLinks = {
    home: {
        title: 'Home',
        link: '/'
    },
    news: {
        title: 'News',
        link: `${appRoute}/news`
    },
    blogs: {
        title: 'Blogs',
        link: `${appRoute}/blogs`
    },
    // contact: {
    //     title: 'Contact',
    //     link: `${appRoute}/contact-us`
    // }
}

export const LegalLinks = {
    affiliateDisclosure: {
        title: 'Affiliate Disclosure',
        link: `${legalRoute}/affiliate-disclosure`
    },
    privacyContent: {
        title: 'Privacy Content',
        link: `${legalRoute}/privacy-content`
    },
    termsOfService: {
        title: 'Terms Of Service',
        link: `${legalRoute}/terms-of-service`
    },
    accessibilityDisclaimer: {
        title: 'Accessibility Disclaimer',
        link: `${legalRoute}/accessibility-disclaimer`
    },
    disclaimer: {
        title: 'Disclaimer',
        link: `${legalRoute}/disclaimer`
    }
}

export const AdminLinks = {
    edit: {
        title: 'Edit',
        link: `/admin/blogs/edit/`
    }
}
