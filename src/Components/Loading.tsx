import React from 'react';
import { CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <CircularProgress size={60} style={{ color: '#1E3A8A' }} />
                <span className="mt-4 text-xl font-semibold text-gray-700">Cargando...</span>
            </div>
        </div>
    );
}