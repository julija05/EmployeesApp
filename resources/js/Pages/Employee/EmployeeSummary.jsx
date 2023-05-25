import { Head } from '@inertiajs/react';
import PaymentsTable from '@/Components/PaymentsTable';
import NavLink from '@/Components/NavLink';

export default function EmployeeSummary({ employee,averagePayPerHour,lastFivePayments,averageTotalPay }) {
    return (
        <div>
            <Head title="Employee Summary" />
            <div className="py-12">
            <nav class=" m-12 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 dark:border-gray-600">
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <div class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <NavLink className='text-base'  href={route('employees.index')}>Employees</NavLink>
                            <NavLink className='text-base'  href={route('shifts.index')}>Shifts</NavLink>
                            <NavLink className='text-base'  href={route('shifts.create')}> Create Shift</NavLink>
                </div>
            </div>
        </nav>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{employee.worker}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Average pay per hour:{averagePayPerHour}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Average total pay:{averageTotalPay}</div>
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
