const Card = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-row justify-between overflow-y-auto">
        {children}
      </div>
    );
  };

  const CardTable = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-row justify-between overflow-y-auto">
        {children}
      </div>
    );
  };

  export { Card, CardTable };

