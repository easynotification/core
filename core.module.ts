import { DynamicModule, Module, Provider } from "@nestjs/common";
import { EasyNotificationService } from "./core.service";
import { HttpModule } from "@nestjs/axios";
import { TelegramService } from "./providers/telegram.service";
import { EmailService } from "./providers/email.service";
import { Config, NotificationTokens } from "./types/general";
import { MelipayamakService } from "providers/melipayamak.service";

@Module({
  imports: [HttpModule],
  providers: [EasyNotificationService, TelegramService, EmailService],
  exports: [EasyNotificationService],
})
export class EasyNotificationModule {
  static register(config?: Config): DynamicModule {
    const providers: Provider[] = [EasyNotificationService];

    if (config?.telegramOptions) {
      providers.push(TelegramService);
      providers.push({
        provide: NotificationTokens.TELEGRAM,
        useValue: config.telegramOptions,
      });
    }

    if (config?.emailOptions) {
      providers.push(EmailService);
      providers.push({
        provide: NotificationTokens.EMAIL,
        useValue: config.emailOptions,
      });
    }

    if (config?.melipayamakOptions) {
      providers.push(MelipayamakService);
      providers.push({
        provide: NotificationTokens.MELIPAYAMAK,
        useValue: config.melipayamakOptions,
      });
    }

    return {
      global: config?.isGlobal ?? false,
      module: EasyNotificationModule,
      providers: providers,
      exports: [EasyNotificationService],
    };
  }
}
