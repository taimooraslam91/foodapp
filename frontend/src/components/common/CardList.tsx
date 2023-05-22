import { Link } from 'react-router-dom';
import VendorCard from './VendorCard';
import { Restaurant } from '../../interfaces';

interface CardListProps {
  restaurants: Restaurant[];
}

function CardList({ restaurants }: CardListProps) {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {restaurants.map((resturant: any) => (
        <Link to={`/restaurant/${resturant?.id}`} key={`${resturant?.id}`}>
          <VendorCard resturant={resturant} />
        </Link>
      ))}
    </div>
  );
}

export default CardList;
