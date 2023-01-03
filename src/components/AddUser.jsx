import React, { useState } from "react";

export default function AddUser() {
   const [name, setName] = useState();
   const [email, setEmail] = useState();

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

   return (
      <form className=" flex justify-center mx-2 my-5" onSubmit={handleSubmit}>
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
   );
}
