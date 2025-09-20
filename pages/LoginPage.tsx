import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { USERS } from '@/data';
import { UserRole } from '@/types';
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const loggedIn = login(email, password);
        if (loggedIn) {
            const user = USERS.find(u => u.email === email);
            if (user?.role === UserRole.CONSUMER) {
                navigate('/dashboard/consumer');
            } else if (user?.role === UserRole.SHOPKEEPER) {
                navigate('/dashboard/shopkeeper');
            }
        } else {
            setError('Invalid email or password.');
        }
    };
    
    const setCredentials = (role: 'consumer' | 'shopkeeper') => {
        const user = USERS.find(u => u.role === role);
        if (user) {
            setEmail(user.email);
            setPassword(user.password || '');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <Link to="/" className="text-3xl font-bold text-green-800 mb-8">YahiPe</Link>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input 
                            type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition-colors">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Use dummy credentials:</p>
                    <div className="flex justify-center gap-2 mt-2">
                        <button onClick={() => setCredentials('consumer')} className="text-green-800 hover:underline">Consumer</button>
                        <span>|</span>
                        <button onClick={() => setCredentials('shopkeeper')} className="text-green-800 hover:underline">Shopkeeper</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
