import MetaTags from '@/components/common/MetaTags';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  // This would typically come from an API or database
  const aboutData = {
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "I'm a passionate full stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: [
      {
        id: "1",
        position: "Senior Frontend Developer",
        company: "Tech Company Inc.",
        period: "Jan 2020 - Present",
        description: "Leading frontend development for enterprise applications using React and Next.js."
      },
      {
        id: "2",
        position: "Full Stack Developer",
        company: "Digital Solutions LLC",
        period: "Jun 2017 - Dec 2019",
        description: "Developed full stack applications using Node.js, Express, and MongoDB."
      }
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        period: "2013 - 2017"
      }
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "GraphQL",
      "Docker",
      "AWS"
    ]
  };

  return (
    <>
      <MetaTags
        title="About Me | Portfolio"
        description="Learn more about John Doe, a full stack developer with expertise in modern web technologies."
        keywords="about, developer, portfolio, full stack, web development"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Me
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Get to know me better
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and contact information
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {aboutData.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {aboutData.title}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {aboutData.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {aboutData.phone}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {aboutData.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bio</h2>
          <Card className="p-6">
            <p className="text-gray-700">{aboutData.bio}</p>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-4">
            {aboutData.experience.map((exp) => (
              <Card key={exp.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-primary-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {aboutData.education.map((edu) => (
              <Card key={edu.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-primary-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}