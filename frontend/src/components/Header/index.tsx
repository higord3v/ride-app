import { useNavigate } from "react-router";

export const Header = () => {
    const navigate = useNavigate();
  return (
    <div className='flex bg-black text-white justify-center p-4'>
      <h1 className='text-2xl cursor-pointer' onClick={() => navigate("/")}>Ride App</h1>
    </div>
  )
}
