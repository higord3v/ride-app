import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client } from "@googlemaps/google-maps-services-js";
import { EstimatedRideResponseDTO } from 'src/dto/EstimateRideResponseDTO';
import { EstimateRideRequestDTO } from 'src/dto/EstimateRideRequestDTO';
import { ConfirmRideRequestDTO } from 'src/dto/ConfirmRideRequestDTO';
import { Ride } from '@prisma/client';
import { RideHistoryResponseDTO } from 'src/dto/RideHistoryResponseDTO';

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

      const estimatedRide = await this.prisma.estimatedRide.create({
        data: {
          customerId: estimateRideDTO.customer_id,
          originLat: response.data.routes[0].legs[0].start_location.lat,
          destinationLat: response.data.routes[0].legs[0].end_location.lat,
          originLng: response.data.routes[0].legs[0].start_location.lng,
          destinationLng: response.data.routes[0].legs[0].end_location.lng,
          distance: response.data.routes[0].legs[0].distance.value,
          duration: response.data.routes[0].legs[0].duration.text,
        },
      });

      const drivers = await this.prisma.driver.findMany({
        where: {
          minDistance: {
            lte: estimatedRide.distance,
          },
        },
        });
      const options = drivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.rating,
          comment: driver.description,
        },
        value: driver.price * estimatedRide.distance,
      }));

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
        options: options,
        routeResponse: response.data
      }
    } catch (error) {
      return error.response.data;
    }
  }

  async confirmRide(@Body() confirmRideDTO: ConfirmRideRequestDTO): Promise<boolean> {
    try {

      const selectedDriver = await this.prisma.driver.findUnique({
        where: {
          id: confirmRideDTO.driver.id,
        },
      });
      if (!selectedDriver) {
        throw new HttpException({
          error_code: "DRIVER_NOT_FOUND",
          error_description: "Driver not found",
          status: HttpStatus.NOT_FOUND
        }, null);
      }
      
      const validDriverDistance = selectedDriver.minDistance <= confirmRideDTO.distance;

      if (!validDriverDistance) {
        throw new HttpException({
          error_code: "INVALID_DISTANCE",
          error_description: "Driver is out of range",
          status: HttpStatus.NOT_ACCEPTABLE
        }, null);
      }

      await this.prisma.ride.create({
        data: {
          customerId: confirmRideDTO.customer_id,
          driverId: confirmRideDTO.driver.id,
          origin: confirmRideDTO.origin,
          destination: confirmRideDTO.destination,
          distance: confirmRideDTO.distance,
          duration: confirmRideDTO.duration,
          value: confirmRideDTO.value,
        },
      });

      return true;
    } catch (error) {
      if (error.response) {
        throw new HttpException({
          error_code: error.response.error_code,
          error_description: error.response.error_description
      }, error.response.status);
      }
      console.log(error)
    }
  }

  async ridesHistory(customerId: string, driverId?: string): Promise<RideHistoryResponseDTO> {
    try {

      if (driverId) {
        const driverExists = await this.prisma.driver.findUnique({
          where: {
            id: Number(driverId)
          }
        })

        if (!driverExists) {
          throw new HttpException({
            error_code: "INVALID_DRIVER",
            error_description: "Driver not found",
            status: HttpStatus.BAD_REQUEST
          }, null);
        }
        

        const rides = await this.prisma.ride.findMany({
          where: {
            customerId: {
              equals: Number(customerId)
            },
            driverId: {
              equals: Number(driverId)
            }
          },
        })

        if (rides.length === 0) {
          throw new HttpException({
            error_code: "NO_RIDES_FOUND",
            error_description: "Rides not found",
            status: HttpStatus.NOT_FOUND
          }, null);
        }
      }
      
      const rides = await this.prisma.ride.findMany({
        where: {
          customerId: {
            equals: Number(customerId)
          },
        },
        include: {
          driver: true
        },
      })

      if (rides.length === 0) {
        throw new HttpException({
          error_code: "NO_RIDES_FOUND",
          error_description: "Rides not found",
          status: HttpStatus.NOT_FOUND
        }, null);
      }

      return {
        customer_id: Number(customerId),
        rides: rides.map(r => {
          return {
            id: r.id,
            origin: r.origin,
            destination: r.destination,
            date: r.createdAt,
            distance: r.distance,
            duration: r.duration,
            driver: {
              id: r.driver.id,
              name: r.driver.name,
            },
            value: r.value,
          }
        })
      };
    } catch (error) {
      throw new HttpException({
        error_code: error.response.error_code,
        error_description: error.response.error_description
      }, error.response.status);
    }
  }
}
