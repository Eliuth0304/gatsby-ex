/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
   siteMetadata: {
      title: `gatsby-hasura-app`,
      siteUrl: `https://www.yourdomain.tld`,
   },
   plugins: [
      {
         resolve: "gatsby-source-graphql",
         options: {
            typeName: "HASURA",
            fieldName: "hasura",
            url: "https://major-honeybee-52.hasura.app/v1/graphql",
         },
      },
      "gatsby-plugin-postcss",
   ],
};
