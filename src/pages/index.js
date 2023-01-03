import React from "react";
import "../styles/global.css";
import { useQuery } from "@tanstack/react-query";
import AddUser from "../components/AddUser";
import UsersList from "../components/UsersList";

const IndexPage = () => {
   const response = useQuery(["response"], async () => {
      const query = `query getUser{
      users{
        id
        name
        email
        created_at
      }
    }`;
      return await (
         await fetch("https://major-honeybee-52.hasura.app/v1/graphql", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               query,
            }),
         })
      ).json();
   });

   return (
      <div>
         <h1 className="text-4xl text-center p-3 underline ">
            Gatsby Husura App
         </h1>
         <AddUser />
         <UsersList users={response.data?.data.users} />
      </div>
   );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
