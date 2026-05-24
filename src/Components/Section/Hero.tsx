import React, { useState } from "react";

export default function Hero() {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            console.log("Files dropped:", file.name);
            alert(`File "${file.name}" received! In a real app, analysis would begin now.`);
        }
    };

    return (
        <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(46,68,255,0.08)_0%,transparent_100%)]"></div>
            <div className="max-w-[1280px] mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-container/10 text-primary font-label-sm mb-6 uppercase tracking-wider">AI-Powered Recruitment Tech</span>
                    <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
                        Land Your Dream Job with <span className="text-primary">AI-Powered</span> Resume Analysis
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                        Beat the Applicant Tracking Systems (ATS) and get more interviews. Our advanced neural networks analyze your resume against millions of successful job applications.
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center -space-x-3">
                            <img className="w-10 h-10 rounded-full border-2 border-surface" data-alt="Close-up portrait of a professional woman in a modern office setting, smiling confidently. The lighting is soft and natural, reflecting a bright and professional atmosphere aligned with a corporate-modern tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6NkpBaYvQkVUVKBCl4M8_ZifbD50YF4H89yufK4kBfhsj1LxzVzsdYcoJOL0RMToXhEewtDo3LjR81vIVQeIqgMB2A6PytTpb6Kp50LQcRT5kPXRN9G3zFoHPd7-btfwIMBJyAssoy9NdvaMciX2JYRKrfWPJz8VoYm5nyZy2v9FuAPndEK0GcKVbcjgDEd6p0_JQQkEilZoD7V45tmmMByCdtZp6MGfEvcZGA2rQPdP7bEmZfG7CAqmAkcH7DA6TMYOFd3rpyQ">
                                <img className="w-10 h-10 rounded-full border-2 border-surface" data-alt="Portrait of a young male professional in a smart-casual blazer, looking directly at the camera with a friendly and capable expression. High-key lighting emphasizes a clean, expert-guidance theme within a high-stakes tech environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUmxqVOSFy-7eswQhmCoCz1ppQaGVu9jVQ197xqpKJjtJDjFTr3gF___JAcujndESWIjFjWsbTMscTWsecLczC-WVe4A2MFrzKH7CXdnAxAijsrlUD22tQiPsppTwGUFMFyG6xF67FsPvzie6SFcswirL24fdomyXv4Eyp84xGiSmBgIyFAyzMU3EOMKtypYBNyXf_Nz1HPxTTH-vRh4OYlalSO5jZVktEEoPHlaYYbVrgfrQzOv_WjiIliVVswCHSvUAaKr-f1A">
                                    <img className="w-10 h-10 rounded-full border-2 border-surface" data-alt="Side profile of a diverse female professional engaged in work, set against a blurred background of a sleek, minimalist tech office. The color palette features cool blues and indigos, maintaining a sophisticated, modern corporate look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmYLChsWm6C8pn789GOSyzWIUYxAMr49OKiXlFTbGCvF9prbyITtB49pm61BpAP-bshIisD7i3CaG_LIrHH4sX_TwlJ9fQmSAv58lIl-zaDcc8kYQ6xgu4dhKoepqplZj-7plJdbUKt36OelrgMZrLdn1gyFi--WF8IT1TnBHuAO-k7DNXgXYqBKF62lCJJSKN12Qn_tKmUQLi23vjwJEZW0RQdM2mz4-Vf-dWVR01DcD4lQfwvO9OASEfJ780kTsEPlGL6_vcFQ">
                                        <span className="text-on-surface-variant font-label-md">Trusted by 10k+ professionals</span>
                                    </img>
                                </img>
                            </img>
                        </div>
                        <div className="relative">
                            <div 
                                className={`upload-zone relative p-10 md:p-16 bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:border-primary group ${
                                    isDragActive ? "bg-primary/5 scale-[1.02] border-primary" : ""
                                }`} 
                                id="drop-zone"
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary">
                                    <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-colors" data-icon="upload_file">upload_file</span>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-2">Drop your Resume here</h3>
                                <p className="font-body-md text-on-surface-variant mb-8 text-center">PDF, DOCX, or RTF supported (Max 5MB)</p>
                                <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:bg-primary-container transition-all shadow-md">Analyse Now</button>
                                {/* Decorative Floating Elements */}
                                <div className="absolute -top-6 -right-6 glass-card p-4 rounded-lg shadow-lg animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="font-label-md text-on-surface">ATS Score: 92%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};