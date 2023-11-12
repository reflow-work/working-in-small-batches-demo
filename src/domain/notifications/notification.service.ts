import {
  Credentials,
  IntegrationProvider,
} from '../integrations/integration.service';
import { googleChatService } from './google-chat.service';
import { slackService } from './slack.service';

export interface NotificationService {
  notify(blocks: any[], credentials: Credentials): Promise<void>;
}

export function notify(
  provider: IntegrationProvider,
  blocks: any[],
  credentials: Credentials
): Promise<void> {
  let service: NotificationService;

  switch (provider) {
    case IntegrationProvider.SLACK:
      service = slackService;
      break;
    case IntegrationProvider.GOOGLE_CHAT:
      service = googleChatService;
      break;
  }

  return service.notify(blocks, credentials);
}
