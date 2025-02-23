import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Check } from 'lucide-react';

export default function TakeAttendance() {
  const [subject, setSubject] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const startAttendance = () => {
    if (!subject) return;
    setIsRecording(true);
    // Here we would implement the face recognition logic
    setTimeout(() => {
      setIsRecording(false);
      alert('Attendance recorded successfully!');
      setSubject('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Record Attendance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter subject name"
              />
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Camera Feed</h3>
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
            <button
              onClick={startAttendance}
              disabled={!subject || isRecording}
              className={`mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg ${
                !subject || isRecording
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              } text-black font-semibold transition-colors`}
            >
              {isRecording ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Recording Attendance...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Start Recording</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}