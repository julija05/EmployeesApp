import { Head } from '@inertiajs/react';
import PaymentsTable from '@/Components/PaymentsTable';
import NavLink from '@/Components/NavLink';

export default function EmployeeSummary({ employee,averagePayPerHour,lastFivePayments,averageTotalPay }) {
    return (
        <div>
            <Head title="Employee Summary" />
            <div className="py-12">
            <nav className=" m-12 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 dark:border-gray-600">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <div className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <NavLink className='text-base'  href={route('employees.index')}>Employees</NavLink>
                            <NavLink className='text-base'  href={route('shifts.index')}>Shifts</NavLink>
                            <NavLink className='text-base'  href={route('shifts.create')}> Create Shift</NavLink>
                            <NavLink className='text-base'  href={route('welcome')}> Upload CSV</NavLink>
                </div>
            </div>
        </nav>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">  
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 font-black">{employee.worker}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 "><span className='mr-2 font-black'>Average Pay Per Hour:</span>{averagePayPerHour}<span className='ml-2'>£</span></div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900"><span className='mr-2 font-black'>Average Total Pay:</span>{averageTotalPay}<span className='ml-2'>£</span></div>
                        </div>
                  </div>  
                 <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <PaymentsTable key={lastFivePayments.length.toString()} data={lastFivePayments}></PaymentsTable>
                </div>
            </div>
                </div>
            </div>
        </div>
    );
}
