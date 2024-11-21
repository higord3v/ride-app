import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimatedRideResponseDTO } from 'src/dto/EstimatedRideResponseDTO';
import { EstimateRideRequestDTO } from 'src/dto/EstimateRideRequestDTO';

@Controller('ride')
export class RideController {

    constructor(private readonly rideService:  RideService)  {}

    @Post("estimate")
    @HttpCode(200)
    async estimateRide(@Body() estimateRide: EstimateRideRequestDTO): Promise<EstimatedRideResponseDTO> {
        if (estimateRide.origin === estimateRide.destination 
            || !estimateRide.origin 
            || !estimateRide.destination 
            || !estimateRide.customer_id
        ) {
            throw new HttpException({
                error_code: "INVALID_DATA",
                error_description: "Invalid request body data",
              }, HttpStatus.BAD_REQUEST);
        }
        return this.rideService.estimateRide(estimateRide);
    }
}
