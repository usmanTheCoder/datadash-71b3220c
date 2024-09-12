import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../store';
import { setData, setError, setLoading } from '../store/slices/dataSlice';
import { trpc } from '../utils/trpc';

interface UseDataFetchProps {
  endpoint: string;
  initialData?: any;
}

const useDataFetch = ({ endpoint, initialData }: UseDataFetchProps) => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.data);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await trpc.data[endpoint].query();
      dispatch(setData(response));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(`Error fetching data: ${err}`));
      toast.error(`Error fetching data: ${err}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (shouldFetch && !data && !error && !loading) {
      fetchData();
    } else if (initialData) {
      dispatch(setData(initialData));
    }
    setShouldFetch(false);
  }, [shouldFetch, initialData, data, error, loading]);

  const refetchData = () => {
    setShouldFetch(true);
  };

  return { data, error, loading, refetchData };
};

export default useDataFetch;