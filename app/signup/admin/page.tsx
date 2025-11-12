'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SchoolAdminRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Organization Details
    organizationName: '',
    organizationEmail: '',
    organizationPhone: '',
    organizationAddress: '',

    // Administrator Details
    adminName: '',
    adminEmail: '',
    adminPassword: 'fakepassword',
    adminPhone: '',
  });
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    // Retrieve the registration data from sessionStorage
    const storedData = sessionStorage.getItem('registrationData');
    if (storedData) {
      setRegistrationData(JSON.parse(storedData));
      // Optionally clear it after retrieval
      sessionStorage.removeItem('registrationData');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1 justify-center items-center py-10 md:py-16 px-4">
          <div className="max-w-2xl w-full flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-center px-4 py-6">
              <div className="flex items-center gap-3">
                <div className="size-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight">
                  LearnSync
                </h2>
              </div>
            </header>

            <main className="w-full">
              {/* Page Heading */}
              <div className="flex flex-col items-center gap-2 pt-4 pb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Create Your Administrator Account
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Organization Details Section */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold leading-tight tracking-tight">
                    Organization Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="organizationName"
                        className="text-base font-medium"
                      >
                        Organization/School Name
                      </label>
                      <Input
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Enter your school's name"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="organizationEmail"
                        className="text-base font-medium"
                      >
                        Organization Email
                      </label>
                      <Input
                        id="organizationEmail"
                        name="organizationEmail"
                        type="email"
                        value={formData.organizationEmail}
                        onChange={handleInputChange}
                        placeholder="Enter your school's email"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="organizationPhone"
                        className="text-base font-medium"
                      >
                        Organization Phone
                      </label>
                      <Input
                        id="organizationPhone"
                        name="organizationPhone"
                        type="tel"
                        value={formData.organizationPhone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="organizationAddress"
                        className="text-base font-medium"
                      >
                        Organization Address
                      </label>
                      <Input
                        id="organizationAddress"
                        name="organizationAddress"
                        value={formData.organizationAddress}
                        onChange={handleInputChange}
                        placeholder="123 Education Lane"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Administrator Details Section */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold leading-tight tracking-tight">
                    Administrator Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="adminName"
                        className="text-base font-medium"
                      >
                        Admin Full Name
                      </label>
                      <Input
                        id="adminName"
                        name="adminName"
                        value={formData.adminName}
                        onChange={handleInputChange}
                        placeholder="e.g. Jane Doe"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="adminEmail"
                        className="text-base font-medium"
                      >
                        Admin Work Email
                      </label>
                      <Input
                        id="adminEmail"
                        name="adminEmail"
                        type="email"
                        value={formData.adminEmail}
                        onChange={handleInputChange}
                        placeholder="Enter your work email"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="adminPassword"
                        className="text-base font-medium"
                      >
                        Create Password
                      </label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          name="adminPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.adminPassword}
                          onChange={handleInputChange}
                          placeholder="Enter a strong password"
                          className="h-12 text-base pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <p className="text-error text-sm font-normal pt-1.5">
                        Password must be at least 8 characters.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="adminPhone"
                        className="text-base font-medium"
                      >
                        Admin Phone Number
                      </label>
                      <Input
                        id="adminPhone"
                        name="adminPhone"
                        type="tel"
                        value={formData.adminPhone}
                        onChange={handleInputChange}
                        placeholder="Your direct phone number"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* CTA and Footer Link */}
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    className="min-w-40 h-12 rounded-full bg-primary hover:bg-primary/90 w-full text-base font-bold"
                  >
                    Create Account
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-semibold text-secondary hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
