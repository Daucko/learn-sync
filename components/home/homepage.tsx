// import React from 'react';
// import HeroSection from '@/components/home/hero-section';
// import FeaturesSection from '@/components/home/features-section';
// import Header from './header';
// import Footer from './footer';

// const Homepage = () => {
//   return (
//     <>
//       <Header />
//       <HeroSection />
//       <FeaturesSection />
//       <Footer />
//     </>
//   );
// };

// export default Homepage;

'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  GraduationCap,
  Upload,
  CheckCircle,
  Users,
  BookOpen,
  TrendingUp,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              LearnSync
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-gray-600 dark:text-gray-300"
            >
              Sign In
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-emerald-600 dark:fill-emerald-400" />
            <span>Trusted by 10,000+ educators worldwide</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Assignment
            <span className="text-emerald-600 dark:text-emerald-400">
              {' '}
              Grading
            </span>{' '}
            Into Minutes, Not Hours
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform that connects schools, tutors, and students.
            Upload, grade, and track assignments with lightning speed and
            precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 h-auto">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-2"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Active Tutors
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              50K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              1M+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Assignments Graded
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Time Saved</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need, All In One Place
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to make assignment management effortless
            for schools, tutors, and students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Upload className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Instant Upload
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Upload assignments in any format—PDF, Word, images, or videos.
              Bulk upload support for multiple submissions at once.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Smart Grading
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Streamlined grading interface with rubrics, annotations, and
              feedback tools. Grade faster with keyboard shortcuts.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Real-Time Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Track student progress, identify trends, and generate detailed
              reports. Get insights that drive better outcomes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Invite tutors, assign roles, and collaborate seamlessly. Perfect
              for schools with multiple teachers and departments.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Student Portal
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Students can submit work, view grades, and receive feedback—all in
              one clean, intuitive interface.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Tutor Onboarding
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Registered tutors can be added instantly. Manage permissions,
              classes, and student groups with ease.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-emerald-50 dark:bg-gray-800/50 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From setup to your first graded assignment in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Create Your Organization
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up and set up your school or organization profile. Invite
                tutors who are already registered on the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Add Students & Assign Work
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Import your student list, create classes, and start assigning
                work. Students receive instant notifications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Grade & Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review submissions, provide feedback, and watch your students
                excel. All progress tracked automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-linear-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-xl mb-8 text-emerald-50 max-w-2xl mx-auto">
            Join thousands of educators who are saving time and improving
            student outcomes with LearnSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xl font-bold dark:text-white">
                  LearnSync
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Empowering education through seamless assignment management.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 dark:text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 dark:text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 dark:text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 LearnSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
