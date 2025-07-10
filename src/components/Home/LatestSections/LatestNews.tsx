import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { HomeSection } from '../styles';
import { AppLinks } from 'config/navigation-config';
import { CardItem } from 'components/CardItem';
import { SectionHeader } from 'common/SectionHeader';
import { HomeConfig } from 'config/home-config';
import { LatestNewsNavControls } from './styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    .slice(0, 18);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleReadMore = (url: string) => {
    window.open(url, '_blank');
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <HomeSection className="container">
      <SectionHeader title="What today's news" href={`${AppLinks.news.link}?sort=desc`} isNews>
        <LatestNewsNavControls>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            <FaArrowLeft />
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            <FaArrowRight />
          </button>
        </LatestNewsNavControls>
      </SectionHeader>
      <Row className="g-4 align-items-stretch mt-4">
        {paginatedArticles.map((article) => (
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
