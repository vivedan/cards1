const path = require('path');

exports.createPages = async ({ graphql, actions }) => {

    const { data } = await graphql(`
        query Cards {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        company
                        slug
                    }
                }
            }
        }
    `)

    data.allMarkdownRemark.nodes.forEach(node => {
        actions.createPage({
            path: node.frontmatter.company + '/' + node.frontmatter.slug,
            component: path.resolve('./src/templates/card-standard-template.js'),
            context: {
                slug: node.frontmatter.slug
            }
        })
    })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    //if (stage.startsWith("build-javascript")) {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-spring/,
              sideEffects: true
            },
            {
              test: /\.glb$/,
              use: [
                `url-loader`,
              ],
            }
          ]
        }
      })
    //}
}