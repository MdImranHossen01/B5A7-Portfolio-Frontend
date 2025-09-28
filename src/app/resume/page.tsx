import { generateMetadata } from '@/components/common/MetaTags';
import ResumePageClient from './ResumePageClient';

export const metadata = generateMetadata({
  title: 'Resume Builder | Portfolio',
  description: 'Create and manage your professional resumes with our easy-to-use resume builder.',
  keywords: 'resume, builder, CV, career, job',
});

export default function ResumePage() {
  return <ResumePageClient />;
}