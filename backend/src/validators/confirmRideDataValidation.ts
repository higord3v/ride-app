import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfirmRideRequestDTO } from "src/dto/ConfirmRideRequestDTO";

export const confirmRideDataValidation = (object: ConfirmRideRequestDTO) => {
        if (object.origin === object.destination 
            || !object.origin 
            || !object.destination 
            || !object.customer_id
            || !object.driver
            || !object.driver.id
            || !object.driver.name
            || !object.distance
            || !object.duration
            || !object.value
        ) {
            throw new HttpException({
                error_code: "INVALID_DATA",
                error_description: "Invalid request body data",
                status: HttpStatus.BAD_REQUEST
              }, null);
        }
}