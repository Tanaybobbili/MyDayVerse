import React, { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5fadd7e76d7a43429449bd605199a54f')
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched:", data);
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        console.warn("No articles found.");
        setArticles([]);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("API fetch error:", err);
      setLoading(false);
    });
}, []);


  return (
    <div className="news-container">
      <h1>Latest News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
