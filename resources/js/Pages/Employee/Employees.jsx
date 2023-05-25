import EmployeeTable from '@/Components/EmployeeTable';
import NavLink from '@/Components/NavLink';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Employees({employees}) {
   
    return (
        <div>
        <div className="py-12">
        <nav className=" m-12 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 dark:border-gray-600">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <div className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <NavLink className='text-base'  href={route('employees.index')}>Employees</NavLink>
                            <NavLink className='text-base'  href={route('shifts.index')}>Shifts</NavLink>
                            <NavLink className='text-base'  href={route('shifts.create')}> Create Shift</NavLink>
                </div>
            </div>
        </nav>
             <Head title="Employees" />
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <EmployeeTable key={employees.length.toString()} employees={employees}></EmployeeTable>
                </div>
            </div>
            </div>
    );
}
