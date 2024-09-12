import { useMemo } from 'react';

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    // Expensive computation here
    return someExpensiveOperation(data);
  }, [data]);

  return (
    // Render component using processedData
  );
};