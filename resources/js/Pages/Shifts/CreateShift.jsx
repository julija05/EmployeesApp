import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import moment from 'moment';
import img from '../../../assets/undraw_add_files_re_v09g.svg'

export default function CreateShift(props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
      id: props.shift ? props.shift.id : null,
      date: props.shift ? moment(props.shift.date).format('YYYY-MM-DD') : '',
      employee_id:(props.shift?props.shift.employee_id:(props.employees && props.employees.length>0?props.employees[0].id:'')),
      company_id:(props.shift ? props.shift.company_id : (props.companies && props.companies.length>0?props.companies[0].id:'')),
      hours: props.shift ? props.shift.hours : '',
      rate_per_hour:props.shift ? props.shift.rate_per_hour : '',
      status:props.shift ? props.shift.status :'Complete',
      shift_type:props.shift ? props.shift.shift_type :'Day',
      paid_at: props.shift && props.shift.paid_at ? moment(props.shift.paid_at).format('YYYY-MM-DD') : '',
    });

    const [state, setState] = useState({
        success: false,
        error: false,
        errorMessage: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if(props.shift && props.shift.id){
            put(route('shifts.update', [props.shift.id]), {
                onError: (error) => {
                    setState({ ...state, error: true, errorMessage: error });
                },
                onSuccess: () => {
                    setState({ ...state, success: true, error: false, errorMessage: "" });
                }
            });
            return;
        }
        post(route('shifts.store'), {
            onError: (error) => {
                setState({ ...state, error: true, errorMessage: error });
            },
            onSuccess: () => {
                setState({ ...state, success: true, error: false, errorMessage: "" });
            }
        });
    }    

    return (
        <div>
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
            <div className="flex flex-row justify-between mt-10">
                <div className="border ml-16 shadow-2xl w-1/2">
                    <form onSubmit={submit}>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Date" />
                                <input name='date' id='date' value={data.date} type='date' onChange={(e) => setData('date', e.target.value)} required></input>
                            </div>
                            {errors.date && <div className='text-red-500 m-3'>{errors.date}</div>}
                            <div className="p-12">
                                <InputLabel value="Worker" />
                                <select name='employee_id' value={data.employee_id} onChange={(e)=>{setData('employee_id', e.target.value)}}>
                               {props.employees && props.employees.map((item)=>{
                                 return <option key={item.id} value={item.id}>{item.worker}</option>
                               })}
                               </select>
                            </div>
                            {errors.employee_id && <div className='text-red-500 m-3'>{errors.employee_id}</div>}
                            <div className="p-12">
                                <InputLabel value="Company" />
                                <select name='company_id' value={data.company_id} onChange={(e)=>{setData('company_id', e.target.value)}}>
                               {props.companies && props.companies.map((item)=>{
                                 return <option key={item.id} value={item.id}>{item.name}</option>
                               })}
                               </select>
                            </div>
                            {errors.company_id && <div className='text-red-500 m-3'>{errors.company_id}</div>}
                        </div>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Hours" />
                                <input name='hours' value={data.hours} onChange={(e)=>{setData('hours', e.target.value)}} type='number' min='0'required></input>
                            </div>
                            {errors.hours && <div className='text-red-500 m-3'>{errors.hours}</div>}
                            <div className="p-12">
                                <InputLabel value="Rate Per Hour" />
                                <input name='rate_per_hour' value={data.rate_per_hour} onChange={(e)=>{setData('rate_per_hour', e.target.value)}} type='number' min='0' required></input>
                            </div>
                            {errors.rate_per_hour && <div className='text-red-500 m-3'>{errors.rate_per_hour}</div>}
                        </div>
                        <div className="sm:flex sm:flex-row sm:justify-start sm:items-start p">
                            {/* {errors.activityDateFrom && <div className="text-red-500 m-3">{errors.activityDateFrom}</div>} */}
                            <div className="p-12">
                                <InputLabel value="Status" />
                                <select name='status' value={data.status} onChange={(e)=>{setData('status', e.target.value)}}>
                                  <option key={0} value={'Complete'}>Complete</option>
                                  <option key={1} value={'Pending'}>Pending</option>
                               </select>
                            </div>
                            {errors.status && <div className='text-red-500 m-3'>{errors.status}</div>}
                            <div className="p-12">
                                <InputLabel value="Shift Type" />
                                <select name='shift_type' value={data.shift_type} onChange={(e)=>{setData('shift_type', e.target.value)}}>
                                  <option key={0} value={'Day'}>Day</option>
                                  <option key={1} value={'Night'}>Night</option>
                                  <option key={2} value={'Holiday'}>Holiday</option>
                               </select>
                            </div>
                            {errors.shift_type && <div className='text-red-500 m-3'>{errors.shift_type}</div>}
                            <div className="p-12">
                                <InputLabel value="Paid At" />
                                <input name='paid_at' id='paid_at' value={data.paid_at} type='date' onChange={(e) => setData('paid_at', e.target.value)}></input >
                            </div>
                        </div>
                        {errors.paid_at && <div className='text-red-500 m-3'>{errors.paid_at}</div>}
                        <div className="flex flex-col justify-end items-start p-8 mt-28">   
                            <div>
                                <PrimaryButton className="mt-12">{props.title}</PrimaryButton>
                                <SecondaryButton className="mt-12 ml-2">
                                    {' '}
                                    <Link href={route('shifts.index')}> Cancel </Link>
                                </SecondaryButton>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='m-5'><img src={img} alt="add/edit new shift" /></div>
            </div>
        </div>
    );
}