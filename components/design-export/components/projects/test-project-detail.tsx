import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { ArrowLeft } from 'lucide-react';

export function TestProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Test Project Detail Page</h1>
          <p className="text-gray-400">Project ID: {id}</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Debug Info</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• URL Parameter ID: {id}</li>
          <li>• Component successfully loaded</li>
          <li>• React Router working correctly</li>
        </ul>
      </div>
    </div>
  );
}
