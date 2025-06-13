// src/config/mockAgents.ts
import type { Agent } from '../types';

// FIX: The IDs should be simple, unique strings. 
// The "agent-" prefix will be added consistently by the components.
export const mockAgents: Agent[] = [
  { id: '1', name: 'Agent 1', ImePrezime: 'Agent 1', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
  { id: '2', name: 'Agent 2', ImePrezime: 'Agent 2', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
  { id: '3', name: 'Agent 3', ImePrezime: 'Agent 3', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
  { id: '4', name: 'Agent 4', ImePrezime: 'Agent 4', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
  { id: '5', name: 'Agent 5', ImePrezime: 'Agent 5', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
  { id: '6', name: 'Agent 6', ImePrezime: 'Agent 6', isOnBreak: false, totalBreakDurationToday: 0, currentShiftId: null, currentBreakId: null },
];
