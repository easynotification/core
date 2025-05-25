# EasyNotification Core

[![Website](https://img.shields.io/website?url=https%3A%2F%2Feasynotification.app)](https://easynotification.app)

A powerful and flexible notification system built with NestJS that supports multiple notification channels. This is the core module of the EasyNotification project, providing the foundation for sending notifications through various channels.

## Features

- 📱 Telegram notifications
- 📧 Email notifications

## Installation

```bash
npm install @easynotification/core
```

## Supported Channels

### Telegram

Send notifications directly to Telegram chats using bot tokens.

### Email

Send email notifications with support for HTML templates.

## Setup

```typescript
import { EasyNotificationModule } from "@easynotification/core";

@Module({
  imports: [
    EasyNotificationModule.register({
      isGlobal: true,
      telegramOptions: {
        token: "your bot token here",
      },
      emailOptions: {
        from: "from",
        auth: {
          password: "password",
          username: "username",
        },
        host: "host",
        port: 587, // 587 or 465
        secure: false, // false for 587 and true for 465
      },
    }),
  ],
})
export class AppModule {}
```

```typescript
import { EasyNotificationService } from "@easynotification/core";

@Injectable()
export class AppService {
  constructor(private readonly easyNotificationService: EasyNotificationService);
}

const response = await this.easyNotificationService.sendNotification("EMAIL", {
  to: "",
  subject: "",
  html: "",
  text: "",
});

if (response.ok) {
  console.log("Email success response", response.result);
} else {
  console.log("Email error response", response.error);
}

const response = await this.easyNotificationService.sendNotification("TELEGRAM", {
  chat_id: 1,
  text: "",
});

if (response.ok) {
  console.log("Telegram success response", response.result);
} else {
  console.log("Telegram error response", response.error);
}
```

## Future Plans

- Email ejs support
- WhatsApp integration
- SMS notifications
- Discord integration
- Website
- Api Package
- queues
- And more...

Created with ❤️ for developers
