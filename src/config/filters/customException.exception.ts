/* eslint-disable prettier/prettier */
import { HttpException } from "@nestjs/common";
import { HttpStatus } from '@nestjs/common';

/**
 * Staring point of UnauthorizedException exception
 */
export class UnauthorizedException extends HttpException {
    constructor() {
        super("Invalid User", HttpStatus.UNAUTHORIZED);
    }
}

/**
 * @ignore
 */
export class UserNotFoundException extends HttpException {
    constructor() {
        super("User Not Found ,please log in to continue", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

/**
 * @ignore
 */
export class WrongCredentialsException extends HttpException {
    constructor() {
        super("Invalid Credentials", HttpStatus.NOT_ACCEPTABLE);
    }
}

/**
 * @ignore
 */
export class IdNotFoundException extends HttpException {
    constructor() {
        super("ID you have been searching for is not found", HttpStatus.NOT_FOUND);
    }
}

/**
 * @ignore
 */
export class AuthenticationException extends HttpException {
    constructor() {
        super("Authentication error", HttpStatus.UNAUTHORIZED);
    }
}
