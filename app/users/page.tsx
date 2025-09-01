import React from "react";

interface User {
  id: number;
  name: string;
}

async function makePostReq() {
  const res = await fetch(`${process.env.NEXT_URL}/api/hello`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Mary" }),
  });

  const data = await res.json();
  return { data };
}

const UsersPage = async () => {
  const { data } = await makePostReq();
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users: User[] = await res.json();
  const error = "Issue loading users.";

  return (
    <>
      <h1>Users</h1>
      <p>{data.message}</p>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {res.ok
          ? users.map((user) => <li key={user.id}>{user.name}</li>)
          : error}
      </ul>
    </>
  );
};

export default UsersPage;
