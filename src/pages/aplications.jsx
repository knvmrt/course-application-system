// import Link from 'next/link'
// import React from 'react'

// const aplications = () => {
//     return (
//         <>
//             <header className='flex bg-black text-white justify-center'>
//                 <div className="container ">

//                     <ul className='grid grid-cols-1 text-center text-xl font-bold'>
//                         <li><Link href="/">Home</Link></li>
//                         <li><Link href="aplications">Applications</Link></li>
//                     </ul>

//                 </div>
//             </header>

//             <section className='bg-gray-800 text-white flex justify-center pt-14'>

//                 <table class="table-fixed">
//                     <thead>
//                         <tr>
//                             <th className='bg-gray-500 border px-20'>First Name</th>
//                             <th className='bg-gray-500 border px-20'>Last Name</th>
//                             <th className='bg-gray-500 border px-20'>Birth Date</th>
//                             <th className='bg-gray-500 border px-20'>Courses</th>
//                             <th className='bg-gray-500 border px-20'>Select Time Range</th>
//                             <th className='bg-gray-500 border px-20'>Aplication Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>Murad</td>
//                             <td>Gahramanov</td>
//                             <td>05.10.2003</td>
//                             <td>Full-Stack</td>
//                             <td>Same</td>
//                             <td>11.05.2024</td>
//                         </tr>

//                     </tbody>
//                 </table>

//             </section>

//         </>
//     )
// }

// export default aplications



import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('users')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setApplications(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <header className='flex bg-black text-white justify-center'>
                <div className="container">
                    <ul className='grid grid-cols-1 text-center text-xl font-bold pb-5 pt-3'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="aplications">Applications</Link></li>
                    </ul>
                </div>
            </header>

            <div className="min-h-screen flex items-center justify-center bg-gray-800 ">
                <div className="bg-gray-900 p-8 my-20 rounded-lg max-w-2xl w-full shadow-[0_30px_50px_-10px_#0106118c]">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Applications List</h1>

                    {loading ? (
                        <h1 className="text-center text-white font-black text-xl">Loading . . .</h1>
                    ) : (
                        <ul>
                            {applications.map((application) => (
                                <li key={application.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                                    <p className="text-white"><strong>Name:</strong> {application.first_name} {application.last_name}</p>
                                    <p className="text-white"><strong>Birth Date:</strong> {application.birth_date}</p>
                                    <p className="text-white"><strong>Category:</strong> {application.category}</p>
                                    <p className="text-white"><strong>Time Range:</strong> {application.time_range}</p>
                                    <p className="text-white"><strong>Application date:</strong> {application.created_at}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Applications;
