import React, { useRef, useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, UserPlus, Loader } from 'lucide-react';

export default function RegisterStudent() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [capturing, setCapturing] = useState(false);
  const webcamRef = useRef(null);

  const capture = async () => {
    if (!studentId || !name) {
      alert("Please enter Student ID and Name before capturing.");
      return;
    }

    setCapturing(true);
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam

    try {
      const response = await axios.post("http://localhost:5000/register", {
        student_id: studentId,
        name: name,
        image: imageSrc // Sending image in base64 format
      });

      if (response.data.success) {
        alert("Student registered successfully!");
        setStudentId('');
        setName('');
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error registering student:", error);
      alert("An error occurred while registering.");
    }

    setCapturing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Information Form */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-8">
            <UserPlus className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-semibold">Student Information</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
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
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter full name"
              />
            </div>
          </div>
        </motion.div>

        {/* Webcam Capture Section */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Camera className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-semibold">Capture Face</h3>
          </div>
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              {/* Overlay frame */}
              <div className="absolute inset-0 border-2 border-yellow-400/50 rounded-lg" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={capture}
              disabled={!studentId || !name || capturing}
              className={`mt-6 w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg ${
                !studentId || !name || capturing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
              } text-black font-semibold transition-all shadow-lg hover:shadow-xl`}
            >
              {capturing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Capture & Register</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
