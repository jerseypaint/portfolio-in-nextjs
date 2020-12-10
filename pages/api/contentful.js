const PORTFOLIO_FIELDS = `
slug
title
subtitle
coverImage {
  url
}
heroImage {
    url
  }
description
technologiesCollection {
  items {
    name
  }
}
introduction {
  json
}
imageGalleryCollection {
  items {
    url
    width
    height
    description
  }
}
conclusion {
    json
  }
`

const HOME_FIELDS = `
    slug
    title
    coverImage {
        url
    }
    description
`

const ABOUT_FIELDS = `
title
subtitle
me {
  url
}
email
socials {
    name
    link
    icon {
        url
    }
}
featuredImage {
    url
}
bio {
    json
  }
skillsCollection {
  items {
    name
  }
}
technologiesCollection {
    items {
      name
    }
  }
  portfolioCollection {
    items {
      slug
      title
      coverImage {
          url
      }
      description
    }
  }
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractPortfolioItem(fetchResponse) {
  return fetchResponse?.data?.portfolioItemCollection?.items?.[0]
}

function extractPortfolio(fetchResponse) {
  return fetchResponse?.data?.portfolioItemCollection?.items
}

function extractAboutPage(fetchResponse) {
    return fetchResponse?.data?.aboutPageCollection?.items?.[0]
}

export async function getPreviewItemBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
     portfolioItemCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${PORTFOLIO_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPortfolioItem(entry)
}

export async function getAllItemsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
     portfolioItemCollection(where: { slug_exists: true }) {
        items {
         slug
        }
      }
    }`
  )
  return extractPortfolio(entries)
}

export async function getPortfolioForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
     portfolioItemCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${HOME_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPortfolio(entries)
}

export async function getPortfolioItem(slug, preview) {
    const entry = await fetchGraphQL(
      `query {
       portfolioItemCollection(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
          items {
            ${PORTFOLIO_FIELDS}
          }
        }
      }`,
      preview
    )
    return {
      post: extractPortfolioItem(entry),
    }
  }

  export async function getAboutPage(preview) {
    const entry = await fetchGraphQL(
      `query {
       aboutPageCollection(preview: ${preview ? 'true' : 'false'}, limit: 1) {
          items {
            ${ABOUT_FIELDS}
          }
        }
      }`,
      preview
    )
    return {
        post: extractAboutPage(entry),
        portfolio: extractPortfolio(entry)
      }
  }

  export async function getPortfolioForAbout(preview) {
    const entries = await fetchGraphQL(
      `query {
       portfolioItemCollection(preview: ${preview ? 'true' : 'false'}, limit: 3) {
          items {
            ${HOME_FIELDS}
          }
        }
      }`,
      preview
    )
    return extractPortfolio(entries)
  }