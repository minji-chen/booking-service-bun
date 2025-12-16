import { describe, it, expect, beforeEach, vi } from 'bun:test';
import { appointmentService } from '../../services/appointmentService';
import { appointmentRepository } from '../../repositories/appointmentRepository';

describe('appointmentService - unit', () => {

 //mockRepo 就像是一個「假資料庫」
  const mockRepo = {
    findUsersById: vi.fn(),
    bookWithTransaction: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error if slot is outside business hours', async () => {
    await expect(
      appointmentService.bookAppointment('uuid', '2025-12-18', '08:00')
    ).rejects.toThrow('Shop closed');
  });

  it('should throw error if user not found', async () => {
    mockRepo.findUsersById.mockResolvedValueOnce(null);
    appointmentRepository.findUsersById = mockRepo.findUsersById;

    await expect(
      appointmentService.bookAppointment('uuid', '2025-12-18', '10:00')
    ).rejects.toThrow('User not found');
  });

  it('should call repository to book successfully', async () => {
    mockRepo.findUsersById.mockResolvedValueOnce({ id: 'uuid', name: 'Alice' });
    mockRepo.bookWithTransaction.mockResolvedValueOnce({ success: true, date: '2025-12-18', slot: '10:00' });
    appointmentRepository.findUsersById = mockRepo.findUsersById;
    appointmentRepository.bookWithTransaction = mockRepo.bookWithTransaction;

    const result = await appointmentService.bookAppointment('uuid', '2025-12-18', '10:00');

    expect(result).toEqual({ success: true, date: '2025-12-18', slot: '10:00' });
    expect(mockRepo.bookWithTransaction).toHaveBeenCalled();
  });
});
