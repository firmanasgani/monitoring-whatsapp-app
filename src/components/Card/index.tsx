const Card = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="p-6 bg-white rounded-lg h-32 shadow-md flex flex-row justify-between mb-4 overflow-y-auto">
        {children}
      </div>
    );
  };

  const CardTable = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-row justify-between mb-4 overflow-y-auto">
        {children}
      </div>
    );
  };

  export { Card, CardTable };

