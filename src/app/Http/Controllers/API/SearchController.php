<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(
        private SearchService $searchService
    ) {}

    /**
     * 症例とセミナーノートを横断検索
     * スペース区切り = AND検索、カンマ区切り = OR検索
     */
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $userId = $request->user()->id;

        $results = $this->searchService->search($query, $userId);

        return response()->json($results);
    }
}
