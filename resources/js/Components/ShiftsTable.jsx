import React, { useState } from 'react';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import InputLabel from './InputLabel';
import { fetchShifts } from '@/Api/fetchShifts';
import { useForm } from '@inertiajs/react';

const ShiftsTable = ({ shifts }) => {

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    total_pay: '',
  });

  const [state, setState] = useState({
    shifts: shifts,
  });


  function handleFilterShifts(e) {
    e.preventDefault();
    fetchShifts('/api/shiftsByTotalPay', data.total_pay).then(dt => {
      console.log(dt, 'data')
      setState({
        ...state,
        shifts: dt,
      })
    })
  }

  const deleteShift = (id) => {
    try {
      destroy(route('shifts.destroy', [id]), {
        preserveScroll: true,
        onSuccess: () => {
          setState((prevState) => ({
            ...prevState,
            shifts: prevState.shifts.filter((shift) => shift.id !== id),
            success: true,
            error: false,
            errorMessage: "",
          }));
        },
        onFinish: () => reset(),
      });
    } catch (error) {
      console.error("", error);
      //   errors.set("deleteActivity",ERROR_DELETE_ACTIVITY);
    }
  };
  return (
    <div className="relative shadow-md sm:rounded-lg">
      <form onSubmit={handleFilterShifts}>
        <InputLabel>Filter By Total Pay</InputLabel>
        <input
          name='total_pay'
          type='number'
          min="0"
          onChange={(e) => setData('total_pay', e.target.value)}
          value={data.total_pay} />
        <DangerButton className='ml-2'>Filter</DangerButton>
      </form>
      <div className='overflow-y-scroll max-h-96 w-full'>
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
              <th scope="col" className="px-6 py-3">
                edit shift
              </th>
              <th scope="col" className="px-6 py-3">
                delete shift
              </th>
            </tr>
          </thead>
          <tbody>
            {state.shifts && Array.isArray(state.shifts) && state.shifts.map((item, index) => (
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
                <td className="px-6 py-4">
                  <a href={route('shifts.edit', [item.id])}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4">
                  <SecondaryButton
                    onClick={() => deleteShift(item.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </SecondaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftsTable;