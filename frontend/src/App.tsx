import { useEffect, useState } from 'react'

function App() {

  const [rides, setRides] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:80/ride/1");
        if (response.ok) {
          const data = await response.json()
          setRides(data)
        }
        
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <>
      <h1>
        {rides.map((ride: any) => (
          <div key={ride.id}>
            Customer ID: {ride.customerId} - Driver ID{ride.driverId}
          </div>
        ))}
      </h1>
    </>
  )
}

export default App
