<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PatientCase;
use App\Models\SeminarNote;
use Illuminate\Http\Request;

class AdminDataController extends Controller
{
    public function patientCases()
    {
        $cases = PatientCase::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'patient_cases' => $cases
        ]);
    }

    public function seminarNotes()
    {
        $notes = SeminarNote::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'seminar_notes' => $notes
        ]);
    }

    public function statistics()
    {
        return response()->json([
            'total_users' => \App\Models\User::count(),
            'total_patient_cases' => PatientCase::count(),
            'total_seminar_notes' => SeminarNote::count(),
        ]);
    }
}
