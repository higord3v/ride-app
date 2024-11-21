import { HttpException, HttpStatus } from "@nestjs/common";
import { EstimateRideRequestDTO } from "src/dto/EstimateRideRequestDTO";

export const estimateRideDataValidation = (object: EstimateRideRequestDTO) => {
        if (object.origin === object.destination 
            || !object.origin 
            || !object.destination 
            || !object.customer_id
        ) {
            throw new HttpException({
                error_code: "INVALID_DATA",
                error_description: "Invalid request body data",
                status: HttpStatus.BAD_REQUEST
              }, null);
        }
}