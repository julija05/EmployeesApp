import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';

export default function EditShift({ auth, title, value = null, routeFor = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
      
    });
    const [state, setState] = useState({
        success: false,
        error: false,
        errorMessage: '',
    });


    return (
        <div>
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
            <div className="flex flex-row justify-between mt-10">
                <div className="border ml-16 shadow-2xl w-1/2">
                    <form >
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Date" />
                                <input type='date'></input>
                            </div>
                            <div className="p-12">
                                <InputLabel value="Worker" />
                               <Dropdown className="Worker" options={[1]} />
                            </div>
                            <div className="p-12">
                                <InputLabel value="Company" />
                               <Dropdown className="Company" options={[1]} />
                            </div>
                        </div>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Hours" />
                                <input type='number'></input>
                            </div>
                            <div className="p-12">
                                <InputLabel value="Rate Per Hour" />
                                <input type='number'></input>
                            </div>
                            <div className="p-12">
                                <InputLabel value="Taxable" />
                               <Dropdown className="Company" options={[1]} />
                            </div>
                        </div>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Status" />
                                <Dropdown options={['1','2']}></Dropdown>
                            </div>
                            <div className="p-12">
                                <InputLabel value="Shift Type" />
                                <Dropdown options={['1','2']}></Dropdown>
                            </div>
                            <div className="p-12">
                                <InputLabel value="Paid At" />
                               <input type='date'></input>
                            </div>
                        </div>
                        {/* {errors.activityTimeSpend && <div className="text-red-500 m-3">{errors.activityTimeSpend}</div>} */}
                        <div className="flex flex-col justify-end items-start p-8 mt-28">   
                            {/* {errors.activityDescription && <div className="text-red-500 m-3">{errors.activityDescription}</div>} */}
                            <div>
                                <PrimaryButton className="mt-12">Edit</PrimaryButton>
                                <SecondaryButton className="mt-12 ml-2">
                                    {' '}
                                    <Link href={route('shifts.index')}> Cancel </Link>
                                </SecondaryButton>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="">
                    
                </div>
            </div>
        </div>
    );
}