import { db } from '../../db';
import { googleChatCredentialsTable } from '../../db/schema';

type GoogleChatCredential = {
  id: number;
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
};

type GoogleChatCard = {
  cardId: string;
  card: {
    sections: any[];
  };
};

export async function getAccessToken(): Promise<GoogleChatCredential> {
  const [result] = await db.select().from(googleChatCredentialsTable);

  return Promise.resolve({
    id: result.id,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    expiryDate: result.expiryDate,
  });
}

export async function createMessage(
  card: GoogleChatCard,
  accessToken: string
): Promise<void> {
  console.log('google-chat - createMessage', accessToken);

  return Promise.resolve();
}
