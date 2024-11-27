import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimatedRideResponseDTO } from '../dto/EstimateRideResponseDTO';
import { EstimateRideRequestDTO } from '../dto/EstimateRideRequestDTO';
import { ConfirmRideRequestDTO } from '../dto/ConfirmRideRequestDTO';
import { estimateRideDataValidation } from '../validators/estimateRideDataValidation';
import { confirmRideDataValidation } from '../validators/confirmRideDataValidation';

@Controller('ride')
export class RideController {

    constructor(private readonly rideService:  RideService)  {}

    @Post("estimate")
    @HttpCode(200)
    async postRide(@Body() estimateRide: EstimateRideRequestDTO): Promise<EstimatedRideResponseDTO> {
        try {
            estimateRideDataValidation(estimateRide);
            const estimatedRide = await this.rideService.estimateRide(estimateRide);
            return estimatedRide;
        } catch (error) {
            console.log(error)
            throw new HttpException({
                error_code: error.response.error_code,
                error_description: error.response.error_description
            }, error.response.status);
        }
    }

    @Patch("confirm")
    @HttpCode(200)
    async patchRide(@Body() confirmRide: ConfirmRideRequestDTO): Promise<any> {
        try {
            confirmRideDataValidation(confirmRide);
            const result = await this.rideService.confirmRide(confirmRide);
            return {
                success: result
            };
        } catch (error) {
            throw new HttpException({
                error_code: error.response.error_code,
                error_description: error.response.error_description
            }, error.response.status);
        }
    }

    @Get(":customer_id")
    async getRide(@Param("customer_id") customerId: string, @Query("driver_id") driverId?: string): Promise<any> {
        try {
            const validCustomerId = Number.isNaN(parseInt(customerId));
            if (validCustomerId) {
                throw new HttpException({
                    error_code: "INVALID_DATA",
                    error_description: "Invalid request parameters",
                    status: HttpStatus.BAD_REQUEST
                  }, null);
            }
            if (driverId && Number.isNaN(Number(driverId))) {
                throw new HttpException({
                    error_code: "INVALID_DRIVER",
                    error_description: "Invalid request parameters",
                    status: HttpStatus.BAD_REQUEST
                  }, null);
            }

            return this.rideService.ridesHistory(customerId, driverId);
        } catch (error) {
            throw new HttpException({
                error_code: error.response.error_code,
                error_description: error.response.error_description,
              }, error.response.status);
        }
    }
}
