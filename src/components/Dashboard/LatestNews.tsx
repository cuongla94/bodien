import React from 'react';
import Link from 'next/link';
import { HomeSection, HomeHeader, HomeTitle, HomeSeeMore } from './styles';
import { AppLinks } from 'config/navigation-config';
import { CardItem } from 'components/CardItem';

interface NewsCardProps {
  title: string;
  description?: string;
  author?: string;
  url: string;
  source?: string;
  image?: string;
  published_at: string;
}

interface LatestNewsProps {
  articles: NewsCardProps[];
}

export const LatestNews: React.FC<LatestNewsProps> = ({ articles }) => {
  const sortedArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 6);

  return (
    <HomeSection className="container">
      <HomeHeader className="d-flex justify-content-between align-items-end mb-3">
        <HomeTitle className="mb-0">Latest News</HomeTitle>
        <Link href={AppLinks.news.link} passHref>
          <HomeSeeMore>See more</HomeSeeMore>
        </Link>
      </HomeHeader>
      <div className="row g-4">
        {sortedArticles.map((article) => (
          <div key={article.url} className="col-12 col-sm-6 col-lg-4">
            <CardItem
              type="news"
              title={article.title}
              description={article.description}
              author={article.author}
              source={article.source}
              image={article.image}
              date={article.published_at}
              url={article.url}
            />
          </div>
        ))}
      </div>
    </HomeSection>
  );
};
