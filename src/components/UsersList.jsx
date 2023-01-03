import React from "react";

export default function UsersList({ users }) {
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
               {users &&
                  users.map((user) => (
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
   );
}
