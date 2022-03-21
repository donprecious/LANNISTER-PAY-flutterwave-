import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class AppService {
  constructor(@InjectSentry() private readonly client: SentryService) { }
  getHello(): string {
    this.client.instance().captureMessage("HEllo world");
    return 'Hello World!';
  }
}
