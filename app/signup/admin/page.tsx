// app/signup/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';

export default function SchoolAdminRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Organization Details
    organizationName: '',
    organizationEmail: '',
    organizationPhone: '',
    organizationAddress: '',

    // Administrator Details
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminPhone: '',
  });

  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  useEffect(() => {
    // Retrieve the registration data from sessionStorage
    const storedData = sessionStorage.getItem('registrationData');
    if (storedData) {
      const parsed = JSON.parse(storedData);

      // Pre-fill admin fields from the initial registration if available
      setFormData((prev) => ({
        ...prev,
        adminName: parsed.fullName || '',
        adminEmail: parsed.email || '',
        adminPassword: parsed.password || '',
      }));

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

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      console.error('Clerk not loaded');
      return;
    }

    setIsLoading(true);

    try {
      // Create the school admin account with Clerk
      await signUp.create({
        emailAddress: formData.adminEmail,
        password: formData.adminPassword,
        firstName: formData.adminName.split(' ')[0],
        lastName: formData.adminName.split(' ').slice(1).join(' ') || '',
        unsafeMetadata: {
          role: 'school-admin',
          organizationName: formData.organizationName,
          organizationEmail: formData.organizationEmail,
          organizationPhone: formData.organizationPhone,
          organizationAddress: formData.organizationAddress,
          adminPhone: formData.adminPhone,
          registrationCompleted: false,
          accountStatus: 'active', // School admins are typically active immediately
        },
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Store registration data for verification page
      sessionStorage.setItem(
        'pendingVerification',
        JSON.stringify({
          email: formData.adminEmail,
          role: 'school-admin',
          fullName: formData.adminName,
          organizationName: formData.organizationName,
        })
      );

      // Redirect to verification page
      router.push('/verify-email');
    } catch (err: any) {
      console.error('Error during school admin sign-up:', err);

      // Enhanced error handling
      if (err.errors) {
        const error = err.errors[0];
        if (error.code === 'form_identifier_exists') {
          alert(
            'An account with this email already exists. Please log in instead.'
          );
        } else if (error.code === 'form_password_length_too_short') {
          alert('Password must be at least 8 characters long.');
        } else if (error.code === 'form_password_pwned') {
          alert(
            'This password has been compromised. Please choose a different password.'
          );
        } else {
          alert(`Error: ${error.longMessage || error.message}`);
        }
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
                <p className="text-text-secondary dark:text-gray-400">
                  Set up your institution and administrator profile
                </p>
              </div>

              <form
                onSubmit={handleAdminSubmit}
                className="flex flex-col gap-8"
              >
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
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
                        required
                        disabled={isLoading}
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
                          required
                          disabled={isLoading}
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 pt-1.5">
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
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* CTA and Footer Link */}
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={!isLoaded || isLoading}
                    className="min-w-40 h-12 rounded-full bg-primary hover:bg-primary/90 w-full text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
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
