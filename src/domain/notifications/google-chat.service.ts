import { GoogleChatCredentials } from '../integrations/integration.service';
import { toGoogleChatCard } from './google-chat-section';
import { NotificationService } from './notification.service';

export const googleChatService: NotificationService = {
  notify: async (blocks: any[], credentials: GoogleChatCredentials) => {
    const googleChatCard = toGoogleChatCard('Notify', blocks);

    console.log('google-chat - notify', googleChatCard, credentials);

    return Promise.resolve();
  },
};
