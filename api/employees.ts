import { sampleEmployees } from '@/data/sampleEmployeeData';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mock from 'mock-json-api';

const mockApi = mock({
  mockRoutes: [
    {
      name: 'getEmployees',
      mockRoute: '/api/employees',
      method: 'GET',
      testScope: 'success',
      jsonTemplate: JSON.stringify({
        employees: sampleEmployees,
      }),
    },
  ],
});

const app = mockApi.createServer();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
