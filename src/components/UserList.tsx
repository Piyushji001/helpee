import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    const fakeUsers = [...users, ...data.map((user: any, index: number) => ({
      ...user,
      id: user.id + users.length + index
    }))];
    setUsers(fakeUsers);
    setLoading(false);
  };

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom && !loading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User List</h2>
        <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={handleLogout}>Logout</button>
      </div>

      {users.map(user => (
        <div key={user.id} className="p-4 mb-2 border rounded shadow-sm bg-white">
          <h3 className="font-semibold">{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.company.name}</p>
        </div>
      ))}

      {loading && <p className="text-center text-gray-600">Loading more users...</p>}
    </div>
  );
};

export default UserList;
