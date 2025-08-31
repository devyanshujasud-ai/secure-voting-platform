import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, CheckCircle, AlertTriangle, Shield, Eye, ArrowRight } from "lucide-react";
import { useAuth } from "@/App";
import { uploadFile } from "@/lib/supabase";

const FaceVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const webcamRef = useRef<Webcam>(null);
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [verificationResults, setVerificationResults] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please complete registration first.",
        variant: "destructive",
      });
      navigate("/register");
    }
  }, [user, navigate, toast]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setVerificationStatus('idle');
    setVerificationResults(null);
  };

  const verifyFace = async () => {
    if (!capturedImage || !user) return;

    setIsVerifying(true);
    setVerificationStatus('processing');

    try {
      // Convert base64 to blob for upload
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      
      // Upload face photo
      const fileName = `face-photos/${user.id}/${Date.now()}_face.jpg`;
      await uploadFile('faces', fileName, blob as File);

      // Simulate AI face verification (replace with actual service)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock verification results
      const mockResults = {
        faceDetected: true,
        livenessScore: 0.92,
        matchScore: 0.88,
        qualityScore: 0.95,
        fraudDetected: false,
        biometricHash: `face_hash_${Date.now()}`
      };

      setVerificationResults(mockResults);

      if (mockResults.matchScore > 0.8 && mockResults.livenessScore > 0.85 && !mockResults.fraudDetected) {
        setVerificationStatus('success');
        
        toast({
          title: "Face Verification Successful!",
          description: "Biometric verification completed. You can now access the platform.",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setVerificationStatus('failed');
        toast({
          title: "Face Verification Failed",
          description: "Please ensure good lighting and try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Face verification error:", error);
      setVerificationStatus('failed');
      toast({
        title: "Verification Error",
        description: error.message || "Technical error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Eye className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Face Verification</h1>
            <p className="text-xl text-muted-foreground">
              AI-powered biometric verification with liveness detection
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Welcome, {user.user_metadata?.full_name || user.email}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Camera Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Live Camera Feed
                </CardTitle>
                <CardDescription>
                  Position your face in the frame for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {!capturedImage ? (
                    <div className="relative rounded-lg overflow-hidden bg-muted">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full h-80 object-cover"
                        videoConstraints={{
                          width: 640,
                          height: 480,
                          facingMode: "user"
                        }}
                        onUserMediaError={(error) => {
                          console.error("Camera error:", error);
                          toast({
                            title: "Camera Access Error",
                            description: "Please allow camera access to continue.",
                            variant: "destructive",
                          });
                        }}
                      />
                      <div className="absolute inset-0 border-4 border-primary/30 rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-primary rounded-lg">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      {verificationStatus === 'success' && (
                        <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                      )}
                      {verificationStatus === 'failed' && (
                        <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-16 h-16 text-red-600" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {!capturedImage ? (
                    <Button 
                      onClick={capture} 
                      size="lg" 
                      className="w-full"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capture Photo
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        onClick={verifyFace}
                        size="lg" 
                        className="w-full"
                        disabled={isVerifying || verificationStatus === 'success'}
                      >
                        {isVerifying ? (
                          "Verifying Face..."
                        ) : verificationStatus === 'success' ? (
                          "Verification Complete"
                        ) : (
                          <>
                            Verify Face
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={retakePhoto} 
                        variant="outline" 
                        className="w-full"
                        disabled={isVerifying}
                      >
                        Retake Photo
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationStatus === 'processing' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-primary font-medium">
                          AI analyzing facial features...
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          This may take a few seconds
                        </p>
                      </motion.div>
                    )}

                    {verificationResults && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Face Detected</span>
                          <span className={verificationResults.faceDetected ? "text-green-600" : "text-red-600"}>
                            {verificationResults.faceDetected ? "✓" : "✗"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Liveness Score</span>
                          <span className="font-mono">
                            {(verificationResults.livenessScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Match Score</span>
                          <span className="font-mono">
                            {(verificationResults.matchScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Quality Score</span>
                          <span className="font-mono">
                            {(verificationResults.qualityScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>Fraud Detected</span>
                          <span className={!verificationResults.fraudDetected ? "text-green-600" : "text-red-600"}>
                            {!verificationResults.fraudDetected ? "✓ Clear" : "⚠ Detected"}
                          </span>
                        </div>
                      </div>
                    )}

                    {verificationStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-4"
                      >
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <p className="text-green-600 font-medium text-lg">
                          Verification Successful!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Redirecting to dashboard...
                        </p>
                      </motion.div>
                    )}

                    {verificationStatus === 'failed' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-4"
                      >
                        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                        <p className="text-red-600 font-medium text-lg">
                          Verification Failed
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Please try again with better lighting
                        </p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FaceVerification;
