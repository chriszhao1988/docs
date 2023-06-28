// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Treasurenet Documentation',
    tagline: 'Treasurenet Built on Real-World Rare Assets.',
    url: 'https://docs.treasurenet.io',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'treasurenetprotocol', // Usually your GitHub org/user name.
    projectName: 'treasurenetDoc', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['en', 'zh-Hans'],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/treasurenetprotocol/docs/blob/master',
                },
                blog: {
                    showReadingTime: false,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/treasurenetprotocol/docs/blob/master',
                    feedOptions: {
                        type: 'rss',
                        copyright: `Copyright © ${new Date().getFullYear()} Treasurenet Foundation, Inc.`,
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: 'Treasurenet Docs',
                logo: {
                    alt: 'treasurenet',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'about/introduction',
                        position: 'left',
                        label: 'Tutorial',
                    },
                    {
                        type: 'doc',
                        docId: 'api/intro',
                        position: 'left',
                        label: 'API',
                    },
                    {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        href: 'https://github.com/treasurenetprotocol',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/about/introduction',
                            },
                            {
                                label: 'API',
                                to: '/docs/api/intro',
                            },
                        ],
                    },
                    {
                        title: 'Produces',
                        items: [
                            {
                                label: 'Treasurenet',
                                href: 'https://www.treasurenet.io',
                            },
                            {
                                label: 'Treasurenet Faucet',
                                href: 'https://faucet.treasurenet.io',
                            },
                            {
                                label: 'Producer Cert',
                                href: 'https://mplatform.treasurenet.io',
                            },
                            {
                                label: 'Service Platform',
                                href: 'https://splatform.treasurenet.io',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discord.com/channels/990530508834340905/990530510746964004',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/treasurenet_io',
                            },
                            {
                                label: 'Telegram',
                                href: 'https://t.me/+hN6G5mGAlD8xMmI5',
                            }
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/treasurenetprotocol',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Treasurenet Foundation, Inc.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
