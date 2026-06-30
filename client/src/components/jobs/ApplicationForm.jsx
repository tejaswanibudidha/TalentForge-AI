import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ApplicationForm({ job, company, onClose, onSuccess }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedSteps, setExpandedSteps] = useState({ 1: true });

  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: ''
    },
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        graduationYear: ''
      }
    ],
    skills: user?.skills || [],
    additionalInfo: ''
  });

  const [skillInput, setSkillInput] = useState('');

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', field: '', graduationYear: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...new Set([...prev.skills, skillInput.trim()])]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleStepExpand = (step) => {
    setExpandedSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/applications', {
        jobId: job._id,
        candidateId: user.id,
        ...formData
      });

      onSuccess?.(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Personal Details',
      fields: ['fullName', 'email', 'phone', 'location']
    },
    {
      number: 2,
      title: 'Education',
      fields: ['education']
    },
    {
      number: 3,
      title: 'Skills',
      fields: ['skills']
    },
    {
      number: 4,
      title: 'Additional Info',
      fields: ['additionalInfo']
    }
  ];

  const isStepValid = (step) => {
    if (step === 1) {
      return formData.personalDetails.fullName && formData.personalDetails.email && formData.personalDetails.phone;
    }
    if (step === 2) {
      return formData.education.some(e => e.institution && e.degree);
    }
    if (step === 3) {
      return formData.skills.length > 0;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 border-b">
          <h2 className="text-2xl font-bold">Apply to {job?.title}</h2>
          <p className="text-blue-100 mt-1">{company?.name}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleStepExpand(step.number)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      isStepValid(step.number) ? 'bg-green-500' : 'bg-blue-600'
                    }`}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  </div>
                  {expandedSteps[step.number] ? <ChevronUp /> : <ChevronDown />}
                </button>

                {expandedSteps[step.number] && (
                  <div className="p-6 border-t border-gray-200 space-y-4">
                    {/* Personal Details */}
                    {step.number === 1 && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.personalDetails.fullName}
                          onChange={handlePersonalDetailsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.personalDetails.email}
                          onChange={handlePersonalDetailsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone"
                          value={formData.personalDetails.phone}
                          onChange={handlePersonalDetailsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="text"
                          name="location"
                          placeholder="Location"
                          value={formData.personalDetails.location}
                          onChange={handlePersonalDetailsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {/* Education */}
                    {step.number === 2 && (
                      <div className="space-y-4">
                        {formData.education.map((edu, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3">
                            <input
                              type="text"
                              placeholder="Institution Name"
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <input
                                type="text"
                                placeholder="Field of Study"
                                value={edu.field}
                                onChange={(e) => handleEducationChange(idx, 'field', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <input
                              type="number"
                              placeholder="Graduation Year"
                              value={edu.graduationYear}
                              onChange={(e) => handleEducationChange(idx, 'graduationYear', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formData.education.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeEducation(idx)}
                                className="text-red-600 hover:text-red-700 font-medium"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addEducation}
                          className="w-full py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          + Add Education
                        </button>
                      </div>
                    )}

                    {/* Skills */}
                    {step.number === 3 && (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add skill (e.g., React, Python)"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <div
                              key={skill}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="text-blue-700 hover:text-blue-900 font-bold"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    {step.number === 4 && (
                      <textarea
                        placeholder="Tell us why you're a great fit for this role..."
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-slate-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity font-medium"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
