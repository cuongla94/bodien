import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PageLayout from 'layouts/PageLayout';
import { Breadcrumbs } from 'common/Breadcrumbs';
import { CardItem } from 'components/CardItem';
import { fetchArticlesFromSupabase, TechNewsRow } from 'utils/news';

const NewsPage = () => {
  const [articles, setArticles] = useState<TechNewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tech News' },
  ];

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchArticlesFromSupabase();
        setArticles(data || []);
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <PageLayout>
      <Container className="flex-grow-1 d-flex flex-column">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-muted">No articles found.</p>
        ) : (
          <Row className="g-4">
            {articles.map((article, idx) => (
              <Col key={idx} xs={12} sm={6} lg={4}>
                <CardItem
                  type="news"
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  source={article.source}
                  image={article.image}
                  publishedDate={article.published_at}
                  url={article.url}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </PageLayout>
  );
};

export default NewsPage;
