import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Response,
} from '@nestjs/common';

export class PlayerValidationParameters implements PipeTransform {
  field: string;
  constructor(field: string) {
    this.field = field;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${this.field} should be provided`);
    }
  }
}
