import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PageLayout from 'layouts/PageLayout';
import { PageTitle } from 'common/PageTitle';
import { CardItem } from 'components/CardItem';
import { fetchArticlesFromSupabase, TechNewsRow } from 'utils/news';
import { NewsFilters } from 'components/News/NewsFilters';
import { Spinner } from 'common/Spinner';

const ARTICLES_PER_LOAD = 12;

const NewsPage = () => {
  const [articles, setArticles] = useState<TechNewsRow[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<TechNewsRow[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<TechNewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    source: '',
    published_at: '',
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allSources, setAllSources] = useState<string[]>([]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tech News' },
  ];

  // Load all articles once
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

  // Filter logic
  useEffect(() => {
    const { category, source, published_at } = filters;

    let filtered = articles.filter((article) => {
      const matchesCategory = category ? article.category === category : true;
      const matchesSource = source ? article.source === source : true;
      return matchesCategory && matchesSource;
    });

    if (published_at === 'asc') {
      filtered = [...filtered].sort((a, b) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
      );
    } else if (published_at === 'desc') {
      filtered = [...filtered].sort((a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    }

    setFilteredArticles(filtered);
    setDisplayedArticles(filtered.slice(0, ARTICLES_PER_LOAD));
  }, [filters, articles]);

  // Load more on scroll into view
  const loadMore = useCallback(() => {
    if (loadingMore || displayedArticles.length >= filteredArticles.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextChunk = filteredArticles.slice(
        displayedArticles.length,
        displayedArticles.length + ARTICLES_PER_LOAD
      );
      setDisplayedArticles((prev) => [...prev, ...nextChunk]);
      setLoadingMore(false);
    }, 300); // simulate async
  }, [filteredArticles, displayedArticles, loadingMore]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMore]);

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
          <div className="text-center my-5">
            <Spinner />
          </div>
        ) : filteredArticles.length === 0 ? (
          <p className="text-muted">No articles found.</p>
        ) : (
          <>
            <Row className="g-4 mt-4">
              {displayedArticles.map((article, idx) => (
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
                    onReadMoreClick={() => window.open(article.url, '_blank')}
                  />
                </Col>
              ))}
            </Row>

            {/* Load more spinner */}
            <div ref={observerRef} className="text-center mt-4 mb-5">
              {loadingMore && <Spinner />}
            </div>
          </>
        )}
      </Container>
    </PageLayout>
  );
};

export default NewsPage;
