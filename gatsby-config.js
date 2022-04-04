module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        'gatsby-transformer-remark',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `cards`,
                path: `${__dirname}/src/cards/`,
            },
        },
    ]
}