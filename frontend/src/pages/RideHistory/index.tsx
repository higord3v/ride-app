import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./styles.css";


export const RideHistory = () => {
  const [rides, setRides] = useState([]);
  let { customerId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:80/ride/${customerId}`);
        if (response.ok) {
          const data = await response.json();
          setRides(data.rides);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center container">
      <h3 className="text-2xl mb-5">Histórico de Corridas</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Motorista</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Distância (KM)</th>
            <th>Duração</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride: any) => (
            <tr key={ride.id}>
              <td>
                {new Date(ride.date).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>
                {new Date(ride.date).toLocaleString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>{ride.driver.name}</td>
              <td>{ride.origin}</td>
              <td>{ride.destination}</td>
              <td>{(ride.distance / 1000).toFixed(2)}</td>
              <td>{ride.duration}</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(ride.value / 100000)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
