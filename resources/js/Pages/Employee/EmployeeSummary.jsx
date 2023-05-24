import { Head } from '@inertiajs/react';
import PaymentsTable from '@/Components/PaymentsTable';

export default function EmployeeSummary({ employee,averagePayPerHour,lastFivePayments,averageTotalPay }) {
    return (
        <div>
            <Head title="Employee Summary" />

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
