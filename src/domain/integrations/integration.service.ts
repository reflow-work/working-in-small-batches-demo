import { db } from '../../db';
import { integrationsTable } from '../../db/schema';

enum IntegrationProvider {
  SLACK = 'slack',
  GOOGLE_CHAT = 'google_chat',
}

type Integration = {
  id: number;
  provider: IntegrationProvider;
};

export async function listIntegrations(): Promise<Integration[]> {
  const result = await db.select().from(integrationsTable);

  return result.map((integration) => {
    return {
      id: integration.id,
      provider: integration.provider as IntegrationProvider,
    };
  });
}
