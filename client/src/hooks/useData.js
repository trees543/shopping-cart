import { useContext } from 'react';
import DataContext from '../context/data-context';

const useData = () => {
  const data = useContext(DataContext);

  return data;
};

export default useData;
