import React, { useRef, useState } from 'react';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import InputLabel from './InputLabel';
import { fetchShifts } from '@/Api/fetchShifts';
import Pagination from './Pagination';
import { useForm } from '@inertiajs/react';
import ToastSuccess from './ToastSucces';


const ShiftsTable = ({ shifts }) => {
  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
      
  });
  const inputRef = useRef()

  const [state, setState] = useState({
    total_pay: 0,
    shifts: shifts.data,
    total_pages: shifts.last_page,
    currentPage: shifts.current_page,
    success:false,
  });

  const handleFilterShifts = (e) => {
    fetchShifts('/api/shiftsByTotalPay', inputRef.current.value).then(dt => {
      setState({
        ...state,
        shifts: dt.data,
        total_pages: dt.last_page,
        currentPage: dt.current_page,
      })
    })
  }

  const setPage = (page)=> {
    fetchShifts('/api/shiftsByTotalPay', inputRef.current.value, page).then(dt => {
      setState({
        ...state,
        currentPage:page,
        shifts: dt.data,
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
        errors.set("deleteShift",'Shift is not deleted');
    }
  };
  return (
    <div className="relative shadow-md sm:rounded-lg">
     <InputLabel>Filter By Total Pay</InputLabel> 
      <input
        name='total_pay'
        type='number'
        min="0"
        ref={inputRef}
      />
      {errors.total_pay && <div className='text-red-500 m-3'>{errors.total_pay}</div>}
      <DangerButton className='ml-2' onClick={(e) => handleFilterShifts(e)}>Filter</DangerButton>
      
      {state.success && <ToastSuccess  onClose={()=>setState({
        ...state,
        success:false,
      })} message='Succesfully Deleted!'/> }

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
                  {item.company_name}
                </th>
                <td className="px-6 py-4">{item.worker}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.hours}</td>
                <td className="px-6 py-4">{item.rate_per_hour}</td>
                <td className="px-6 py-4">{item.shift_type}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{item.paid_at}</td>
                <td className="px-6 py-4">{item.rate_per_hour * item.hours}</td>
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
      <Pagination 
        totalPages={state.total_pages}
        currentPage={state.currentPage}
        setPage={(p)=>setPage(p)}
      />
    </div>
  );
};

export default ShiftsTable;