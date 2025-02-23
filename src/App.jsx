import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Users, ClipboardList, LogOut, Sparkles } from 'lucide-react';
import RegisterStudent from './components/RegisterStudent';
import TakeAttendance from './components/TakeAttendance';
import ViewAttendance from './components/ViewAttendance';

function App() {
  const [activeComponent, setActiveComponent] = useState('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'register':
        return <RegisterStudent />;
      case 'attendance':
        return <TakeAttendance />;
      case 'view':
        return <ViewAttendance />;
      default:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
          >
            <Card
              icon={<Users className="w-12 h-12" />}
              title="Register Student"
              description="Add a new student to the system"
              onClick={() => setActiveComponent('register')}
              color="from-purple-500 to-pink-500"
            />
            <Card
              icon={<Camera className="w-12 h-12" />}
              title="Take Attendance"
              description="Record attendance using facial recognition"
              onClick={() => setActiveComponent('attendance')}
              color="from-blue-500 to-teal-500"
            />
            <Card
              icon={<ClipboardList className="w-12 h-12" />}
              title="View Attendance"
              description="Check attendance records"
              onClick={() => setActiveComponent('view')}
              color="from-orange-500 to-red-500"
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 animate-gradient" />
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute w-4 h-4 text-yellow-500/30 animate-float-${i % 5}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <header className="relative bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-10 h-10 text-yellow-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Class Vision
              </h1>
            </motion.div>
            {activeComponent !== 'home' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveComponent('home')}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </header>

      <main className="relative max-w-7xl mx-auto py-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome to Class Vision
          </h2>
          <p className="text-gray-400 text-xl">
            Advanced Facial Recognition Attendance System
          </p>
        </motion.div>
        {renderComponent()}
      </main>
    </div>
  );
}

function Card({ icon, title, description, onClick, color }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-left w-full overflow-hidden shadow-xl hover:shadow-2xl`}
    >
      {/* Gradient background that shows on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="text-yellow-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.button>
  );
}

export default App;