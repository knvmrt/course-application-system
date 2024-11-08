import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const categories = ['Graphic Design', 'UI/UX Design', 'Front-End', 'Back-End', 'Full-Stack', 'MERN-Stack', 'Ingils dili', 'Rus dili', 'MS-Office']; // Courses
  const timeRanges = ['Late Morning', 'Late Afternoon', 'Same']; // Times

  const router = useRouter();
  const { id } = router.query;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [category, setCategory] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true); // Editing is in progress, so isEditing true
      fetchApplicationData(id); // Get application data by ID
    }
  }, [id]);

  const fetchApplicationData = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setBirthDate(data.birth_date);
      setCategory(data.category);
      setTimeRange(data.time_range);
    }
    if (error) console.error('Error fetching data:', error);
  };

  const [errors, setErrors] = useState({});

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

    if (isEditing) {
      // If editing is to be done, only the update will be done.
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          category: category,
          time_range: timeRange
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Data updated successfully:', data);
        // Clear the form after the application is updated
        setIsEditing(false);
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setCategory('');
        setTimeRange('');
        setErrors({});
      }
    } else {
      // If a new application is to be made, the insertion process will be done.
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
        setErrors({});
      } // Clear the form once the application is added
    }
  };


  return (
    <section className='bg-gray-800 min-h-screen'>
      <header className='flex bg-black text-white justify-center'>
        <div className="container flex justify-center">
          <ul className='text-center text-xl font-bold pb-5 pt-3 flex justify-start gap-10'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/authentication/auth">Applications</Link></li>
          </ul>
        </div>
      </header>

      <div className="flex items-center justify-center mt-32">
        <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full shadow-[0_30px_50px_-10px_#0106118c]">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Application Form</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none border-blue-700 border-2 focus:ring-indigo-800 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none border-blue-700 border-2 focus:ring-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none border-blue-700 border-2 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">Courses:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none border-blue-700 border-2 focus:ring-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none border-blue-700 border-2 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select Time Range</option>
                {timeRanges.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.timeRange && <p className="text-red-500 text-sm mt-1">{errors.timeRange}</p>}
            </div>

            <button
              type="submit" className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-950 outline-none">
              {isEditing ? 'Update' : 'Submit'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
