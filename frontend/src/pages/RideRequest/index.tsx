import React, { useState } from "react";
import { Input } from "../../components/Input";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";

export const RideRequest = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    customerId: "",
  });

  let navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:80/ride/estimate/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              origin: form.origin,
              destination: form.destination,        
              customer_id: Number(form.customerId)
            }),
          })
          
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.error_description);              
          }

          toast.success("Corrida estimada com sucesso");
          navigate(`/options/${form.customerId}`, {
            state: {
              options: data.options,
              origin: form.origin,
              destination: form.destination,
              customerId: form.customerId,
              distance: data.distance,
              duration: data.duration
            },
          });
    } catch (error: any) {
        toast.error(error.message);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center container">
      <h3 className="text-4xl mb-20">Estimar Corrida</h3>
      <form className="w-1/2 flex flex-col items-center gap-3" onSubmit={handleSubmit}>

      <Input
        name="customerId"
        className="w-1/2"
        placeholder="ID do cliente"
        type="number"
        onChange={(e) => setForm({ ...form, customerId: e.target.value })}
        />
      <Input
        name="origin"
        className="w-1/2"
        placeholder="Origem"
        onChange={(e) => setForm({ ...form, origin: e.target.value })}
        />
      <Input
        name="destination"
        className="w-1/2"
        placeholder="Destino"
        onChange={(e) => setForm({ ...form, destination: e.target.value })}
        />
      <button type="submit" className="hover:bg-gray-900 bg-black text-white font-bold py-2 px-4 rounded">Enviar</button>
        </form>
    </div>
  );
};
