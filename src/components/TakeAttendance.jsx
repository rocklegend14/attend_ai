import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { Camera, Loader, BookOpen } from "lucide-react";

export default function TakeAttendance() {
  const [subject, setSubject] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = useRef(null);

  const startAttendance = async () => {
    if (!subject.trim()) {
      alert("❌ Please enter the subject name before recording.");
      return;
    }

    setIsRecording(true);

    // Capture the image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("❌ Unable to capture image. Please check your webcam.");
      setIsRecording(false);
      return;
    }

    try {
      // Ensure the backend is running on the correct port (5000 or 8000)
      const response = await axios.post("http://localhost:5000/attendance", {
        subject: subject,
        image: imageSrc, // Sending image in base64 format
      });

      if (response.data.success) {
        alert("✅ Attendance recorded successfully!");
      } else {
        alert("❌ Attendance recording failed: " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error recording attendance:", error);
      alert("❌ An error occurred while recording attendance. Check backend logs.");
    }

    setSubject("");
    setIsRecording(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Subject Input Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-semibold">Record Attendance</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Enter subject name"
              />
            </div>
            {isRecording && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-green-500">Recording in progress...</p>
                </div>
              </div>
            )}
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
            <h3 className="text-2xl font-semibold">Camera Feed</h3>
          </div>
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-white">Recording</span>
                </div>
              )}
              <div className="absolute inset-0 border-2 border-yellow-400/50 rounded-lg" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startAttendance}
              disabled={!subject.trim() || isRecording}
              className={`mt-6 w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg ${
                !subject.trim() || isRecording
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              } text-black font-semibold transition-all shadow-lg hover:shadow-xl`}
            >
              {isRecording ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Recording Attendance...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Start Recording</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
