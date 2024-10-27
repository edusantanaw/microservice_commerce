import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from 'src/utils/errors/domain.exception';
import { NotFoundException } from 'src/utils/errors/notFound.exception';

@Catch(Error, NotFoundException, DomainException, HttpException)
export class GlobalExceptionFilter {
  protected logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
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
    this.logger.localInstance.fatal(`Internal error: ${exception.message}`);
    return response.status(500).send('Internal Server Error');
  }
}
