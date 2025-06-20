import React, { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5fadd7e76d7a43429449bd605199a54f')
      .then((res) => res.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setError("No news articles found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter(article =>
    (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="news-container">
      <h1>📰 Latest Headlines</h1>

      <input
        type="text"
        className="news-search"
        placeholder="Search News..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="loader">Loading News...</div>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div className="news-grid">
          {filteredArticles.length === 0 ? (
            <p>No results match your search.</p>
          ) : (
            filteredArticles
              .filter(article => article.description || article.urlToImage)
              .map((article, index) => (
                <div key={index} className="news-card">
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt="news" className="news-image" />
                  )}
                  <div className="news-content">
                    <h2>{article.title}</h2>
                    <p>{article.description || 'No description available.'}</p>
                    <p className="news-meta">
                      <span>{article.source.name}</span> •{' '}
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read more →
                    </a>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default News;
