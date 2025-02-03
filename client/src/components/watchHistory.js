import React from 'react';
import { useWatched } from '../providers/WatchedProvider';

const watchHistory = () => {

    const {watched, isLoading, fetchWatched} = useWatched();


    useEffect(() => {
        fetchWatched();
    }, [fetchWatched]);

    return (
        <div>
           <button>
    <img src="../images/ojo2.png" alt="Watched" />
</button>
         
        </div>
    )
}
export default watchHistory;