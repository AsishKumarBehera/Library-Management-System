import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvide({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token

    if (!user && token) {
      axios
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        })
        .then(({ data }) => {
          setUser(data); // Set the user data if fetched successfully
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null); // Ensure user is null in case of error
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
