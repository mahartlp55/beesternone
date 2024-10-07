import { createContext, useState } from 'react';

export const RecallContext = createContext();

const RecallState = ({ children }) => {
  const [reCall, setReCall] = useState();
  const reCallData = (data) => {
    setReCall(data);
  };

  return (
    <RecallContext.Provider value={{ reCall, reCallData }}>
      {children}
    </RecallContext.Provider>
  );
};

export default RecallState;
