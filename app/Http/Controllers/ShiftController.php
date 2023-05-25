<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShiftRequest;
use App\Http\Requests\UpdateShiftRequest;
use Illuminate\Support\Facades\Redirect;
use App\Models\Shift;
use App\Models\Employee;
use App\Models\Company;
use App\Events\CachedDataChanged;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->createView('Shifts/AllShifts');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->createView('Shifts/CreateShift',['title'=>'Create']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShiftRequest $request)
    {
        Shift::create($request->validated());

        event(new CachedDataChanged());

        return Redirect::route('shifts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift)
    {
        return $this->createView('Shifts/CreateShift',[
            'shift' => $shift,
            'title'=> 'Edit',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShiftRequest $request, Shift $shift)
    {
        $shift->update($request->validated());

        event(new CachedDataChanged());

        return Redirect::route('shifts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();

        event(new CachedDataChanged());

        return Redirect::route('shifts.index');
    }
}
