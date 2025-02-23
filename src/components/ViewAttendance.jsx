import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter } from 'lucide-react';

export default function ViewAttendance() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch attendance records from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/attendance")
      .then((res) => {
        setAttendanceData(res.data);
        setFilteredData(res.data); // Initially show all data
      })
      .catch((err) => console.error("Error fetching attendance:", err));
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = attendanceData;

    if (subject) {
      filtered = filtered.filter(record => record.subject.toLowerCase().includes(subject.toLowerCase()));
    }

    if (date) {
      filtered = filtered.filter(record => record.timestamp.startsWith(date));
    }

    setFilteredData(filtered);
  }, [subject, date, attendanceData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Attendance Records</h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <Filter className="w-5 h-5" />
            <span>Filter Results</span>
          </div>
        </div>

        {/* Subject and Date Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Student ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={record.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{record.student_id}</td>
                    <td className="px-6 py-4 text-sm">{record.name}</td>
                    <td className="px-6 py-4 text-sm">{record.subject}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'Present'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{new Date(record.timestamp).toLocaleString()}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">No attendance records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
