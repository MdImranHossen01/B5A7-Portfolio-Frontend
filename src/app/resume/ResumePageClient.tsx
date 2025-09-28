'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { resumeApi } from '@/lib/api';
import { Resume } from '@/types/resume';
import { Button } from '@/components/ui/form/Button';
import { Card } from '@/components/common/Card';
import { FileText, Plus, Download, Edit, Trash2 } from 'lucide-react';
import ResumeBuilder from '@/components/ResumeBuilder';
import ResumePreview from '@/components/ResumePreview';

export default function ResumePageClient() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        const response = await resumeApi.getUserResumes();
        setResumes(response.data.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
      fetchResumes();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const handleCreateResume = () => {
    setIsBuilding(true);
    setSelectedResume(null);
  };

  const handleEditResume = (resume: Resume) => {
    setIsBuilding(true);
    setSelectedResume(resume);
  };

  const handleDeleteResume = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeApi.deleteResume(id);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  const handleSaveResume = async (title: string, data: ResumeData) => {
    try {
      if (selectedResume) {
        // Update existing resume
        const response = await resumeApi.updateResume(selectedResume.id, title, data);
        setResumes(resumes.map(resume => 
          resume.id === selectedResume.id ? response.data.data : resume
        ));
      } else {
        // Create new resume
        const response = await resumeApi.createResume(title, data);
        setResumes([...resumes, response.data.data]);
      }
      setIsBuilding(false);
      setSelectedResume(null);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleCancel = () => {
    setIsBuilding(false);
    setSelectedResume(null);
  };

  // Rest of the component remains the same...
}

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isBuilding) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {selectedResume ? 'Edit Resume' : 'Create New Resume'}
          </h1>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResumeBuilder
            initialData={selectedResume?.data}
            onSave={handleSaveResume}
            initialTitle={selectedResume?.title || 'My Resume'}
          />
          <ResumePreview />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Resume Builder
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Create professional resumes in minutes
          </p>
        </div>
        {isAuthenticated && (
          <Button onClick={handleCreateResume}>
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        )}
      </div>

      {!isAuthenticated ? (
        <Card className="p-8 text-center">
          <FileText className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Resume</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Sign in to access our resume builder and create professional resumes that stand out.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Sign In
            </a>
            <a href="/register" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Create Account
            </a>
          </div>
        </Card>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Resumes Yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first resume to get started.
          </p>
          <Button onClick={handleCreateResume}>
            <Plus className="h-4 w-4 mr-2" />
            Create Resume
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {resume.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditResume(resume)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteResume(resume.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}