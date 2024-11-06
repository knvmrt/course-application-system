import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Creating an object to hold errors
        const newErrors = {};

        // Check if the username and password fields are empty
        if (!username) newErrors.username = "Username required!";
        if (!password) newErrors.password = "Password required!";

        // Kullanıcı adı veya şifre yanlışsa hata mesajlarını belirleyin
        if (username && username !== "Admin") newErrors.username = "Invalid username!";
        if (password && password !== "admin123") newErrors.password = "Invalid password!";

        // If there are errors, update the errors with setErrors and stop the process
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If there is no error, the verification status is saved and redirected
        localStorage.setItem("authenticated", "true");
        router.push("/authentication/applications");
    };

    return (
        <section className="bg-gray-800 min-h-screen">
            <header className='flex bg-black text-white justify-center'>
                <div className="container flex justify-center">
                    <ul className='text-center text-xl font-bold pb-5 pt-3 flex justify-start gap-10'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/authentication/auth">Applications</Link></li>
                    </ul>
                </div>
            </header>
            <main className="flex justify-center items-center mt-56">

                <section className="grid grid-cols-1 px-16 py-12 bg-gray-900 shadow-[0_30px_50px_-10px_#0106118c] rounded-xl">

                    <h1 className="text-white font-black text-2xl flex justify-center mb-5">Verification</h1>
                    <form className="flex items-center flex-col gap-10" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="User:"
                                className="w-full py-1 px-2 rounded-md"
                            />
                            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password:"
                                className="w-full py-1 px-2 rounded-md"
                            />
                            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        </div>

                        <button type="submit" className="bg-blue-700 text-white font-bold rounded-md hover:bg-blue-950 outline-none px-28 py-2 w-full">Submit</button>
                    </form>
                </section>
            </main>
        </section>
    );
}

export default AuthPage;