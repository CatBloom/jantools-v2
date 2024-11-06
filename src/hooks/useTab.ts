import { useCallback, useState } from 'react';

export const useTab = (init = '') => {
  const [tabValue, setTabValue] = useState(init);

  const switchTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setTabValue(newValue);
  }, []);

  return { tabValue, switchTab };
};
