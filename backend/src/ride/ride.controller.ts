import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
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
    async postRide(@Body() estimateRide: EstimateRideRequestDTO): Promise<EstimatedRideResponseDTO> {
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
    async patchRide(@Body() confirmRide: ConfirmRideRequestDTO): Promise<any> {
        try {
            confirmRideDataValidation(confirmRide);
            return {
                success: await this.rideService.confirmRide(confirmRide)
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
                    error_description: "Invalid request body data",
                    status: HttpStatus.BAD_REQUEST
                  }, null);
            }
            if (driverId && Number.isNaN(Number(driverId))) {
                throw new HttpException({
                    error_code: "INVALID_DATA",
                    error_description: "Invalid request body data",
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
