import React from 'react';
import { HomeSection } from '../styles';
import { AppLinks } from 'config/navigation-config';
import { CardItem } from 'components/CardItem';
import { SectionHeader } from 'common/SectionHeader';
import { HomeConfig } from 'config/home-config';

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

  const handleReadMore = (url: string) => {
    window.open(url, '_blank'); // opens in new tab
  };

  return (
    <HomeSection className="container">
      <SectionHeader
        title={HomeConfig.newsTitle}
        hideLink={false}
        href={AppLinks.news.link}
      />
      <div className="row g-4">
        {sortedArticles.map((article) => (
          <div key={article.url} className="col-12 col-sm-4 col-lg-3">
            <CardItem
              type="news"
              title={article.title}
              description={article.description}
              author={article.author}
              source={article.source}
              image={article.image}
              publishedDate={article.published_at}
              url={article.url}
              onReadMoreClick={() => handleReadMore(article.url)}
            />
          </div>
        ))}
      </div>
    </HomeSection>
  );
};
