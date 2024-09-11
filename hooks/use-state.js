import useSWR from "swr";

export default function useSharedState(key, initial) {
  console.log("key, initial ", key, initial);
  const { data: state, mutate: setState } = useSWR(key, null, {
    initialData: initial,
    revalidateOnMount: true,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    // refreshWhenOffline: false,
    // refreshWhenHidden: false,
    // shouldRetryOnError: false,
    // refreshInterval: 0,
  });
  return [state, setState];
}

/*
? How to use it?
Any Component you can call it.
const [username, setUsername] = useSharedState('username', 'paco')
const [os, setOS] = useSharedState('os', 'macos')

from https://paco.sh/blog/shared-hook-state-with-swr
*/
