import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {

    constructor(private readonly rideService:  RideService)  {}

    @Post("estimate")
    async estimateRide(@Body() estimateRide: EstimateRideDTO): Promise<any> {
        return this.rideService.estimateRide(estimateRide);
    }
}
