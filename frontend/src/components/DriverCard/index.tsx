import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type DriverCardProps = {
  description: string;
  name: string;
  vehicle: string;
  rating: string;
  value: number;
  rideData: {
    id: number;
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    driverId: number;
    driverName: string;
    value: number;
  }
};

export const DriverCard = ({
  description,
  name,
  vehicle,
  rating,
  value,
  rideData,
}: DriverCardProps) => {
    let navigate = useNavigate();
    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:80/ride/confirm/", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  customer_id: rideData.id,
                  origin: rideData.origin,
                  destination: rideData.destination,
                  distance: rideData.distance,
                  duration: rideData.duration,
                  value: rideData.value,
                  driver: {
                    id: rideData.driverId,
                    name: rideData.driverName
                  }
                }),
              })
              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.error_description);
              }
              navigate(`/history/${rideData.id}`);
              toast.success("Corrida solicitada com sucesso");
            } catch (error) {
            toast.error("error");
            console.log(error);
        }
    }
  return (
      <div className="bg-white p-4 rounded-lg shadow-xl w-96 hover:bg-gray-100">
        <h2 className="text-xl font-bold mb-2"><b>Nome: </b> {name}</h2>
        <p className="text-gray-600"><b>Descrição: </b> {description}</p>
        <p className="text-gray-600"><b>Veiculo: </b> {vehicle}</p>
        <p className="text-gray-600"><b>Avaliação: </b> {rating}</p>
        <p className="text-gray-600"><b>Valor: </b> {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value/100000)}</p>
        <button onClick={handleClick} type="button" className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md mt-4">Escolher</button>
      </div>
      
  );
};
