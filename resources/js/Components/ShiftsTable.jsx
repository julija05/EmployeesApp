import React from 'react';

const ShiftsTable = ({ shifts }) => {
    console.log(shifts,'data');
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <input type='number' min="0"></input>
          <div className='overflow-y-scroll max-h-96'>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company name
            </th>
            <th scope="col" className="px-6 py-3">
              Employee Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Hours
            </th>
            <th scope="col" className="px-6 py-3">
              Rate per Hour
            </th>
            <th scope="col" className="px-6 py-3">
              Shift type
            </th>
            <th scope="col" className="px-6 py-3">
             Status
            </th>
            <th scope="col" className="px-6 py-3">
            Paid At
            </th>
            <th scope="col" className="px-6 py-3">
            Total pay
            </th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.company.name}
              </th>
              <td className="px-6 py-4">{item.employee.worker}</td>
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{item.hours}</td>
              <td className="px-6 py-4">{item.rate_per_hour}</td>
              <td className="px-6 py-4">{item.shift_type}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">{item.paid_at}</td>
              <td className="px-6 py-4">{item.total_pay}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ShiftsTable;