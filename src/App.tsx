// src/App.tsx
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Scheduler from './components/Scheduler/Scheduler';
import useAppController from './hooks/useAppController';
import { mockBreakDefinitions, mockShifts } from './config/mockData';
import { CheckCircle, LogOut, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const {
    agents,
    scheduledBreaks,
    handleDragEnd,
    handleAssignAgentOptimistic,
    handleUpdateAgentStatusOptimistic,
    resetAppState,
    lastBreakEvent,
  } = useAppController();

  return (
    // The DragDropContext provides the context for drag-and-drop functionality.
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* FIX: The <React.StrictMode> wrapper has been removed.
        In development, StrictMode renders components twice to detect potential problems.
        This can interfere with react-beautiful-dnd, which relies on a stable DOM
        during its initialization. Removing it is a common workaround for this library.
      */}
      <div className="min-h-screen bg-gray-100 font-sans">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-x-6">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">Break Scheduler</h1>
              
              {/* Real-time event banner */}
              {lastBreakEvent && (
                <div 
                  className={`flex items-center p-2 rounded-md transition-all duration-300 ease-in-out
                    ${lastBreakEvent.action === 'active' ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}
                >
                  {lastBreakEvent.action === 'active' 
                    ? <CheckCircle size={18} className="mr-2"/> 
                    : <LogOut size={18} className="mr-2"/>
                  }
                  <span className="text-sm font-medium">
                    {`${lastBreakEvent.agentName} ${lastBreakEvent.action === 'active' ? 'started break' : 'finished break'} at ${
                      lastBreakEvent.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    }`}
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={resetAppState}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 flex items-center gap-x-2"
              title="Reset all assigned breaks and agent statuses"
            >
              <RotateCcw size={16} />
              Reset Demo
            </button>
          </div>
        </header>

        <main className="container mx-auto p-2 md:p-4 mt-4">
          <Scheduler
            agents={agents}
            breakDefinitions={mockBreakDefinitions}
            appShifts={mockShifts}
            scheduledBreaks={scheduledBreaks}
            onUpdateAgentStatus={handleUpdateAgentStatusOptimistic}
            onDragEnd={handleDragEnd}
            onAssignAgent={handleAssignAgentOptimistic}
          />
        </main>
        
        <footer className="text-center py-4 mt-8 text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Break Scheduler Demo.
        </footer>
      </div>
    </DragDropContext>
  );
};

export default App;
