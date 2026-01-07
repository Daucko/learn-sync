import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Search, Upload, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';

export default function TutorRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    organizationSearch: '',

    // Step 2
    fullName: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
    bio: '',
    cv: null as File | null,
  });

  const router = useRouter();
  const { register } = useAuth();

  const organizations = [
    {
      id: 'northwood',
      name: 'Northwood High School',
      location: 'Irvine, CA',
      stats: '120 Teachers, 2500 Students',
    },
    {
      id: 'canyon',
      name: 'Canyon University',
      location: 'Phoenix, AZ',
      stats: '850 Faculty, 20000 Students',
    },
    {
      id: 'oakridge',
      name: 'Oakridge International Academy',
      location: 'Austin, TX',
      stats: '95 Teachers, 1800 Students',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      cv: file,
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

  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: 'tutor',
        organizationId: selectedOrganization,
      });
    } catch (err: any) {
      console.error('Error during tutor sign-up:', err);
      alert(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Top Navigation */}
      <header className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-5 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-text-primary dark:text-background-light">
            <div className="w-7 h-7 text-primary">
              <Play className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold">LearnSync</h2>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-text-primary dark:text-background-light">
            <Link href="#" className="hover:text-primary">
              About Us
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="h-10 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex w-full max-w-2xl flex-1 flex-col items-center justify-start px-4 py-12 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full space-y-8">
          {/* Step 1: Organization Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Heading */}
              <div className="text-center">
                <p className="text-base font-semibold text-secondary">
                  Step 1 of 2
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-background-light sm:text-4xl">
                  Join Your Organization
                </h1>
                <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                  Find and select your school or institution to get started.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div
                  className="bg-secondary h-1.5 rounded-full"
                  style={{ width: '50%' }}
                ></div>
              </div>

              {/* Search Bar */}
              <div>
                <label htmlFor="organizationSearch" className="sr-only">
                  Search for your school or institution...
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-text-secondary" />
                  </div>
                  <Input
                    id="organizationSearch"
                    name="organizationSearch"
                    type="search"
                    value={formData.organizationSearch}
                    onChange={handleInputChange}
                    placeholder="Search for your school or institution..."
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>

              {/* Organization List */}
              <div className="space-y-4">
                {organizations.map((org) => (
                  <label
                    key={org.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition-all ${selectedOrganization === org.id
                      ? 'border-secondary ring-2 ring-secondary/50'
                      : 'border-border-color dark:border-gray-600'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg size-12 shrink-0"></div>
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold text-text-primary dark:text-background-light">
                          {org.name}
                        </p>
                        <p className="text-sm text-text-secondary dark:text-gray-400">
                          {org.location} • {org.stats}
                        </p>
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
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleStep1Continue}
                disabled={!selectedOrganization}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Tutor Details Form */}
          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Heading */}
              <div className="text-center">
                <p className="text-base font-semibold text-secondary">
                  Step 2 of 2
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary dark:text-background-light sm:text-4xl">
                  Tell Us About Yourself
                </h1>
                <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                  Complete your profile to join LearnSync.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div
                  className="bg-secondary h-1.5 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleTutorSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-text-primary dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="h-11"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary dark:text-gray-300"
                    >
                      Work Email
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
                        className="h-11"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-text-primary dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-11"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-primary dark:text-gray-300"
                  >
                    Create Password
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
                      className="h-11"
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>
                  <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-text-primary dark:text-gray-300"
                  >
                    Specialization / Subject Areas
                  </label>
                  <div className="mt-1">
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="e.g. Mathematics, Physics, History"
                      className="h-11"
                      disabled={isLoading}
                    />
                  </div>
                  <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
                    Separate multiple subjects with a comma.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-text-primary dark:text-gray-300"
                  >
                    Qualifications & Bio
                  </label>
                  <div className="mt-1">
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="resize-none"
                      disabled={isLoading}
                      placeholder="Tell us about your teaching experience, qualifications, and background..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-300">
                    Upload CV/Resume (Optional)
                  </label>
                  <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-border-color dark:border-gray-600 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-text-secondary dark:text-gray-400" />
                      <div className="flex text-sm text-text-secondary dark:text-gray-400">
                        <label
                          htmlFor="cv-upload"
                          className="relative cursor-pointer rounded-md font-medium text-secondary hover:text-secondary/80"
                        >
                          <span>Upload a file</span>
                          <input
                            id="cv-upload"
                            name="cv-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            disabled={isLoading}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-text-secondary dark:text-gray-500">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
              </form>

              <div className="text-center text-sm">
                <Link
                  href="/login/"
                  className="font-medium text-secondary hover:text-secondary/80"
                >
                  Already have an account? Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
