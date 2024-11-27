import { useParams } from "react-router";
import "./styles.css";
import { Input } from "../../components/Input";
import toast from "react-hot-toast";
import { useState } from "react";


export const RideHistory = () => {
  const [rides, setRides] = useState([]);
  let { customerId } = useParams();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const { target } = e as any;
    try {
      const response = await fetch(`http://localhost:8080/ride/${target[0].value}${target[1].value ? `?driver_id=${target[1].value}` : ""}`);
      if (response.ok) {
        const data = await response.json();
        setRides(data.rides);
      }else {
        toast.error("Nenhuma corrida encontrada");
        setRides([]);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center container table-container">
        <h3 className="text-2xl mb-5">Histórico de Corridas</h3>
      <div className="flex w-full justify-center items-start gap-10">
        <form onSubmit={handleClick} className="flex gap-2 items-center">
        <span>Pesquisar</span>
        <Input
          type="number"
          key={customerId}
          name="customer_id"
          placeholder="ID Cliente"
          />
        <select name="drivers" id="driver-select" className="bg-gray-200 outline-none p-2 rounded-md">
          <option value="">QUALQUER</option>
          <option value="1">Hommer</option>
          <option value="3">Dominic Torreto</option>
          <option value="2">James Bond</option>
        </select>
        <button
          type="submit"
          className=" w-1/4 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md"
          >
          Escolher
        </button>
          </form>
      </div>
      {rides.length > 0 ? (
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
      ) : (
        null
      )}
    </div>
  );
};
