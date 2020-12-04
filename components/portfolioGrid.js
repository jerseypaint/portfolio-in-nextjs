import PortfolioItem from "./portfolioItem"

export default function PortfolioGrid({portfolio}) {
    return (
        <div className={'md:grid grid-cols-2 gap-4'}>
            {portfolio.map((item, key) => (
                <PortfolioItem imageUrl={item.coverImage.url} title={item.title} description={item.description} slug={item.slug} key={`${item.title}-${key}`} />
            ))}
        </div>
    )
  }
   