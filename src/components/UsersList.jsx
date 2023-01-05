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
      <div className="px-4 sm:px-6 lg:px-8">
         <h1 className="font-bold text-2xl text-center">User's List</h1>
         <div className="mt-2 flex flex-col">
            <div className="overflow overflow-x-auto shadow md:rounded-lg">
               <table className="min-w-full">
                  <thead className="bg-gray-50">
                     <tr>
                        <th
                           scope="col"
                           className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                           Id
                        </th>
                        <th
                           scope="col"
                           className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                           Name
                        </th>

                        <th
                           scope="col"
                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                           Email
                        </th>
                        <th
                           scope="col"
                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                           Creadted At
                        </th>
                        <th
                           scope="col"
                           className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                           <span className="sr-only">Delete</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                     {users &&
                        users.map((user) => (
                           <tr key={user.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                 {user.id}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                 {user.name}
                              </td>

                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                 {user.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                 {user.created_at}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                 <button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
