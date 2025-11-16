import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Camera, File, CheckCircle2, XCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const documentTypes = [
  { value: 'passport', label: 'Passport', icon: '🛂' },
  { value: 'national_id', label: 'National ID', icon: '🪪' },
  { value: 'visa', label: 'Visa Document', icon: '✈️' },
  { value: 'address', label: 'Proof of Address', icon: '🏠' },
  { value: 'employment', label: 'Employment Certificate', icon: '💼' },
  { value: 'salary', label: 'Salary Proof', icon: '💰' },
  { value: 'tax', label: 'Tax ID', icon: '📋' },
];

export function DocumentUpload() {
  const [selectedType, setSelectedType] = useState('');
  const [uploadStep, setUploadStep] = useState<'select' | 'upload' | 'validating' | 'success' | 'error'>('select');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationResults, setValidationResults] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setUploadStep('validating');
    
    // Simulate AI validation
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% success rate for demo
      if (isValid) {
        setValidationResults({
          expiryDate: '2030-10-15',
          documentNumber: 'AB1234567',
          name: 'John Doe',
          dateOfBirth: '1990-05-15',
          checks: {
            expiry: true,
            format: true,
            authenticity: true,
            readability: true
          }
        });
        setUploadStep('success');
      } else {
        setValidationResults({
          error: 'Document image is blurry or unclear',
          checks: {
            expiry: true,
            format: true,
            authenticity: true,
            readability: false
          }
        });
        setUploadStep('error');
      }
    }, 2000);
  };

  const handleReset = () => {
    setUploadStep('select');
    setUploadedFile(null);
    setValidationResults(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl mb-2">Upload Document</h1>
        <p className="text-cyan-400/70 text-sm">Add credentials to your digital identity wallet</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Document Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20"
        >
          <label className="text-sm text-gray-400 mb-3 block">Document Type</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-[#0a0e27] border-cyan-500/20 h-14 text-white">
              <SelectValue placeholder="Select document type..." />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1539] border-cyan-500/20 text-white">
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="cursor-pointer text-white hover:bg-[#22d3ee]/10">
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{type.icon}</span>
                    {type.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {selectedType && uploadStep === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Upload Area */}
            <div className="bg-[#0f1539] rounded-2xl p-8 border-2 border-dashed border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-lg mb-2">Upload Your Document</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Drag and drop or click to browse
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-14 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 flex items-center gap-2"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: any) => {
                        if (e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      };
                      input.click();
                    }}
                  >
                    <File className="w-5 h-5 text-cyan-400" />
                    Choose File
                  </Button>

                  <Button
                    variant="outline"
                    className="h-14 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 flex items-center gap-2"
                    onClick={() => {
                      // Simulate camera capture by creating a mock file
                      const blob = new Blob(['mock-image-data'], { type: 'image/jpeg' });
                      const file = new window.File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
                      handleFileSelect(file);
                    }}
                  >
                    <Camera className="w-5 h-5 text-cyan-400" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Tips */}
            <div className="bg-cyan-500/5 rounded-xl p-4 border border-cyan-500/20">
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
                Tips for Best Results
              </h4>
              <ul className="text-xs text-cyan-400/80 space-y-2">
                <li>• Ensure the document is clearly visible and not blurry</li>
                <li>• Capture all four corners of the document</li>
                <li>• Use good lighting and avoid shadows or glare</li>
                <li>• Make sure text is readable and information is not cut off</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Validating */}
        {uploadStep === 'validating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f1539] rounded-2xl p-8 border border-cyan-500/20 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
            <h3 className="text-lg mb-2">Validating Document...</h3>
            <p className="text-sm text-gray-400">
              AI is analyzing your document for authenticity and accuracy
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between bg-[#0a0e27] rounded-lg p-3">
                <span className="text-sm text-gray-400">Checking expiry date</span>
                <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-between bg-[#0a0e27] rounded-lg p-3">
                <span className="text-sm text-gray-400">Verifying format</span>
                <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-between bg-[#0a0e27] rounded-lg p-3">
                <span className="text-sm text-gray-400">Extracting information</span>
                <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {uploadStep === 'success' && validationResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-8 border border-green-500/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg mb-2 text-green-400">Document Validated!</h3>
              <p className="text-sm text-gray-400">
                Your document has been successfully validated and uploaded
              </p>
            </div>

            {/* Extracted Information */}
            <div className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20">
              <h4 className="text-sm mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                Extracted Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-cyan-500/10">
                  <span className="text-sm text-gray-400">Document Number</span>
                  <span className="text-sm">{validationResults.documentNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-cyan-500/10">
                  <span className="text-sm text-gray-400">Name</span>
                  <span className="text-sm">{validationResults.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-cyan-500/10">
                  <span className="text-sm text-gray-400">Date of Birth</span>
                  <span className="text-sm">{validationResults.dateOfBirth}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-400">Expiry Date</span>
                  <span className="text-sm">{validationResults.expiryDate}</span>
                </div>
              </div>
            </div>

            {/* Validation Checks */}
            <div className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20">
              <h4 className="text-sm mb-4">Validation Checks</h4>
              <div className="space-y-2">
                {Object.entries(validationResults.checks).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                    {passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-12 border-cyan-500/30 hover:border-cyan-500/60"
              >
                Upload Another
              </Button>
              <Button
                className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Save to Wallet
              </Button>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {uploadStep === 'error' && validationResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-2xl p-8 border border-red-500/30 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg mb-2 text-red-400">Validation Failed</h3>
              <p className="text-sm text-gray-400">{validationResults.error}</p>
            </div>

            {/* Validation Checks */}
            <div className="bg-[#0f1539] rounded-2xl p-6 border border-cyan-500/20">
              <h4 className="text-sm mb-4">Validation Checks</h4>
              <div className="space-y-2">
                {Object.entries(validationResults.checks).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                    {passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-12 border-cyan-500/30 hover:border-cyan-500/60"
              >
                Try Different Document
              </Button>
              <Button
                onClick={() => {
                  setUploadStep('select');
                  setUploadedFile(null);
                }}
                className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retake Photo
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}