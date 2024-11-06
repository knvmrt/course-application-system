import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

    // Authenticated control
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;

        const isAuthenticated = localStorage.getItem("authenticated");
        if (!isAuthenticated) {
            router.push("/authentication/auth/"); // Redirect to verification page
        }
    }, [router, router.isReady]);

    // Function that performs the deletion operation
    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting data:', error);
        } else {
            // Update the application list
            setApplications(applications.filter((application) => application.id !== id));
        }
    };




    return (
        <section className='bg-gray-800 min-h-screen'>
            <header className='flex bg-black text-white justify-center'>
                <div className="container flex justify-center">
                    <ul className='text-center text-xl font-bold pb-5 pt-3 flex justify-start gap-10'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/authentication/auth/applications">Applications</Link></li>
                    </ul>
                </div>
            </header>

            <div className="flex items-center justify-center">
                <div className="bg-gray-900 p-8 my-20 rounded-xl max-w-2xl w-full shadow-[0_30px_50px_-10px_#0106118c]">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Applications List</h1>

                    {loading ? (
                        <h1 className="text-center text-white font-black text-xl">Loading . . .</h1>
                    ) : (
                        <ul className='x'>
                            {applications.map((application) => (
                                <li key={application.id} className="bg-gray-700 p-4 rounded-lg mb-4 ">
                                    <div>
                                        <p className="text-white"><strong>Name: </strong> {application.first_name} {application.last_name}</p>
                                        <p className="text-white"><strong>Birth Date: </strong> {application.birth_date}</p>
                                        <p className="text-white"><strong>Category: </strong> {application.category}</p>
                                        <p className="text-white"><strong>Time Range: </strong> {application.time_range}</p>
                                        <p className="text-white"><strong>Application date: </strong> {application.created_at}</p>
                                    </div>
                                    <div className="button mt-5 flex justify-end">
                                        <button
                                            className="bg-red-700 text-white font-bold rounded-md hover:bg-red-950 outline-none px-5 py-1 mr-2"
                                            onClick={() => handleDelete(application.id)}>Delete</button>
                                        <Link href={`/?id=${application.id}`}><button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button></Link>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Applications;
