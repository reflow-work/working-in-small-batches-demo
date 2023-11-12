import { db } from '../../db';
import { integrationsTable } from '../../db/schema';

export enum IntegrationProvider {
  SLACK = 'slack',
  GOOGLE_CHAT = 'google_chat',
}

type Integration = {
  id: number;
  provider: IntegrationProvider;
  credentials: Credentials;
};

export type Credentials = SlackCredentials | GoogleChatCredentials;

export type SlackCredentials = {
  token: string;
};

export type GoogleChatCredentials = {
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
};

export async function listIntegrations(): Promise<Integration[]> {
  const result = await db.select().from(integrationsTable);

  return result.map((integration) => {
    const provider = integration.provider as IntegrationProvider;

    return {
      id: integration.id,
      provider: provider,
      credentials: toCredentials(provider, integration.credentials),
    };
  });
}

function toCredentials(
  provider: IntegrationProvider,
  credential: any
): Credentials {
  switch (provider) {
    case IntegrationProvider.SLACK:
      return {
        token: credential.token,
      };
    case IntegrationProvider.GOOGLE_CHAT:
      return {
        accessToken: credential.accessToken,
        refreshToken: credential.refreshToken,
        expiryDate: new Date(credential.expiryDate),
      };
  }
}
