import Link from 'next/link';
import { Button } from '@/components/ui/form/Button';
import { ArrowRight, Code, FileText, User } from 'lucide-react';

export const metadata = {
  title: 'Portfolio Website | Home',
  description: 'Welcome to my personal portfolio website. Explore my projects, read my blog, and learn more about my experience.',
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to My</span>
            <span className="block text-primary-600 mt-2">Portfolio</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore my projects, read my blog, and learn more about my experience as a developer.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/projects">
                <Button size="lg" className="w-full">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full">
                  About Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to know about me
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              This portfolio showcases my skills, projects, and experience in web development.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <User className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">About Me</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Learn about my background, skills, and experience as a developer.
                </p>
                <div className="mt-4 ml-16">
                  <Link href="/about" className="text-base font-medium text-primary-600 hover:text-primary-500">
                    Learn more →
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Code className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Projects</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Explore my latest projects and see what I've been working on.
                </p>
                <div className="mt-4 ml-16">
                  <Link href="/projects" className="text-base font-medium text-primary-600 hover:text-primary-500">
                    View projects →
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Blog</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Read my thoughts on web development, technology, and more.
                </p>
                <div className="mt-4 ml-16">
                  <Link href="/blog" className="text-base font-medium text-primary-600 hover:text-primary-500">
                    Read blog →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Create your resume today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/resume">
                <Button size="lg" variant="secondary">
                  Build Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}