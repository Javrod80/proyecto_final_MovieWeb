



const WatchedContext = createContext();


export const useWatched = () => {
    return useContext(WatchedContext);
}

export default WatchedProvider = ({ children }) => {
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const { userId } = useAuth();

    const fetchWatched = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/watched/watch-history?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },                   
            });

            if (!response.ok) {
                throw new Error('Error al obtener las películas vistas');
            }   
            const data = await response.json(); 
            setWatched(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        fetchWatched();
    }, [fetchWatched]);

    return (
        <WatchedContext.Provider value={{ watched, isLoading, fetchWatched }}>
            {children}
        </WatchedContext.Provider>
    );
}
