'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, School, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/components/providers/auth-provider';
import LearnSync from '@/components/assets/LearnSync-logo (2).png';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
}

export default function RegistrationChoices() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('student');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const roles = [
    {
      id: 'school-admin',
      label: 'School Admin',
      icon: <School className="h-8 w-8" />,
      description: 'Manage your educational institution',
      route: '/signup/admin',
    },
    {
      id: 'tutor',
      label: 'Tutor / Teacher',
      icon: <Users className="h-8 w-8" />,
      description: 'Teach and guide students',
      route: '/signup/tutor',
    },
    {
      id: 'student',
      label: 'Student',
      icon: <BookOpen className="h-8 w-8" />,
      description: 'Learn and grow with us',
      route: '/signup/student',
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);

    if (roleId === 'student') {
      setCurrentStep(2);
      return;
    }

    // Find the selected role's route
    const selectedRoleData = roles.find((role) => role.id === roleId);

    if (selectedRoleData) {
      // Store the selected role in sessionStorage for the next step
      sessionStorage.setItem(
        'registrationData',
        JSON.stringify({
          role: roleId,
        })
      );

      // Navigate to the appropriate registration page
      router.push(selectedRoleData.route);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: selectedRole,
        organizationId: selectedOrganization,
      });
    } catch (err: any) {
      console.error('Error during sign-up:', err);
      alert(err.message || 'An error occurred during sign-up.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950 antialiased">
      {/* Header */}
      <header className="p-6 md:px-10 md:py-2 border border-red-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* <div className="flex items-center gap-3 text-gray-900 dark:text-white">
            <div className="size-6 text-secondary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              LearnSync
            </h2>
          </div> */}
          <Image src={LearnSync} alt="LearnSync Logo" width={150} height={50} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
              Already have an account?
            </span>
            <Link href="/login">
              <Button variant="outline" size="sm" className="h-9">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {/* Left Side - Illustration */}
          <div className="hidden bg-gray-50 dark:bg-gray-900 md:flex md:items-center md:justify-center p-8">
            <div className="w-full max-w-md">
              <div
                className="aspect-square w-full rounded-xl bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAniUtBnmPkZx4dyPtjkaAanHtNwkKuEG4fwMBD3mEAe4tOoNEOVsHQa0AaCrFzQ5kpoTIqke4mjbzXvfrkelbWj-o77JCRVWJcPuZnmVZA0AXQzT5RBN5h1TgZwEtaZz8ax1zt6Ka-j_MNJYyKTyyD61W3ZEyjfcj0_a4a_yMG84N5-RcjAagGewDiB1TjWThH0X9zHuB1G7lqfYJNElbxZYWTKyKpeM67hBhWtQkST39EMc1DrtKF3FHxOTm9mH8gIBkoJhC3Wfeo")`,
                }}
                aria-label="Abstract gradient illustration representing modern learning and collaboration"
              />
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex w-full items-center justify-center bg-white dark:bg-gray-800 py-24 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              {/* Step 1: Role Selection */}
              {currentStep === 1 && (
                <>
                  <div>
                    <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      Create your account
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                      First, tell us who you are.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role.id)}
                        className={`group cursor-pointer rounded-lg border p-4 text-center transition-all ring-2 ring-transparent ring-offset-2 ring-offset-background-light focus:outline-none focus:ring-primary ${selectedRole === role.id
                          ? 'border-2 border-primary bg-primary/10 ring-primary'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-primary'
                          }`}
                      >
                        <div className="mb-3 flex justify-center text-primary">
                          {role.icon}
                        </div>
                        <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal">
                          {role.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {role.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2: Organization Search */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <p className="text-base font-semibold text-secondary">Step 2 of 3</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-white sm:text-4xl">
                      Find Your School
                    </h1>
                    <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                      Select your institution to connect with your teachers and classes.
                    </p>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: '66%' }}></div>
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
                          <div className="text-left">
                            <p className="font-semibold text-text-primary dark:text-white">{org.name}</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">{org.address || 'Address not listed'}</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="organization"
                          value={org.id}
                          checked={selectedOrganization === org.id}
                          onChange={() => setSelectedOrganization(org.id)}
                          className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300"
                        />
                      </label>
                    ))}
                    {filteredOrganizations.length === 0 && (
                      <p className="text-center text-text-secondary py-8">No organizations found.</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 h-12 text-base font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedOrganization}
                      className="flex-2 h-12 text-base font-semibold bg-primary hover:bg-primary/90 cursor-pointer disabled:opacity-50"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Form */}
              {currentStep === 3 && (
                <>
                  <div className="text-center">
                    <p className="text-base font-semibold text-secondary">Step 3 of 3</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-white sm:text-4xl">
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
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Full Name
                        </label>
                        <div className="mt-1">
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="text-gray-900 dark:text-white"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="text-gray-900 dark:text-white"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            className="text-gray-900 dark:text-white"
                            disabled={isLoading}
                            minLength={8}
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary cursor-pointer h-11 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Creating account...
                          </div>
                        ) : (
                          `Complete Registration`
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="w-full h-11"
                        disabled={isLoading}
                      >
                        Back to School Search
                      </Button>
                    </div>
                  </form>

                  {/* Social Login */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-600 dark:text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full h-10 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        type="button"
                        onClick={() => window.location.href = `/api/auth/google?role=${selectedRole.toUpperCase().replace(/-/g, '_')}&organizationId=${selectedOrganization}`}
                        disabled={isLoading}
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="ml-2">Google</span>
                      </Button>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                    By creating an account, you agree to our{' '}
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      Terms of Service
                    </a>
                    .
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
