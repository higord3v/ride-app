import { useLocation, useParams } from "react-router";
import { DriverCard } from "../../components/DriverCard";

type Driver = {
    id: number;
    description: string;
    name: string;
    vehicle: string;
    rating: string;
    value: number;
    review: { rating: string };
}

export const RideOptions = () => {
    const { state } = useLocation();
    let params = useParams();
    return (
      <div className="flex flex-col gap-3 items-center justify-center container">
        <h1 className="text-4xl">Opções de Viagem</h1>
        <iframe
          width="450"
          height="250"
          style={{ border: 0 }}
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src="http://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyCcK7jhKUMjy_jdrC_joTWI0EV9NQflRT4&output=embed"
          allowFullScreen>
        </iframe>
        <div className="flex gap-2 items-stretch">
        {state ? state.options.map((option: Driver) => (
            <DriverCard
            key={option.id}
            description={option.description}
            name={option.name}
            vehicle={option.vehicle}
            rating={option.review.rating}
            value={option.value}
            rideData={{
                id: Number(params.customerId),
                origin: state.origin,
                destination: state.destination,
                distance: state.distance,
                duration: state.duration,
                driverId: option.id,
                driverName: option.name,
                value: option.value,
            }}
            />
        )): null}
        </div>
      </div>
    );
}
