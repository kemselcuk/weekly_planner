import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Pricing: React.FC = () => {
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: 'Free',
      price: '$0/month',
      features: ['Basic features', 'Limited storage', 'Email support'],
    },
    {
      name: 'Plus',
      price: '$9/month',
      features: ['All Free features', 'More storage', 'Priority email support'],
    },
    {
      name: 'Professional',
      price: '$29/month',
      features: ['All Plus features', 'Unlimited storage', '24/7 phone support'],
    },
  ];

  return (
    <div
      className={`min-h-screen flex justify-center shadow-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Pricing</h1>
        {/* Use a grid layout with items-stretch to ensure equal heights */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-6 rounded-lg shadow-lg border ${
                isDarkMode
                  ? 'bg-black bg-opacity-15 border-gray-700'
                  : 'bg-white border-gray-200'
              } transition-all hover:shadow-2xl`}
            >
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-xl font-bold mb-4">{plan.price}</p>
              
              {/* Make the feature list flex-1 so it takes up available space, ensuring equal height */}
              <ul className="mb-6 space-y-2 flex-1">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Button at the bottom of the card */}
              <button
                className={`py-2 px-4 font-medium rounded mt-auto ${
                  isDarkMode
                    ? 'bg-purple-600 hover:bg-purple-500 text-gray-100'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
