import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
    window.open(url, '_blank');
  };

  return (
    <HomeSection className="container">
      <SectionHeader
        title={HomeConfig.newsTitle}
        hideLink={false}
        href={AppLinks.news.link}
      />
      <Row className="g-4 align-items-stretch mt-4">
        {sortedArticles.map((article) => (
          <Col key={article.url} xs={12} md={6} className="d-flex">
            <CardItem
              mode="horizontal"
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
          </Col>
        ))}
      </Row>
    </HomeSection>
  );
};
