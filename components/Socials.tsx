import React from 'react';

interface SocialProps {
    socials?: Array<{}>;
}

const brands = [
    {
        name: 'Facebook',
        url: 'facebook.com/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                <path d="M22.5 0c.83 0 1.5.67 1.5 1.5v21c0 .83-.67 1.5-1.5 1.5h-6v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9H1.5A1.5 1.5 0 0 1 0 22.5v-21C0 .67.67 0 1.5 0h21z" />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        url: 'twitter.com/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                <path d="M20 0a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h16zm-4.42 5.8a3.28 3.28 0 0 0-3.2 4.03A9.32 9.32 0 0 1 5.61 6.4a3.26 3.26 0 0 0 1.02 4.38 3.27 3.27 0 0 1-1.49-.4v.03a3.28 3.28 0 0 0 2.64 3.22 3.3 3.3 0 0 1-1.49.06 3.29 3.29 0 0 0 3.07 2.28 6.59 6.59 0 0 1-4.86 1.36 9.29 9.29 0 0 0 5.03 1.47c6.04 0 9.34-5 9.34-9.34v-.42a6.65 6.65 0 0 0 1.63-1.7c-.59.26-1.22.44-1.89.52.68-.41 1.2-1.05 1.45-1.82-.64.38-1.34.65-2.09.8a3.28 3.28 0 0 0-2.4-1.04z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        url: 'instagram.com/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                <path d="M20 0a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h16zm-4.89 4.5H8.9C6.33 4.5 4.6 6.15 4.5 8.66V15.09c0 1.3.42 2.41 1.27 3.23a4.34 4.34 0 0 0 2.88 1.17l.27.01h6.16c1.3 0 2.4-.42 3.18-1.18a4.25 4.25 0 0 0 1.23-2.95l.01-.26V8.9c0-1.28-.42-2.36-1.21-3.15a4.24 4.24 0 0 0-2.92-1.23l-.26-.01zm-6.2 1.4h6.24c.9 0 1.66.26 2.2.8.47.5.77 1.18.81 1.97V15.1c0 .94-.32 1.7-.87 2.21-.5.47-1.17.74-1.98.78H8.92c-.91 0-1.67-.26-2.21-.78-.5-.5-.77-1.17-.81-2V8.88c0-.9.26-1.66.8-2.2a2.98 2.98 0 0 1 2-.78h6.45-6.23zM12 8.1a3.88 3.88 0 0 0 0 7.74 3.88 3.88 0 0 0 0-7.74zm0 1.39a2.5 2.5 0 0 1 2.48 2.48A2.5 2.5 0 0 1 12 14.45a2.5 2.5 0 0 1-2.48-2.48A2.5 2.5 0 0 1 12 9.49zm4.02-2.36a.88.88 0 1 0 0 1.76.88.88 0 0 0 0-1.76z" />
            </svg>
        ),
    },
    {
        name: 'Youtube',
        url: 'youtube.com/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                <path d="M20 0a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h16zm-7.7 7h-.6l-1.1.01c-1.48.03-3.7.1-4.46.29-.65.16-1.15.65-1.33 1.26-.18.64-.25 1.7-.29 2.46l-.02.82v.75c.03.76.1 2.09.31 2.85.18.61.68 1.1 1.33 1.26.74.19 2.87.26 4.34.29l1.41.01h1.16c1.45-.03 4-.09 4.81-.3a1.84 1.84 0 0 0 1.33-1.26c.2-.75.28-2.05.3-2.82v-.93c0-.67-.06-2.26-.3-3.13a1.84 1.84 0 0 0-1.33-1.26 25.9 25.9 0 0 0-3.88-.28L12.3 7zM10.46 9.9L14.39 12l-3.92 2.11V9.89z" />
            </svg>
        ),
    },
];

function Socials(props: SocialProps): JSX.Element {
    const { socials } = props;

    function socialIcon(social: String) {
        const brand = brands.find((brand: any) => social.includes(brand.url));

        return brand ? (
            brand.icon
        ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" />
            </svg>
        );
    }

    return (
        <div className="socials">
            {socials &&
                socials.map((social: string) => (
                    <a target="_blank" href={social}>
                        {socialIcon(social)}
                    </a>
                ))}
        </div>
    );
}

export default Socials;
