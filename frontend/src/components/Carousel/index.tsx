import React from 'react'
import { DriverCard } from '../DriverCard';
type Driver = {
    id: number;
    description: string;
    name: string;
    vehicle: string;
    rating: string;
    value: number;
    review: { rating: string };
  };

interface CarouselProps {
  state: any;
  customerId: number
}
export const Carousel = ({ state, customerId }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  

    return (
      <div className="carousel">
            {state.options.map((option: Driver, index: number) => (
              <div
                key={index}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
               <DriverCard
                  description={option.description}
                  name={option.name}
                  vehicle={option.vehicle}
                  rating={option.review.rating}
                  value={option.value}
                  rideData={{
                    id: customerId,
                    origin: state.origin,
                    destination: state.destination,
                    distance: state.distance,
                    duration: state.duration,
                    
                    driverId: option.id,
                    driverName: option.name,
                    value: option.value,
                  }}
                />
              </div>
              ))}
              <div className="flex justify-between" style={{display: state.options.length > 1 ? "flex" : "none"}}>
              <button  onClick={() => setActiveIndex((activeIndex - 1 + state.options.length) % state.options.length)}>anterior</button>
              <button onClick={() => setActiveIndex((activeIndex + 1) % state.options.length)}>próximo</button>
              </div>
          </div>
  )
}
