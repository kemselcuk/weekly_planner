import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutUs: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen border-hidden shadow-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className={`mx-auto max-w-2xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            We’re a team of creators, strategists, and innovators dedicated to 
            helping you stay organized and focused. Our mission is to simplify 
            your daily routines and empower you to achieve more.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className={`mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              At the heart of everything we do is our belief in simplicity, 
              productivity, and growth. Our weekly and monthly planners 
              are crafted to adapt to your evolving needs, ensuring that you 
              can plan effectively and focus on what matters most.
            </p>
            <p className={`mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Whether you’re a busy professional, a student balancing studies 
              and hobbies, or a family looking to stay on top of appointments 
              and events, our tools are here to help you take control of your 
              schedule.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            {/* Placeholder illustration */}
            <div className="w-full h-64 bg-purple-400/20 rounded-lg flex items-center justify-center shadow-xl">
              <span className={`text-lg font-medium ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                [Insert Mission Illustration]
              </span>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div
              className={`flex flex-col items-center p-6 rounded-lg border shadow-lg ${
                isDarkMode ? 'bg-black bg-opacity-15 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="w-24 h-24 bg-purple-300/20 rounded-full flex items-center justify-center mb-4">
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  [Photo]
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Founder & CEO</p>
              <p className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Passionate about productivity and simplicity, Alex leads 
                the vision for our products and ensures we always stay 
                user-focused.
              </p>
            </div>

            {/* Team Member 2 */}
            <div
              className={`flex flex-col items-center p-6 rounded-lg border shadow-lg ${
                isDarkMode ? 'bg-black bg-opacity-15 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="w-24 h-24 bg-purple-300/20 rounded-full flex items-center justify-center mb-4">
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  [Photo]
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Taylor Kim</h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Head of Product Design</p>
              <p className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                From concept to creation, Taylor ensures our tools are intuitive, 
                modern, and delightful, delivering the best user experience.
              </p>
            </div>

            {/* Team Member 3 */}
            <div
              className={`flex flex-col items-center p-6 rounded-lg border shadow-lg ${
                isDarkMode ? 'bg-black bg-opacity-15 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="w-24 h-24 bg-purple-300/20 rounded-full flex items-center justify-center mb-4">
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  [Photo]
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Jordan Lee</h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Lead Engineer</p>
              <p className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                With a passion for clean code and efficiency, Jordan makes sure 
                our tools run smoothly and scale effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Footer Section */}
        <section className="text-center pt-8">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className={`max-w-xl mx-auto mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Have questions or feedback? We’d love to hear from you. Drop us a 
            line anytime, and we’ll get back to you as soon as possible.
          </p>
          <button
            className={`py-2 px-4 font-medium rounded ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-500 text-gray-100 shadow-md'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
            }`}
          >
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
