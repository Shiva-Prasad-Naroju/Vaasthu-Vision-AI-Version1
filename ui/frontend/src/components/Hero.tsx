import React, { useState } from "react";
import {
  Bot,
  ArrowRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

const Hero = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollToQuery = () => {
    const querySection = document.getElementById("query-section");
    querySection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById("roadmap-section");
    roadmapSection?.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [inputMode, setInputMode] = useState<"text" | "file" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setInputMode("file");
      // Clear text when file is selected
      setText("");
      console.log("Selected file:", file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);

    // If user starts typing, switch to text mode and clear file
    if (newText.trim() !== "") {
      setInputMode("text");
      setSelectedFile(null);
      // Clear the file input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } else if (newText.trim() === "" && !selectedFile) {
      setInputMode(null);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Clear all form data
  const clearForm = () => {
    setText("");
    setSelectedFile(null);
    setInputMode(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    if (text.trim() !== "") {
      formData.append("text", text);
    }

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);

      // Clear form after successful submission
      clearForm();

      toast(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-green-600">
            Contribution Successfull! Thank you 🙌
          </span>
        </div>,
        {
          duration: 3000,
          style: {
            background: "rgba(240, 253, 244, 0.9)", // light green glass
            border: "1px solid #22c55e",
            backdropFilter: "blur(10px)",
          },
        },
      );
    } catch (error: any) {
      toast(
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-red-600">
            Something went wrong. Please try again.
          </span>
        </div>,
        {
          duration: 4000,
          style: {
            background: "rgba(254, 226, 226, 0.9)", // light red glass
            border: "1px solid #ef4444",
            backdropFilter: "blur(10px)",
          },
        },
      );

      setResponse({ error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .contribute-dialog {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }

        .contribute-header {
          color: #334155;
        }

        .input-section {
          position: relative;
          background: #ffffff;
          border: 1px solid #000000;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .input-section.active {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .input-section.disabled {
          opacity: 0.6;
          pointer-events: none;
          background: #f1f5f9;
        }

        .mode-indicator {
          position: absolute;
          top: -6px;
          right: 12px;
          background: #3b82f6;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 500;
          transform: translateY(-50%);
        }

        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
          background: #3b82f6;
          border: none;
        }

        .submit-btn:hover {
          background: #2563eb;
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        .submit-btn.submitting {
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .file-upload-btn {
          background: #10b981;
          border: 1px solid #10b981;
          color: white;
          transition: all 0.2s ease;
          border-radius: 6px;
        }

        .file-upload-btn:hover {
          background: #059669;
          border-color: #059669;
        }

        .separator-text {
          position: relative;
          text-align: center;
          margin: 16px 0;
          color: #64748b;
          font-weight: 400;
          font-size: 13px;
        }

        .separator-text::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .separator-text span {
          background: #f8fafc;
          padding: 0 12px;
        }
      `}</style>

      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <Toaster />
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/3 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/5 rounded-full blur-lg animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400/3 rounded-full blur-2xl animate-float-reverse"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-400/4 rounded-full blur-xl animate-float"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid-pattern"></div>
          </div>

          {/* Pulsing light effects */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full animate-pulse-glow"></div>
        </div>

        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <div className="animate-float mb-12">
            <div className="relative">
              <Bot className="w-20 h-20 mx-auto text-white/80 mb-8 animate-glow" />
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-white/10 rounded-full blur-xl animate-ping opacity-20"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight animate-title-reveal">
            {/*<span className="inline-block animate-letter-float">V</span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.1s" }}
            >
              a
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.2s" }}
            >
              a
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.3s" }}
            >
              s
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.4s" }}
            >
              t
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.5s" }}
            >
              h
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.6s" }}
            >
              u
            </span>
            <span className="inline-block mr-4"></span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.7s" }}
            >
              V
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.8s" }}
            >
              i
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "0.9s" }}
            >
              s
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "1.0s" }}
            >
              i
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "1.1s" }}
            >
              o
            </span>
            <span
              className="inline-block animate-letter-float"
              style={{ animationDelay: "1.2s" }}
            >
              n
            </span>*/}
            <span
              className="inline-block animate-letter-float mr-2"
              style={{ animationDelay: "1.3s" }}
            >
              Vaasthu Vision
            </span>
            <span
              className="inline-block animate-letter-float text-gradient"
              style={{ animationDelay: "1.3s" }}
            >
              A
            </span>
            <span
              className="inline-block animate-letter-float text-gradient"
              style={{ animationDelay: "1.4s" }}
            >
              I
            </span>
          </h1>

          <p
            className="text-2xl md:text-3xl text-white mb-6 max-w-4xl mx-auto font-medium tracking-tight animate-fade-in-up"
            style={{ animationDelay: "1.5s" }}
          >
            What Takes Days, Now Done in Seconds.
          </p>

          <p
            className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed sf-pro-text animate-fade-in-up"
            style={{ animationDelay: "1.7s" }}
          >
            Revolutionary AI system that transforms complex architectural
            decisions into instant, intelligent solutions.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "1.9s" }}
          >
            <button
              onClick={scrollToQuery}
              className="apple-button group px-10 py-4 bg-white/90 text-black rounded-2xl font-semibold text-lg hover:bg-white transition-all duration-300 glow-effect flex items-center gap-3 animate-button-glow"
            >
              <Sparkles className="w-5 h-5 animate-sparkle" />
              Try VaasthuGPT
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToRoadmap}
              className="apple-button px-10 py-4 glass-effect text-white rounded-2xl font-medium text-lg hover:bg-white/10 transition-all duration-300"
            >
              See What's Coming
            </button>
          </div>

          <div
            className="m-6 animate-fade-in-up"
            style={{ animationDelay: "1.9s" }}
          >
            <Dialog>
              <div>
                <DialogTrigger asChild>
                  <button className="contribute-button group relative overflow-hidden px-10 py-4 text-white rounded-2xl font-semibold text-lg transition-all duration-300">
                    <span className="relative z-10">Contribute</span>
                    <span className="shine absolute inset-0 z-0"></span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm contribute-dialog border-0">
                  <DialogHeader className="text-center pb-6">
                    <DialogTitle className="text-2xl font-bold contribute-header mb-2">
                      ✨ Contribute to Vaasthu Vision AI
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                      Share your Vaasthu wisdom and help our AI learn. Your
                      knowledge makes a difference!
                    </DialogDescription>
                  </DialogHeader>

                  {/* Text Input Section */}
                  <div
                    className={`input-section ${inputMode === "text" ? "active" : inputMode === "file" ? "disabled" : ""}`}
                  >
                    {inputMode === "text" && (
                      <div className="mode-indicator">Text Mode</div>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <FileText className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <Label
                          htmlFor="text-input"
                          className="text-sm font-medium text-black mb-2 block"
                        >
                          Share a Vaasthu Rule
                        </Label>
                        <Textarea
                          id="text-input"
                          placeholder="Main entrance should face east, this helps bring sunlight and positive vibrations into the home."
                          className="bg-transparent border-gray-600 !text-black placeholder-gray-400 min-h-[100px] resize-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 [&>textarea]:!text-black"
                          onChange={handleChange}
                          value={text}
                          disabled={inputMode === "file"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="separator-text">
                    <span>OR</span>
                  </div>

                  {/* File Upload Section */}
                  <div
                    className={`input-section ${inputMode === "file" ? "active" : inputMode === "text" ? "disabled" : ""}`}
                  >
                    {inputMode === "file" && (
                      <div className="mode-indicator">File Mode</div>
                    )}
                    <div className="flex items-start gap-3">
                      <Upload className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-black mb-2 block">
                          Upload a Document
                        </Label>
                        <input
                          type="file"
                          ref={inputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          disabled={inputMode === "text"}
                        />
                        <Button
                          size="sm"
                          onClick={handleButtonClick}
                          className="file-upload-btn mb-3"
                          disabled={inputMode === "text"}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        {selectedFile && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <p className="text-sm text-green-400 font-medium">
                              📎 {selectedFile.name}
                            </p>
                            <p className="text-xs text-green-300/70">
                              File ready for upload
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <DialogFooter className="pt-6 gap-3">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleSubmit}
                      disabled={(!text.trim() && !selectedFile) || isSubmitting}
                      className={`submit-btn text-white border-0 ${isSubmitting ? "submitting" : ""}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Submit Contribution
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </div>
            </Dialog>
          </div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;
