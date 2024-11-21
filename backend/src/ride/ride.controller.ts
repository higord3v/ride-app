import { Body, Controller, HttpCode, HttpException, HttpStatus, Patch, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimatedRideResponseDTO } from 'src/dto/EstimateRideResponseDTO';
import { EstimateRideRequestDTO } from 'src/dto/EstimateRideRequestDTO';
import { ConfirmRideRequestDTO } from 'src/dto/ConfirmRideRequestDTO';
import { estimateRideDataValidation } from 'src/validators/estimateRideDataValidation';
import { confirmRideDataValidation } from 'src/validators/confirmRideDataValidation';

@Controller('ride')
export class RideController {

    constructor(private readonly rideService:  RideService)  {}

    @Post("estimate")
    @HttpCode(200)
    async estimateRide(@Body() estimateRide: EstimateRideRequestDTO): Promise<EstimatedRideResponseDTO> {
        try {
            estimateRideDataValidation(estimateRide);
            return this.rideService.estimateRide(estimateRide);
        } catch (error) {
            throw new HttpException({
                error_code: error.response.error_code,
                error_description: error.response.error_description
            }, error.response.status);
        }
    }

    @Patch("confirm")
    @HttpCode(200)
    async confirmRide(@Body() confirmRide: ConfirmRideRequestDTO): Promise<any> {
        try {
            confirmRideDataValidation(confirmRide);
            return this.rideService.confirmRide(confirmRide);
        } catch (error) {
            throw new HttpException({
                error_code: error.response.error_code,
                error_description: error.response.error_description
            }, error.response.status);
        }
    }
}
