import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [category, setCategory] = useState('');
  const [timeRange, setTimeRange] = useState('');

  const [errors, setErrors] = useState({});

  const categories = ['Graphic Design', 'UI/UX Design', 'Front-End', 'Back-End', 'Full-Stack', 'MERN-Stack', 'Ingils dili', 'Rus dili', 'MS-Office']; // Courses
  const timeRanges = ['Late Morning', 'Late Afternoon', 'Same']; // Times

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!category) newErrors.category = 'Category is required';
    if (!timeRange) newErrors.timeRange = 'Time Range is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ first_name: firstName, last_name: lastName, birth_date: birthDate, category: category, time_range: timeRange }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);

      setFirstName('');
      setLastName('');
      setBirthDate('');
      setCategory('');
      setTimeRange('');
      setErrors({}); // Clear error messages
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full shadow-[0_30px_50px_-10px_#0106118c]">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">User Form</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder='First Name' />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder='Last Name' />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Courses:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select a course</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-300">Select Time Range:</label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select Time Range</option>
              {timeRanges.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.timeRange && <p className="text-red-500 text-sm mt-1">{errors.timeRange}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-950 outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
