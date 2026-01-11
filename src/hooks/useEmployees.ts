import { useEffect, useState } from 'react';
import type { Employee } from '@/domain/employee/employee.types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/employees`);

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data = await res.json();

        // Handle mock-json-api structure
        if (data.employees && Array.isArray(data.employees)) {
          setEmployees(data.employees);
        } else if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          setEmployees([]);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
