// src/hooks/useAppController.ts
import { useState, useCallback } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import type { Agent, ScheduledBreak, LastBreakEvent, AgentInSlot } from '../types';
import { mockAgents } from '../config/mockAgents';
import { mockBreakDefinitions, mockShifts } from '../config/mockData';

// This is a self-contained, client-side controller for portfolio demonstration.
export default function useAppController() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [scheduledBreaks, setScheduledBreaks] = useState<ScheduledBreak[]>([]);
  const [lastBreakEvent, setLastBreakEvent] = useState<LastBreakEvent | null>(null);

  /**
   * Assigns an agent to a break. This is an optimistic update.
   */
  const handleAssignAgentOptimistic = useCallback(({ agentId, shiftId, timeSlotId, breakTypeIndex }: {
    agentId: string;
    shiftId: string;
    timeSlotId: string;
    breakTypeIndex: number;
  }) => {
    const breakDef = mockBreakDefinitions.find(b => b.breakTypeIndex === breakTypeIndex);
    if (!breakDef) return;

    setScheduledBreaks(prev => {
      const newBreaks = [...prev];
      const breakId = `${shiftId}-${timeSlotId}-${breakTypeIndex}`;
      const existingBreakIndex = newBreaks.findIndex(b => b.id === breakId);
      const newAgentInSlot: AgentInSlot = { agentId, status: 'scheduled' as const };

      if (existingBreakIndex > -1) {
        // Break card exists, add agent to it if not already present
        const existingBreak = { ...newBreaks[existingBreakIndex] };
        
        if (!existingBreak.agents) {
            existingBreak.agents = [];
        }

        if (!existingBreak.agents.some(a => a.agentId === agentId)) {
          existingBreak.agents = [...existingBreak.agents, newAgentInSlot];
          newBreaks[existingBreakIndex] = existingBreak;
        }
      } else {
        // Break card doesn't exist, create it
        const newBreak: ScheduledBreak = {
          id: breakId,
          shiftId,
          timeSlotId,
          breakTypeIndex,
          breakDefinitionId: breakDef.id,
          name: breakDef.name,
          agents: [newAgentInSlot], // Start with the new agent
          startTime: '',
          endTime: '',
          durationMinutes: breakDef.durationMinutes,
          assignedAgentIds: [],
          status: 'scheduled'
        };
        newBreaks.push(newBreak);
      }
      return newBreaks;
    });

    // Also update the agent's currentShiftId if not set
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, currentShiftId: shiftId } : a));
  }, []);

  /**
   * Updates an agent's break status (e.g., to 'active' or 'done').
   */
  const handleUpdateAgentStatusOptimistic = useCallback(({ agentId, shiftId, timeSlotId, breakTypeIndex, newStatus }: {
    agentId: string;
    shiftId: string;
    timeSlotId: string;
    breakTypeIndex: number;
    newStatus: 'active' | 'done';
  }) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setLastBreakEvent({
        agentName: agent.name,
        action: newStatus,
        timestamp: new Date(),
      });
    }

    // Helper to safely convert Timestamp or Date to a Date object
    const toDate = (dateValue: any): Date | null => {
        if (!dateValue) return null;
        if (dateValue.toDate) return dateValue.toDate(); // It's a Firestore Timestamp
        return new Date(dateValue); // It's already a Date or a string/number
    }

    // Update agent's global state (isOnBreak, timers)
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const updatedAgent = { ...a, isOnBreak: newStatus === 'active' };
        if (newStatus === 'active') {
          updatedAgent.currentBreakStartTime = new Date();
        } else if (newStatus === 'done' && a.currentBreakStartTime) {
          // FIX: Use the helper function to safely handle the date value
          const startTime = toDate(a.currentBreakStartTime);
          if (startTime) {
            const duration = new Date().getTime() - startTime.getTime();
            updatedAgent.totalBreakDurationToday = (updatedAgent.totalBreakDurationToday || 0) + Math.round(duration / 1000);
          }
          updatedAgent.currentBreakStartTime = null;
        }
        return updatedAgent;
      }
      return a;
    }));

    // Update the status within the scheduled break card
    setScheduledBreaks(prev => prev.map(b => {
      if (b.shiftId === shiftId && b.timeSlotId === timeSlotId && b.breakTypeIndex === breakTypeIndex) {
        const agents = b.agents || [];
        return {
          ...b,
          agents: agents.map(agentInSlot =>
            agentInSlot.agentId === agentId ? { ...agentInSlot, status: newStatus } : agentInSlot
          )
        };
      }
      return b;
    }));
  }, [agents]);

  /**
   * Handles the drag-and-drop logic.
   */
  const handleDragEnd = useCallback(async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    const agentId = draggableId.substring(6).trim(); // Remove "agent-" prefix

    if (destination.droppableId.startsWith('timeslot-')) {
      const droppableId = destination.droppableId;
      const parts = droppableId.substring(9).split('-');
      const shiftId = parts[0];
      const timeSlotId = parts.slice(1).join('-'); // Handles timeslot IDs with hyphens

      mockBreakDefinitions.forEach(breakDef => {
        handleAssignAgentOptimistic({
          agentId,
          shiftId,
          timeSlotId,
          breakTypeIndex: breakDef.breakTypeIndex,
        });
      });
    }
    // FIX: Corrected the typo from 'drodroppableId' to 'droppableId'
    else if (destination.droppableId.startsWith('break-')) {
        const droppableId = destination.droppableId;
        const lastHyphenIndex = droppableId.lastIndexOf('-');
        
        const breakTypeIndex = parseInt(droppableId.substring(lastHyphenIndex + 1));
        const mainPart = droppableId.substring(6, lastHyphenIndex);
        const firstHyphenIndex = mainPart.indexOf('-');
        const shiftId = mainPart.substring(0, firstHyphenIndex);
        const timeSlotId = mainPart.substring(firstHyphenIndex + 1);

        handleAssignAgentOptimistic({
          agentId,
          shiftId,
          timeSlotId,
          breakTypeIndex,
        });
    }
  }, [handleAssignAgentOptimistic]);

  /**
   * Resets the entire application state to its initial mock state.
   */
  const resetAppState = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all breaks and agent statuses for this demo?")) {
        setAgents(mockAgents);
        setScheduledBreaks([]);
        setLastBreakEvent(null);
    }
  }, []);

  return {
    agents,
    scheduledBreaks,
    loading: false, 
    error: null,    
    handleDragEnd,
    handleAssignAgentOptimistic,
    handleUpdateAgentStatusOptimistic,
    resetAppState,
    lastBreakEvent,
  };
};
