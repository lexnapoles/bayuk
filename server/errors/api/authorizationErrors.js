import { createError } from './errors';

export const unauthorizedAccess = () => createError('ERR-3000', 'Unauthorized access', 'Access cannot be granted based on the given token');

export const tokenDoesNotMatch = () => createError('ERR-3001', 'Token does not match', 'Token is invalid for this operation');
