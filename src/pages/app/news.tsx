import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PageLayout from 'layouts/PageLayout';
import { PageTitle } from 'common/PageTitle';
import { CardItem } from 'components/CardItem';
import { fetchArticlesFromSupabase, TechNewsRow } from 'utils/news';
import { NewsFilters } from 'components/NewsFilters';

const NewsPage = () => {
  const [articles, setArticles] = useState<TechNewsRow[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<TechNewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: '',
    source: '',
    published_at: '',
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allSources, setAllSources] = useState<string[]>([]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tech News' },
  ];

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchArticlesFromSupabase();
        if (data) {
          setArticles(data);
          setFilteredArticles(data);

          const categories = Array.from(new Set(data.map((item) => item.category).filter(Boolean)));
          const sources = Array.from(new Set(data.map((item) => item.source).filter(Boolean)));

          setAllCategories(categories);
          setAllSources(sources);
        }
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    const { category, source, published_at } = filters;

    let filtered = articles.filter((article) => {
      const matchesCategory = category ? article.category === category : true;
      const matchesSource = source ? article.source === source : true;

      return matchesCategory && matchesSource;
    });

    if (published_at === 'asc') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
      );
    } else if (published_at === 'desc') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    }

    setFilteredArticles(filtered);
  }, [filters, articles]);

  return (
    <PageLayout>
      <PageTitle title="Tech News" breadcrumbs={breadcrumbItems} />

      <Container className="mt-5">
        <NewsFilters
          filters={filters}
          setFilters={setFilters}
          allCategories={allCategories}
          allSources={allSources}
        />

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-muted">No articles found.</p>
        ) : (
          <Row className="g-4 mt-4">
            {filteredArticles.map((article, idx) => (
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
