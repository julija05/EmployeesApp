import EmployeeTable from '@/Components/EmployeeTable';
import ShiftsTable from '@/Components/ShiftsTable';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Shifts({shifts}) {
   
    return (
        <div>
        <div className="py-12">
             <Head title="Shifts" />
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <ShiftsTable key={shifts.length.toString()} shifts={shifts}></ShiftsTable>
                </div>
            </div>
            </div>
    );
}
