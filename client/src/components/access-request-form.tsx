import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

interface AccessRequestFormProps {
  onBack: () => void;
}

export function AccessRequestForm({ onBack }: AccessRequestFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/access-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Failed to submit access request. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif text-gray-800">
              Request Submitted
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Thank you for your interest
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              Your access request has been submitted successfully. We'll review your request 
              and contact you soon with access information if approved.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-800 text-sm">
                <strong>What happens next?</strong><br />
                Our team will review your request and may contact you directly 
                with access information or additional questions.
              </p>
            </div>
          </div>

          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl border border-gray-200">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#192a4b' }}>
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-serif text-gray-800">
            Request Access
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Submit your details for website access
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-gray-600 text-sm leading-relaxed">
            Interested in viewing our exclusive collection? Submit your details below 
            and we'll review your request for website access.
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-gray-700 text-xs">
              <strong>Privacy:</strong> We only collect your email address and any additional 
              information you choose to provide. Your information will only be used to 
              process your access request.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name (Optional)
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium text-gray-700">
              Reason for Access (Optional)
            </label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in accessing the site..."
              rows={3}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700 resize-none"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full border border-gray-700 bg-gray-700 text-white px-4 py-2 text-sm font-medium rounded-md hover:!bg-transparent hover:!text-gray-700 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
            
            <Button 
              type="button"
              onClick={onBack}
              variant="outline"
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
