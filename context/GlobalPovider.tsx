import { getCurrentUser } from "@/lib/appWrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define User type
type User = {
    id: string;
    name: string;
    email: string;
};

// Define GlobalContext Type
type GlobalContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    isLogged: boolean;
};

// Create GlobalContext with correct type
const GlobalContext = createContext<GlobalContextType | null>(null);

// Custom Hook for accessing the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

// Define GlobalProvider Component
const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        // Fetch the current user
        getCurrentUser()
            .then((res) => {
                if (res) {
                    const user: User = {
                        id: res.id,
                        name: res.name,
                        email: res.email
                    };
                    setUser(user);
                    setIsLogged(true);
                } else {
                    setUser(null);
                    setIsLogged(false);
                }
            })
            .catch((error: any) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider 
            value={{
                user, 
                setUser, 
                loading, 
                isLogged
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
