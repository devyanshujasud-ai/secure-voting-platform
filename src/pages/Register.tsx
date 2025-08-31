import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, UserCheck, Shield, ArrowRight } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { AuthService } from "@/lib/auth";
import { uploadFile } from "@/lib/supabase";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    fullName: "",
    voterId: "",
  });
  
  const [voterIdFile, setVoterIdFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: (acceptedFiles) => {
      setVoterIdFile(acceptedFiles[0]);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.voterId) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return false;
    }

    if (!voterIdFile) {
      toast({
        title: "Missing Document",
        description: "Please upload your voter ID card.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Step 1: Create user account
      const authData = await AuthService.signUp({
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        full_name: formData.fullName || undefined,
      });

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      toast({
        title: "Account Created Successfully!",
        description: "Please check your email to verify your account.",
      });

      // Step 2: Upload voter ID document
      if (voterIdFile) {
        try {
          const fileName = `voter-ids/${authData.user.id}/${Date.now()}_${voterIdFile.name}`;
          await uploadFile('documents', fileName, voterIdFile);
          
          toast({
            title: "Document Uploaded",
            description: "Your voter ID has been uploaded for verification.",
          });
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            title: "Upload Warning",
            description: "Account created but document upload failed. You can retry later.",
            variant: "destructive",
          });
        }
      }

      // Navigate to face verification
      setTimeout(() => {
        navigate("/face-verification");
      }, 2000);

    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Voter Registration</h1>
            <p className="text-xl text-muted-foreground">
              Secure your digital voting identity with AI verification
            </p>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Registration Details
              </CardTitle>
              <CardDescription>
                Create your account and verify your voter ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="voterId">Voter ID Number *</Label>
                    <Input
                      id="voterId"
                      name="voterId"
                      type="text"
                      value={formData.voterId}
                      onChange={handleInputChange}
                      placeholder="ABC1234567"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Voter ID Upload */}
                <div>
                  <Label className="text-base font-medium">Upload Voter ID Card *</Label>
                  <div
                    {...getRootProps()}
                    className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    {voterIdFile ? (
                      <div>
                        <p className="text-green-600 font-medium">{voterIdFile.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(voterIdFile.size / 1024 / 1024).toFixed(2)} MB - Ready for upload
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-base font-medium mb-2">
                          {isDragActive ? "Drop your voter ID here" : "Drag & drop your voter ID"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports JPG, PNG, PDF files (max 50MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Security & Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is encrypted and processed securely. Only you can access your verification information.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account & Upload ID
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
