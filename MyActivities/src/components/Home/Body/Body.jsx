import { useNavigate } from 'react-router-dom';
import './Body.css'; 
import news from '../../../assets/news.png';

function Body() {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Movies',
      image: 'https://cdn-icons-png.flaticon.com/512/3163/3163478.png', 
      link: '/movies',
    },
    {
      title: 'Games',
      image: 'https://cdn-icons-png.flaticon.com/512/4712/4712103.png', 
      link: '/games',
    },
    {
        title: 'News',
        image: news,
        link: '/news',
    }
  ];

  return (
    <div className="home-section">
      <h2 className="section-title">Explore Categories</h2>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div
            className="custom-card"
            key={index}
            onClick={() => navigate(card.link)}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
