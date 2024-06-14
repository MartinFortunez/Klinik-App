import { useQuery } from "react-query";
import { api } from "../api/api";

const useFetch = (url, queryKey) => {
  const { data, isSuccess, isLoading } = useQuery(
    queryKey,
    () => api("get", url, ""),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

  return { data, isSuccess, isLoading };
};

export default useFetch;
