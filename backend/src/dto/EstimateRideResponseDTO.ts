import { DirectionsResponseData } from "@googlemaps/google-maps-services-js"

export interface EstimatedRideResponseDTO {
    origin: {
        latitude: number,
        longitude: number
    },
    destination: {
        latitude: number,
        longitude: number
    },
    distance: number,
    duration: string,
    options: rideOption[],
    routeResponse: DirectionsResponseData
}

interface rideOption {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: {
        rating: string,
        comment: string
    },
    value: number
} 