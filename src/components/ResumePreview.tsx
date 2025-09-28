'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ResumeData } from '@/types/resume';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/form/Button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumePreviewProps {
  data?: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { watch } = useForm<ResumeData>({
    defaultValues: data || {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        linkedin: '',
        github: '',
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    },
  });

  const watchedValues = watch();

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={downloadPDF}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <Card className="p-8 bg-white shadow-lg" ref={resumeRef}>
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {watchedValues.personalInfo.firstName} {watchedValues.personalInfo.lastName}
          </h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{watchedValues.personalInfo.email}</span>
            <span>{watchedValues.personalInfo.phone}</span>
            <span>{watchedValues.personalInfo.address}</span>
            {watchedValues.personalInfo.website && (
              <span>{watchedValues.personalInfo.website}</span>
            )}
            {watchedValues.personalInfo.linkedin && (
              <span>{watchedValues.personalInfo.linkedin}</span>
            )}
            {watchedValues.personalInfo.github && (
              <span>{watchedValues.personalInfo.github}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {watchedValues.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: watchedValues.summary }}
            />
          </div>
        )}

        {/* Experience */}
        {watchedValues.experience && watchedValues.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {watchedValues.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-primary-600">{exp.company} • {exp.location}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div 
                    className="mt-2 text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {watchedValues.education && watchedValues.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-4">
              {watchedValues.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-primary-600">{edu.institution} • {edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {watchedValues.skills && watchedValues.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {watchedValues.skills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 rounded px-3 py-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}