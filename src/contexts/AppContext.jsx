import { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [detections, setDetections] = useState([]);
  const [currentDetection, setCurrentDetection] = useState(null);

  const addDetection = (detection) => {
    setDetections(prev => [detection, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      selectedCrop,
      setSelectedCrop,
      detections,
      addDetection,
      currentDetection,
      setCurrentDetection,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
