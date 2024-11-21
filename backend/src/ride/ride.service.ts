import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client } from "@googlemaps/google-maps-services-js";
import { EstimatedRideResponseDTO } from 'src/dto/EstimatedRideResponseDTO';
import { EstimateRideRequestDTO } from 'src/dto/EstimateRideRequestDTO';

@Injectable()
export class RideService {

  private client: Client;

  constructor(private prisma: PrismaService) {
    this.client = new Client({});
  }
  async estimateRide(@Body() estimateRideDTO: EstimateRideRequestDTO): Promise<EstimatedRideResponseDTO> {
    try {
      const response = await this.client.directions({
        params: {
          origin: estimateRideDTO.origin,
          destination: estimateRideDTO.destination,
          key: process.env.GOOGLE_API_KEY,
        },
      });

      const customerExists = await this.prisma.customer.findUnique({
        where: {
          id: estimateRideDTO.customer_id,
        },
      });
      if (!customerExists) {
        await this.prisma.customer.create({
          data: {
            id: estimateRideDTO.customer_id,
          },
        });
      }

      const estimatedRide = await this.prisma.estimatedRides.create({
        data: {
          customerId: estimateRideDTO.customer_id,
          originLat: response.data.routes[0].legs[0].start_location.lat,
          destinationLat: response.data.routes[0].legs[0].end_location.lat,
          originLng: response.data.routes[0].legs[0].start_location.lng,
          destinationLng: response.data.routes[0].legs[0].end_location.lng,
          distance: response.data.routes[0].legs[0].distance.value,
          duration: response.data.routes[0].legs[0].duration.value,
        },
      });

      return {
        distance: estimatedRide.distance,
        duration: response.data.routes[0].legs[0].duration.text,
        origin: {
          latitude: estimatedRide.originLat,
          longitude: estimatedRide.originLng,
        },
        destination: {
          latitude: estimatedRide.destinationLat,
          longitude: estimatedRide.destinationLng,
        },
        options: [],
        routeResponse: response.data
      }
    } catch (error) {
      return error.data;
    }
  }
}
