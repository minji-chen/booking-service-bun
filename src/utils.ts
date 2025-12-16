import { parse, isValid } from 'date-fns';

type DateValidationResult = 
  | { valid: true; date: string }
  | { valid: false; error: string };

export function validateDate(dateStr?: string): DateValidationResult {
  if (!dateStr) return { valid: false, error: 'Date is required' };

  const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
  if (!isValid(parsed)) return { valid: false, error: 'Invalid date format. Use YYYY-MM-DD.' };

  return { valid: true, date: dateStr };
}