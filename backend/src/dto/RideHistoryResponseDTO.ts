interface rideOption {
    id: number;
    origin: string;
    destination: string;
    date: Date;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    }
    value: number;
}

export interface RideHistoryResponseDTO {
    customer_id: number;
    rides: rideOption[]
}