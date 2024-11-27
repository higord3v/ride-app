import { useLocation, useNavigate, useParams } from "react-router";
import map from "../../assets/map.png";
import { Carousel } from "../../components/Carousel";
import { useEffect } from "react";

export const RideOptions = () => {
  const { state } = useLocation();
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) {
      navigate("/not-found");
    }
  }, []);

  return state && (
    <div className="flex flex-col items-center justify-center container">
      <h1 className="text-4xl mb-2">Opções de Viagem</h1>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-stretch">
          <Carousel state={state} customerId={Number(params.customerId)} />
        </div>
        <img
          src={map}
          alt="mapa ilustrativo"
          style={{ maxHeight: "300px" }}
          width={300}
        />
      </div>
    </div>
  );
};
