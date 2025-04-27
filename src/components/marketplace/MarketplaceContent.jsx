// src/components/MarketplaceContent.jsx
import './MarketplaceContent.css';
import Carousel from '../carousel/Carousel';

const MarketplaceContent = ({ items }) => {
  return (
    <>
    <div className="marketplace">
      <h2>Marketplace</h2>
      <p>Compra artículos para tus aventuras.</p>

      <div className="marketplace-container">
        {items.map(item => (
          <div key={item._id} className="marketplace-card">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price}€</p>
          </div>
        ))}
      </div>

      <Carousel />
    </div>
    </>
  );
};

export default MarketplaceContent;