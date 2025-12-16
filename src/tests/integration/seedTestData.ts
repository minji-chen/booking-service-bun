import { appointmentSeedRepository } from '../../repositories/appointmentSeedRepository';

export async function seedTestData(): Promise<{ users: any[]; slotsCreated: number }> {
  const result = await appointmentSeedRepository.resetAndSeed();
  return result;
}