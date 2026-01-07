"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';

interface Organization {
    id: string;
    name: string;
    address: string | null;
    email: string | null;
    phone: string | null;
}

export default function StudentRegistration() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const router = useRouter();
    const { register } = useAuth();

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const res = await fetch('/api/organization');
                const data = await res.json();
                if (data.success) {
                    setOrganizations(data.data);
                }
            } catch (err) {
                console.error('Error fetching organizations:', err);
            }
        };
        fetchOrganizations();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOrganizationSelect = (orgId: string) => {
        setSelectedOrganization(orgId);
    };

    const handleStep1Continue = () => {
        if (selectedOrganization) {
            setCurrentStep(2);
        }
    };

    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register({
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                role: 'student',
                organizationId: selectedOrganization,
            });
        } catch (err: any) {
            console.error('Error during student sign-up:', err);
            alert(err.message || 'An error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            <header className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-5 mx-auto">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-text-primary dark:text-background-light">
                        <div className="w-7 h-7 text-primary">
                            <Play className="h-7 w-7" />
                        </div>
                        <h2 className="text-xl font-bold">LearnSync</h2>
                    </Link>
                    <div className="flex items-center gap-4 text-sm font-medium text-text-primary dark:text-background-light">
                        <Link href="/login">
                            <Button variant="outline" className="h-10 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                Log In
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex w-full max-w-2xl flex-1 flex-col items-center justify-start px-4 py-12 sm:px-6 lg:px-8 mx-auto">
                <div className="w-full space-y-8">
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <p className="text-base font-semibold text-secondary">Step 1 of 2</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-background-light sm:text-4xl">
                                    Find Your School
                                </h1>
                                <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                                    Select your institution to connect with your teachers and classes.
                                </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-secondary h-1.5 rounded-full" style={{ width: '50%' }}></div>
                            </div>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-text-secondary" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Search for your school or institution..."
                                    className="pl-12 h-12 text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {filteredOrganizations.map((org) => (
                                    <label
                                        key={org.id}
                                        className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition-all ${selectedOrganization === org.id
                                                ? 'border-secondary ring-2 ring-secondary/50 bg-secondary/5'
                                                : 'border-border-color dark:border-gray-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg size-12 shrink-0 flex items-center justify-center">
                                                <BookOpen className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-text-primary dark:text-background-light">{org.name}</p>
                                                <p className="text-sm text-text-secondary dark:text-gray-400">{org.address || 'Address not listed'}</p>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="organization"
                                            value={org.id}
                                            checked={selectedOrganization === org.id}
                                            onChange={() => handleOrganizationSelect(org.id)}
                                            className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300"
                                        />
                                    </label>
                                ))}
                                {filteredOrganizations.length === 0 && (
                                    <p className="text-center text-text-secondary py-8">No organizations found.</p>
                                )}
                            </div>

                            <Button
                                onClick={handleStep1Continue}
                                disabled={!selectedOrganization}
                                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 cursor-pointer disabled:opacity-50"
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <p className="text-base font-semibold text-secondary">Step 2 of 2</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-background-light sm:text-4xl">
                                    Create Your Profile
                                </h1>
                                <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                                    Enter your details to finish setting up your student account.
                                </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-secondary h-1.5 rounded-full" style={{ width: '100%' }}></div>
                            </div>

                            <form onSubmit={handleStudentSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-text-primary dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="h-11 mt-1"
                                        disabled={isLoading}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="h-11 mt-1"
                                        disabled={isLoading}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary dark:text-gray-300">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="h-11 mt-1"
                                        disabled={isLoading}
                                        placeholder="Create a strong password"
                                        minLength={8}
                                    />
                                    <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
                                        Must be at least 8 characters.
                                    </p>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                Creating account...
                                            </div>
                                        ) : (
                                            'Complete Registration'
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setCurrentStep(1)}
                                        className="w-full h-11"
                                        disabled={isLoading}
                                    >
                                        Back to Step 1
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
