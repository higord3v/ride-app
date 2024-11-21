import { Body, Injectable } from '@nestjs/common';
import {instance} from "../http/axios";
import { Client } from "@googlemaps/google-maps-services-js";

@Injectable()
export class RideService {

  private client: Client;

  constructor() {
    this.client = new Client({});
  }
  async estimateRide(@Body() estimateRideDTO: EstimateRideDTO): Promise<any> {
    try {
      const response = await this.client.directions({
        params: {
          origin: estimateRideDTO.origin,
          destination: estimateRideDTO.destination,
          key: process.env.GOOGLE_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error: "+error.response.data.error_message)
      throw new Error(`Failed to calculate route: ${error.message}`);
    }
  }
}
