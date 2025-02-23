import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';

export default function RegisterStudent() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [capturing, setCapturing] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    setCapturing(true);
    // Here we would implement the face detection and training logic
    setTimeout(() => {
      setCapturing(false);
      alert('Student registered successfully!');
      setStudentId('');
      setName('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Student Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter full name"
              />
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Capture Face</h3>
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
            <button
              onClick={capture}
              disabled={!studentId || !name || capturing}
              className={`mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg ${
                !studentId || !name || capturing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              } text-black font-semibold transition-colors`}
            >
              <Camera className="w-5 h-5" />
              <span>{capturing ? 'Capturing...' : 'Capture & Register'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}