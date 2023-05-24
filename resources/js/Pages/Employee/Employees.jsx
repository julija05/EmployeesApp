import EmployeeTable from '@/Components/EmployeeTable';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Employees({employees}) {
   
    return (
        <div>
        <div className="py-12">
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
