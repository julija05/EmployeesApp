import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

const EmployeeTable = ({employees}) => {
    const employee = employees;
    const [state, setState] = useState({
        employees: employee,
        success: false,
        error: false,
        errorMessage: '',
    });
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
           <div className='overflow-y-scroll max-h-80'>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.employees.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.worker}
              </th>
              <td className="px-6 py-4 text-right">
                <Link
                  href={route('employees.show',[item.id])}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
