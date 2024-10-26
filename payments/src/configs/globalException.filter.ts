import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { DomainException } from 'src/utils/errors/domain.exception';
import { NotFoundException } from 'src/utils/errors/notFound.exception';
import { Response } from 'express';

@Catch(Error, NotFoundException, DomainException, HttpException)
export class GlobalExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof NotFoundException)
      return response.status(404).json({ message: exception.message });

    if (exception instanceof DomainException)
        return response.status(400).json({ message: exception.message });

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as {
        message: string[];
      };
      return response
        .status(exception.getStatus())
        .json({ message: exceptionResponse.message, type: 'HttpException' });
    }
    return response.status(500).send('Internal Server Error');
  }
}
