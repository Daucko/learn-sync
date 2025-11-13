'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, School, Users, Github, Square } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RegistrationChoices() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const router = useRouter();

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

    // Find the selected role's route
    const selectedRoleData = roles.find((role) => role.id === roleId);

    if (selectedRoleData && (roleId === 'school-admin' || roleId === 'tutor')) {
      // Store the selected role in sessionStorage
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle student registration
    console.log({ ...formData, role: selectedRole });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display antialiased">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 md:px-10 md:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 text-gray-900 dark:text-white">
            <div className="size-6 text-secondary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              LearnSync
            </h2>
          </div>
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

      <main className="flex flex-1 pt-20">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {/* Left Side - Illustration */}
          <div className="hidden bg-gray-50 dark:bg-gray-900 md:flex md:items-center md:justify-center p-8">
            <div className="w-full max-w-md">
              <div
                className="aspect-square w-full rounded-xl bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAniUtBnmPkZx4dyPtjkaAanHtNwkKuEG4fwMBD3mEAe4tOoNEOVsHQa0AaCrFzQ5kpoTIqke4mjbzXvfrkelbWj-o77JCRVwJcPuZnmVZA0AXQzT5RBN5h1TgZwEtaZz8ax1zt6Ka-j_MNJYyKTyyD61W3ZEyjfcj0_a4a_yMG84N5-RcjAagGewDiB1TjWThH0X9zHuB1G7lqfYJNElbxZYWTKyKpeM67hBhWtQkST39EMc1DrtKF3FHxOTm9mH8gIBkoJhC3Wfeo")`,
                }}
                aria-label="Abstract gradient illustration representing modern learning and collaboration"
              />
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex w-full items-center justify-center bg-white dark:bg-gray-800 py-24 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Create your account
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                  First, tell us who you are.
                </p>
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`group cursor-pointer rounded-lg border p-4 text-center transition-all ring-2 ring-transparent ring-offset-2 ring-offset-background-light focus:outline-none focus:ring-primary ${
                      selectedRole === role.id
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

              {/* Only show form for student role */}
              {selectedRole === 'student' && (
                <>
                  {/* Registration Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            className="text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-primary cursor-pointer h-11 text-sm font-bold"
                      >
                        Continue as{' '}
                        {roles.find((r) => r.id === selectedRole)?.label}
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

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full h-10">
                        <Github className="h-5 w-5" />
                        <span className="ml-2">Google</span>
                      </Button>
                      <Button variant="outline" className="w-full h-10">
                        <Square className="h-5 w-5" />
                        <span className="ml-2">Microsoft</span>
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
