import React, { useState } from "react";
import "../styles/global.css";
import { useQuery } from "@tanstack/react-query";

const IndexPage = () => {
   const [name, setName] = useState();
   const [email, setEmail] = useState();

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

   const handleSubmit = async (event) => {
      event.preventDefault();
      const query = `mutation insertUser($name:String!,$email:String!){
        insert_users_one(object:{
          name:$name,
          email:$email
        }){
          id
        }
      }`;
      const response = await fetch(
         "https://major-honeybee-52.hasura.app/v1/graphql",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               query,
               variables: { name, email },
            }),
         }
      );

      const res = await response.json();
      res.data && alert("User Added");
      event.target.reset();
   };

   const handleDelete = async (id) => {
      const query = `mutation insertUser($id:Int!){
        delete_users(where: {id: {_eq: $id}}){
          affected_rows
        }
      }`;
      const response = await fetch(
         "https://major-honeybee-52.hasura.app/v1/graphql",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               query,
               variables: { id },
            }),
         }
      );

      const res = await response.json();
      res.data && alert("User Deleted");
   };

   return (
      <div>
         <h1 className="text-4xl text-center p-3 underline ">
            Gatsby Husura App
         </h1>
         <form
            className=" flex justify-center mx-2 my-5"
            onSubmit={handleSubmit}
         >
            <input
               type="text"
               className="rounded border-2 border-blue-500 p-1 mx-1"
               placeholder="Name"
               onChange={(e) => setName(e.target.value)}
               required
            />
            <input
               type="text"
               className="rounded border-2 border-blue-500 p-1 mx-1"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <button type="submit" className="bg-blue-500 rounded p-1 mx-2">
               Add User
            </button>
         </form>
         <div className="m-2">
            <h1 className="font-bold text-2xl my-3 text-center">User's List</h1>
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <tbody className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="py-3 px-6">
                        Id
                     </th>
                     <th scope="col" className="py-3 px-6">
                        Name
                     </th>
                     <th scope="col" className="py-3 px-6">
                        Email
                     </th>
                     <th scope="col" className="py-3 px-6">
                        Creadted At
                     </th>
                     <th scope="col" className="py-3 px-6">
                        Delete
                     </th>
                  </tr>
                  {response.data?.data.users.map((user) => (
                     <tr
                        key={user.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                     >
                        <th scope="col" className="py-3 px-6">
                           {user.id}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {user.name}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {user.email}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           {user.created_at}
                        </th>
                        <th scope="col" className="py-3 px-6">
                           <button
                              className="p-2 bg-red-400 rounded"
                              onClick={() => handleDelete(user.id)}
                           >
                              Delete
                           </button>
                        </th>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
