'use client';

import React, { useEffect, useState } from 'react';

import PageLayout from 'layouts/PageLayout';
import { Breadcrumbs } from 'common/Breadcrums';
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
      <div className="container mt-5 mb-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-muted">No articles found.</p>
        ) : (
          <div className="row g-4">
            {articles.map((article, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4">
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
        )}
      </div>
    </PageLayout>
  );
};

export default NewsPage;
