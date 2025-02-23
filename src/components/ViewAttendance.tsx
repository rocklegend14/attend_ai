import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

export default function ViewAttendance() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');

  // Mock data for demonstration
  const attendanceData = [
    { id: '1', name: 'John Doe', status: 'Present', time: '09:00 AM' },
    { id: '2', name: 'Jane Smith', status: 'Present', time: '09:05 AM' },
    { id: '3', name: 'Mike Johnson', status: 'Absent', time: '-' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Search subject"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-4 text-sm">{student.id}</td>
                  <td className="px-6 py-4 text-sm">{student.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{student.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}