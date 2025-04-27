import { useEffect, useState } from 'react';
import axios from 'axios';
import MarketplaceContent from '../components/marketplace/MarketplaceContent';

const Marketplace = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/marketplace`)
      .then(res => setItems(res.data));
  }, []);

  return <MarketplaceContent items={items} />;
};

export default Marketplace;