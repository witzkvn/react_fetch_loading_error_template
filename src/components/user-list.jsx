import React, { useState, useEffect, useCallback } from "react";
import UserCard from "./user-card";
import styles from "./user.module.css";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  // empêche de re-générer la fonction à chaque render et donc de changer la référence à fetchUsers, ce qui relancerait le useEffect
  const fetchUsers = useCallback(
    async (fetchUrl) => {
      setError(null);
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();

        if (Object.keys(data).length === 0) {
          setError(true);
        } else {
          setUsers(data);
        }
        console.log(users);
      } catch (error) {
        setError(true);
      }
    },
    [users]
  );

  useEffect(() => {
    setIsLoading(true);

    // REAL SITUATION : fetch and then set isLoading to false
    fetchUsers("https://jsonplaceholder.typicode.com/users").then(() =>
      setIsLoading(false)
    );

    // JUST FO TESTING : SET A TIMEOUT
    // const myTimeout = setTimeout(
    //   () =>
    //     fetchUsers("https://jsonplaceholder.typicode.com/users").then(() =>
    //       setIsLoading(false)
    //     ),
    //   3000
    // );

    // return () => {
    //   clearTimeout(myTimeout);
    //   setUsers([]);
    // };
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <div className={styles.userGrid}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    );
  }

  if (!isLoading && users.length === 0) {
    return <p>Aucun utilisateur n'a été trouvé.</p>;
  }

  if (error) {
    return (
      <p>Une erreur est survenue lors de la récupération des utilisateurs...</p>
    );
  }

  return (
    <div className={styles.userGrid}>
      {users && users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

export default UserList;
