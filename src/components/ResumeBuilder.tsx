'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/form/Button';
import { Input } from '@/components/ui/form/Input';
import { Label } from '@/components/ui/form/Label';
import { Card } from '@/components/common/Card';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Plus, Minus, Save } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(1, 'Description is required'),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  gpa: z.string().optional(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
});

const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    website: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
  }),
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
});

interface ResumeBuilderProps {
  initialData?: ResumeData;
  onSave: (title: string, data: ResumeData) => void;
  initialTitle?: string;
}

export default function ResumeBuilder({ initialData, onSave, initialTitle }: ResumeBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue, // Add this to manually update form values
  } = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData || {
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

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const watchedValues = watch();

  const onSubmit = (data: ResumeData) => {
    setIsSubmitting(true);
    onSave(initialTitle || 'My Resume', data);
  };

  const addExperience = () => {
    appendExperience({
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const addEducation = () => {
    appendEducation({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
    });
  };

  const addSkill = () => {
    appendSkill({
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Resume Title</Label>
          <Input
            id="title"
            defaultValue={initialTitle}
            {...register('title')}
            placeholder="e.g. Software Developer Resume"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register('personalInfo.firstName')}
                placeholder="John"
              />
              {errors.personalInfo?.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register('personalInfo.lastName')}
                placeholder="Doe"
              />
              {errors.personalInfo?.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.lastName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('personalInfo.email')}
                placeholder="john@example.com"
              />
              {errors.personalInfo?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('personalInfo.phone')}
                placeholder="(123) 456-7890"
              />
              {errors.personalInfo?.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.phone.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('personalInfo.address')}
                placeholder="123 Main St, City, State"
              />
              {errors.personalInfo?.address && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                {...register('personalInfo.website')}
                placeholder="https://example.com"
              />
              {errors.personalInfo?.website && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.website.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
              <Input
                id="linkedin"
                {...register('personalInfo.linkedin')}
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.personalInfo?.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.linkedin.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="github">GitHub (Optional)</Label>
              <Input
                id="github"
                {...register('personalInfo.github')}
                placeholder="https://github.com/johndoe"
              />
              {errors.personalInfo?.github && (
                <p className="mt-1 text-sm text-red-600">{errors.personalInfo.github.message}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <RichTextEditor
            content={watchedValues.summary}
            onChange={(_value) => {
              // Update the form value when the rich text editor changes
              setValue('summary', _value);
            }}
            placeholder="Write a brief summary of your professional background and key achievements..."
          />
          {errors.summary && (
            <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </div>
          {experienceFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No work experience added yet</p>
          ) : (
            <div className="space-y-4">
              {experienceFields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`experience.${index}.jobTitle`}>Job Title</Label>
                      <Input
                        {...register(`experience.${index}.jobTitle`)}
                        placeholder="Software Developer"
                      />
                      {errors.experience?.[index]?.jobTitle && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience[index]?.jobTitle?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.company`}>Company</Label>
                      <Input
                        {...register(`experience.${index}.company`)}
                        placeholder="Tech Company Inc."
                      />
                      {errors.experience?.[index]?.company && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience[index]?.company?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.location`}>Location</Label>
                      <Input
                        {...register(`experience.${index}.location`)}
                        placeholder="San Francisco, CA"
                      />
                      {errors.experience?.[index]?.location && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience[index]?.location?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.startDate`}>Start Date</Label>
                      <Input
                        type="month"
                        {...register(`experience.${index}.startDate`)}
                      />
                      {errors.experience?.[index]?.startDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience[index]?.startDate?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.endDate`}>End Date</Label>
                      <Input
                        type="month"
                        {...register(`experience.${index}.endDate`)}
                        disabled={watchedValues.experience?.[index]?.current}
                      />
                      {errors.experience?.[index]?.endDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience[index]?.endDate?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`experience.${index}.current`}
                        {...register(`experience.${index}.current`)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`experience.${index}.current`} className="ml-2 block text-sm text-gray-900">
                        Current Position
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor={`experience.${index}.description`}>Description</Label>
                    <RichTextEditor
                      content={watchedValues.experience?.[index]?.description || ''}
                      onChange={(_value) => {
                        // Update the form value when the rich text editor changes
                        setValue(`experience.${index}.description`, _value);
                      }}
                      placeholder="Describe your responsibilities and achievements..."
                    />
                    {errors.experience?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.experience[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </div>
          {educationFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No education added yet</p>
          ) : (
            <div className="space-y-4">
              {educationFields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`education.${index}.institution`}>Institution</Label>
                      <Input
                        {...register(`education.${index}.institution`)}
                        placeholder="University of Technology"
                      />
                      {errors.education?.[index]?.institution && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.institution?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.degree`}>Degree</Label>
                      <Input
                        {...register(`education.${index}.degree`)}
                        placeholder="Bachelor of Science"
                      />
                      {errors.education?.[index]?.degree && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.degree?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.field`}>Field of Study</Label>
                      <Input
                        {...register(`education.${index}.field`)}
                        placeholder="Computer Science"
                      />
                      {errors.education?.[index]?.field && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.field?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.location`}>Location</Label>
                      <Input
                        {...register(`education.${index}.location`)}
                        placeholder="San Francisco, CA"
                      />
                      {errors.education?.[index]?.location && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.location?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.startDate`}>Start Date</Label>
                      <Input
                        type="month"
                        {...register(`education.${index}.startDate`)}
                      />
                      {errors.education?.[index]?.startDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.startDate?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.endDate`}>End Date</Label>
                      <Input
                        type="month"
                        {...register(`education.${index}.endDate`)}
                        disabled={watchedValues.education?.[index]?.current}
                      />
                      {errors.education?.[index]?.endDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.endDate?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.gpa`}>GPA (Optional)</Label>
                      <Input
                        {...register(`education.${index}.gpa`)}
                        placeholder="3.8"
                      />
                      {errors.education?.[index]?.gpa && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.education[index]?.gpa?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`education.${index}.current`}
                        {...register(`education.${index}.current`)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`education.${index}.current`} className="ml-2 block text-sm text-gray-900">
                        Currently Attending
                      </label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <Button type="button" variant="outline" size="sm" onClick={addSkill}>
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </div>
          {skillFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No skills added yet</p>
          ) : (
            <div className="space-y-4">
              {skillFields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Skill #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`skills.${index}.name`}>Skill Name</Label>
                      <Input
                        {...register(`skills.${index}.name`)}
                        placeholder="JavaScript"
                      />
                      {errors.skills?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.skills[index]?.name?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`skills.${index}.level`}>Proficiency Level</Label>
                      <select
                        {...register(`skills.${index}.level`)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      {errors.skills?.[index]?.level && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.skills[index]?.level?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            Save Resume
          </Button>
        </div>
      </form>
    </Card>
  );
}