'use client';

import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Upload,
  CheckCircle,
  Users,
  BookOpen,
  TrendingUp,
  Star,
  ArrowRight,
  Menu,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from './footer';
import Link from 'next/link';
import Header from './header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <Card className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full border-0 shadow-none mb-6">
            <CardContent className="p-0 flex items-center gap-2">
              <Star className="h-4 w-4 fill-emerald-600 dark:fill-emerald-400" />
              <span className="text-sm font-medium">
                Trusted by 10,000+ educators worldwide
              </span>
            </CardContent>
          </Card>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Assignment
            <span className="text-emerald-600 dark:text-emerald-400">
              {' '}
              Grading
            </span>{' '}
            Into Minutes, Not Hours
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform that connects schools, tutors, and students.
            Upload, grade, and track assignments with lightning speed and
            precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-6 sm:px-8 py-6 h-auto">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="text-lg px-6 sm:px-8 py-6 h-auto border-2"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Active Tutors
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              50K+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Students
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              1M+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Assignments Graded
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Time Saved
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need, All In One Place
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to make assignment management effortless
            for schools, tutors, and students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Upload className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Instant Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Upload assignments in any format—PDF, Word, images, or videos.
                Bulk upload support for multiple submissions at once.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Smart Grading
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Streamlined grading interface with rubrics, annotations, and
                feedback tools. Grade faster with keyboard shortcuts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Real-Time Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Track student progress, identify trends, and generate detailed
                reports. Get insights that drive better outcomes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Invite tutors, assign roles, and collaborate seamlessly. Perfect
                for schools with multiple teachers and departments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Student Portal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Students can submit work, view grades, and receive feedback—all
                in one clean, intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Tutor Onboarding
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Registered tutors can be added instantly. Manage permissions,
                classes, and student groups with ease.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-emerald-50 dark:bg-gray-800/50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From setup to your first graded assignment in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Create Your Organization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Sign up and set up your school or organization profile. Invite
                tutors who are already registered on the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Add Students & Assign Work
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Import your student list, create classes, and start assigning
                work. Students receive instant notifications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Grade & Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Review submissions, provide feedback, and watch your students
                excel. All progress tracked automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <Card className="bg-linear-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white border-0">
          <CardContent className="p-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-emerald-50 max-w-2xl mx-auto">
              Join thousands of educators who are saving time and improving
              student outcomes with LearnSync.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-6 sm:px-8 py-6 h-auto">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-white border-2 border-white hover:bg-white/10 text-lg px-6 sm:px-8 py-6 h-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      {/* <footer className="border-t bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-6 sm:gap-8 mb-8">
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
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
      </footer> */}
      <Footer />
    </div>
  );
}
