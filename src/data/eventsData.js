export const upcomingEvents = [
    {
        id: 2,
        date: '16 Dec 2025',
        type: 'Hackathon',
        title: 'TechSprint Hackathon 2025 | GDG on Campus SJCEM',
        description: 'Welcome to TechSprint 2025! Hosted by GDG on Campus – St. John College of Engineering & Management, this hackathon is an exciting journey of innovation, problem-solving, and collaboration.',
        driveLink: 'https://drive.google.com/drive/folders/1h5C_-WAmtc67PDEfjlWfDdK-j-pRTKqU?usp=drive_link',
        gallery: [
            '/images/techsprint-day1/uploaded_image_0_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_1_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_2_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_3_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_4_1765824705394.png'
        ],
        longDescription: `
            <h3>🚀 TechSprint 2025 – Innovation & Hackathon</h3>
            <p><strong>Hosted by GDG on Campus – SJCEM</strong> | <strong>Powered by Hack2Skill</strong></p>

            <p>TechSprint 2025 is a month-long innovation journey identifying real problems and building meaningful solutions using Google technologies (Cloud, Firebase, AI/ML).</p>
            
            <p><strong>Highlights:</strong></p>
            <ul>
                <li><strong>Recruitment:</strong> Top performers get a chance to join the GDG Core Team! 🌟</li>
                <li><strong>Prizes:</strong> Exciting rewards for winners! 🎁</li>
                <li><strong>Mentorship:</strong> Expert guidance throughout development.</li>
            </ul>

            <div style="background: #e8f0fe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #1a73e8;">
                <h4 style="margin-top: 0; color: #1a73e8;">🎓 Who Can Participate?</h4>
                <p><strong>Open to ALL Students (BE, Diploma, ITI, BSc/MSc):</strong> No prior coding experience required!</p>
            </div>
          
        `,
        image: 'https://i.ibb.co/bjc6f31T/Generated-Image-December-04-2025-8-46-PM.jpg',
        showTimer: true,
        registrations: 100,
        teamSize: '2-4 Members',
        lastDate: 'Submission: 01 Jan 2026',
        location: 'SJCEM Campus (Hybrid)',
        registrationStatus: {
            message: 'Only 50 teams and 160 total seats are available for TechSprint 2025. Participation is 100% free — no fees at any stage.',
            type: 'urgent'
        },
        timeline: [
            { date: '16 December', title: 'Kick-Off Session', description: 'Problem statement briefing & guidelines.' },
            { date: '16–22 December', title: 'Team Formation & Ideation', description: 'Registration Deadline: 22 December. Form your team and brainstorm ideas.' },
            { date: '20 December', title: 'Ask Me Anything (Online)', description: 'Doubt clearing session for participants.' },
            { date: '23–31 December', title: 'Project Development Phase', description: 'Start building your project.' },
            { date: '24 December', title: 'Onsite Guidance Session', description: 'Offline session at SJCEM Campus.' },
            { date: '01 January', title: 'Project Submission Deadline', description: 'Submit on Hack2Skill platform.' },
            { date: '02–04 January', title: 'Internal Evaluation', description: 'Shortlisting of Top 10 Teams.' },
            { date: '05 January', title: 'Top 10 Announcement', description: 'Shortlisted teams displayed on website.' },
            { date: '06–12 January', title: 'Pitching & Mentoring Phase', description: 'Mentoring for Top 10 Teams (Online/On-campus).' },
            { date: '13 January', title: 'Grand Finale', description: 'Top 10 Demos, Judging & Prize Distribution.' }
        ],
        agenda: [
            {
                id: 'day1',
                label: 'Day 1: Kick-off (16 Dec)',
                items: [
                    {
                        time: '11:15 AM – 11:45 AM',
                        title: 'Opening & Kickoff',
                        description: 'Welcome message, Hackathon goals & expectations, Full-day roadmap overview.',
                        speakers: [
                            {
                                name: 'Dhiraj Chaudhari',
                                role: 'GDGoC Organizer',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
                                linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/'
                            },
                            {
                                name: 'Aayush Bari',
                                role: 'Co-Organizer',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/aayush_bari.jpg',
                                linkedin: '#'
                            }
                        ]
                    },
                    {
                        time: '11:45 AM – 12:00 PM',
                        title: 'Starting the Tech Journey',
                        description: 'Most common beginner problems, Resource platform walkthrough (prathamesh01110.vercel.app), Introduction to Google’s AI ecosystem.',
                        speakers: [
                            {
                                name: 'Prathamesh Jakkula',
                                role: 'AIML/DSA Lead',
                                image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
                                linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/'
                            }
                        ]
                    },
                    {
                        time: '12:00 PM – 01:15 PM',
                        title: 'Hands-On Workshop – Part 1',
                        description: 'Basics of Google Colab & GCP, Deploying ML/AI projects, Basics of Google AI Studio & Firebase, ADK + Gemini API + Firebase Mini-Project.',
                        speakers: [
                            {
                                name: 'Prathamesh Jakkula',
                                role: 'AIML/DSA Lead',
                                image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
                                linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/'
                            },
                            {
                                name: 'Sumedh Patil',
                                role: 'Technical Head',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
                                linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/'
                            }
                        ]
                    },
                    {
                        time: '01:15 PM – 02:15 PM',
                        title: 'Lunch Break 🍱',
                        description: 'Networking lunch.'
                    },
                    {
                        time: '02:15 PM – 03:30 PM',
                        title: 'Hands-On Workshop – Part 2',
                        description: 'Idea brainstorming session, Anti-Gravity IDE practical demo + project direction, Team formation & grouping.',
                        speakers: [
                            {
                                name: 'Sumedh Patil',
                                role: 'Technical Head',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
                                linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/'
                            },
                            {
                                name: 'Dhiraj Chaudhari',
                                role: 'GDGoC Organizer',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
                                linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/'
                            }
                        ]
                    },
                    {
                        time: '03:30 PM – 04:00 PM',
                        title: 'Closing, Team Formation & Q&A',
                        description: 'Final team confirmations, Hackathon guidelines, Open floor Q&A.',
                        speakers: [
                            {
                                name: 'Dhiraj Chaudhari',
                                role: 'GDGoC Organizer',
                                image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
                                linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'day2',
                label: 'Day 2: Grand Finale (13 Jan)',
                items: [
                    {
                        time: '09:00 AM – 10:00 AM',
                        title: 'Check-in & Setup',
                        description: 'Finalists arrive and set up their demo stations.'
                    },
                    {
                        time: '10:00 AM – 12:00 PM',
                        title: 'Final Pitches - Round 1',
                        description: 'Top 10 teams present their projects to the judges.',
                        speakers: []
                    },
                    {
                        time: '12:00 PM – 01:00 PM',
                        title: 'Lunch Break & Networking',
                        description: 'Networking with judges and industry experts.'
                    },
                    {
                        time: '01:00 PM – 02:30 PM',
                        title: 'Final Pitches - Round 2',
                        description: 'Remaining teams present.'
                    },
                    {
                        time: '03:00 PM – 04:00 PM',
                        title: 'Award Ceremony',
                        description: 'Announcement of winners and prize distribution.',
                        speakers: [
                            {
                                name: 'Dr. Sunny Sall',
                                role: 'Faculty Advisor',
                                image: 'https://wsrv.nl/?url=https%3A%2F%2Fi.ibb.co%2FRTNCNWTD%2Ffile-2.jpg&w=400&h=400&fit=cover&a=center&q=80&output=webp',
                                linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in'
                            }
                        ]
                    }
                ]
            }
        ],
        gallery: null,
        buttons: [
            {
                text: 'Register Your Team for Hackathon',
                link: 'https://vision.hack2skill.com/event/GDGoC-25-sjcem-hackathon?utm_source=hack2skill&utm_medium=homepage&sectionid=6931a4e02daaad068d64d4fb',
                style: 'primary'
            },
            {
                text: 'Register for Info Session',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-techsprint-hackathon-2025-kick-off-session-gdg-on-campus-sjcem/',
                style: 'outline'
            },
            {
                text: 'Join Session (Meet)',
                link: 'https://meet.google.com/ghv-pdks-zsj?authuser=0&hs=122&ijlm=1765555890226',
                style: 'primary'
            }
        ],
        partners: [
            { name: 'Hack2Skill', logo: 'https://h2svision.github.io/publicAssets/vision/favicon.png' },
            { name: 'DC Infotech Private Limited', logo: 'https://storage.googleapis.com/vision-hack2skill-production/innovator/USER00398865/1764868779435-logo.webp' }
        ],
        results: {
            status: 'pending', // or 'announced'
            top10: [], // To be populated later
            top3: []
        },
        prizes: {
            title: 'Rewards & Recognition',
            description: 'Rewards for the top 3 winning teams in their chapter (sent to the organizer for distribution).',
            items: [
                { icon: '🥇', title: '1st Place Team', desc: 'Winner Certificate + Exclusive Swag' },
                { icon: '🥈', title: '2nd Place Team', desc: 'Runner-up Certificate + Swag' },
                { icon: '🥉', title: '3rd Place Team', desc: 'Runner-up Certificate + Swag' }
            ]
        },
        challenge: {
            title: 'Open Innovation',
            description: 'Participants are free to choose any problem statement or theme they are passionate about. The only limit is your imagination!'
        },
        rules: [
            {
                title: 'Google Technology (Mandatory)',
                description: 'Participants must integrate at least one Google technology in their solution. This includes tools such as:',
                items: ['Google Gemini', 'Google AI Studio', 'Firebase', 'Google Cloud Platform', 'Other relevant Google technologies']
            },
            {
                title: 'Open Innovation',
                description: 'Participants should identify a local problem—such as traffic management, waste disposal, or access to education—and build solutions using Google technologies to address them.',
                items: [
                    'Optimize city services like garbage collection or traffic flow.',
                    'Improve access to healthcare or education in underserved areas.',
                    'Promote sustainability, such as reducing energy consumption.',
                    'Enhance community engagement or safety through smart apps.'
                ]
            }
        ],
        resources: [
            { title: 'Kickoff Session Slides', link: 'https://docs.google.com/presentation/d/1OpAQNu0PjsB-GmXl-NWgZWz8r2MUqd1qZXvKUd0fonI/edit?usp=sharing' },
            { title: 'Submission Template', link: 'https://docs.google.com/presentation/d/10s9OMNMbQ0AGpKZUA4JOXPOvrWafiO4CYvJ_OtHV1j0/edit' }
        ],
        judges: [
            {
                name: 'Dr. Sunny Sall',
                role: 'Faculty Advisor',
                image: 'https://wsrv.nl/?url=https%3A%2F%2Fi.ibb.co%2FRTNCNWTD%2Ffile-2.jpg&w=400&h=400&fit=cover&a=center&q=80&output=webp',
                linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in',
                googleScholar: 'https://scholar.google.com/citations?user=DV2d_v8AAAAJ&hl=en',
                bio: 'Faculty Advisor and HOD of Computer Engineering at St. John College of Engineering and Management. A distinguished researcher with numerous publications in AI, Machine Learning, and Wireless Sensor Networks.'
            },
            {
                name: 'Nomthandazo T. Tshuma',
                role: 'Lead AI Engineer | GDE | Docker Captain',
                image: 'https://media.licdn.com/dms/image/v2/D4D03AQFfFEuKlDTZ5g/profile-displayphoto-shrink_200_200/B4DZcebfwaHMAY-/0/1748562214841?e=1766620800&v=beta&t=UK1GVNOfnuAAJqTPrvUamUS7Zj0PkuiWTfkN2a_nuiI',
                linkedin: 'https://www.linkedin.com/in/nomthat/',
                bio: 'A Data & AI Engineer and ML specialist, I convert raw data into strategic assets, enabling informed decision-making and driving business growth.'
            },
            {
                name: 'Biswanath Giri',
                role: 'Google Developer Expert | Principal Architect',
                image: 'https://media.licdn.com/dms/image/v2/D5603AQHZRTzsf7raNA/profile-displayphoto-scale_200_200/B56ZoMZ29DIYAY-/0/1761144697834?e=1766620800&v=beta&t=-1zXZ1xM5FPmYxvIHi9kZ94vY0JHthmriYUKxtkk5Ws',
                linkedin: 'https://www.linkedin.com/in/biswanathgiri/',
                bio: '16+ Years of IT industry experience. Google Developer Expert (GDE) in Cloud. Helping businesses with their journey to Cloud & AI. Principal Architect at Kenvue.'
            }
        ],
        faq: [
            { question: 'Who is eligible to participate?', answer: 'This hackathon is open to ALL students, including Engineering, Diploma, ITI, and Science graduates. If you have an idea, you are welcome!' },
            { question: 'Do I need prior experience to participate?', answer: 'No, this hackathon is open to beginners and experts alike. We will have mentors to guide you.' },
            { question: 'Can I choose any problem statement or theme?', answer: 'Yes! The theme is Open Innovation, so you can build solutions for any problem you identify.' },
            { question: 'Is participation free?', answer: 'Yes, participation is completely free.' },
            { question: 'What is the team size?', answer: 'Teams can consist of 2 to 4 members.' },
            { question: 'Will food be provided?', answer: 'No, food will not be provided for this event. However, we may have special arrangements for the Top 10 shortlisted teams.' },
            { question: 'Can I participate remotely?', answer: 'The initial submission is online, but the final round will be held offline at the campus.' }
        ],
        quiz: {
            title: "TechSprint Pop Quiz! 🧠",
            description: "Think you know everything about TechSprint 2025? Test your knowledge and get ready to hack!",
            questions: [
                {
                    id: 1,
                    question: "What is the team size for TechSprint 2025?",
                    options: ["1 Member", "2-4 Members", "5-6 Members", "Unlimited"],
                    correctAnswer: "2-4 Members"
                },
                {
                    id: 2,
                    question: "Which technology is MANDATORY for your project?",
                    options: ["AWS", "Microsoft Azure", "Google Technology (Firebase, Gemini, Cloud, etc.)", "Blockchain"],
                    correctAnswer: "Google Technology (Firebase, Gemini, Cloud, etc.)"
                },
                {
                    id: 3,
                    question: "Where will the Grand Finale be held?",
                    options: ["Online (Zoom)", "St. John College of Engineering & Management (SJCEM)", "Mumbai University", "Google Office, Bangalore"],
                    correctAnswer: "St. John College of Engineering & Management (SJCEM)"
                },
                {
                    id: 4,
                    question: "What is the theme of the hackathon?",
                    options: ["FinTech Only", "HealthTech Only", "Open Innovation", "Agriculture"],
                    correctAnswer: "Open Innovation"
                },
                {
                    id: 5,
                    question: "Is there a registration fee?",
                    options: ["₹500 per team", "₹100 per person", "100% Free", "Only for finalists"],
                    correctAnswer: "100% Free"
                },
                {
                    id: 6,
                    question: "How many Google Cloud certifications does Dhiraj Chaudhari have?",
                    options: ["5 certifications", "10 certifications", "14 certifications 🔥", "20 certifications"],
                    correctAnswer: "14 certifications 🔥"
                },
                {
                    id: 7,
                    question: "What is Dhiraj's current employment status?",
                    options: ["Google Employee", "Freelance Trainer", "Unemployed (but certified AF 😎)", "Startup Founder"],
                    correctAnswer: "Unemployed (but certified AF 😎)"
                },
                {
                    id: 8,
                    question: "If Dhiraj has 14 Google Cloud certifications but no job, what does that make him?",
                    options: ["Overqualified Legend 🏆", "Professional Student", "Cloud Collector", "Certification Hoarder"],
                    correctAnswer: "Overqualified Legend 🏆"
                },
                {
                    id: 9,
                    question: "What's the most ironic thing about Dhiraj?",
                    options: ["He trains others to get cloud jobs", "He has more certs than job offers 😅", "He's organizing a hackathon while job hunting", "All of the above 💯"],
                    correctAnswer: "All of the above 💯"
                },
                {
                    id: 10,
                    question: "What should you do if you see Dhiraj at TechSprint?",
                    options: ["Ask for career advice (ironically)", "Request a Google Cloud tutorial", "Offer him a job 🙏", "All of the above"],
                    correctAnswer: "All of the above"
                },
                {
                    id: 11,
                    question: "Dhiraj's LinkedIn bio probably says:",
                    options: ["Actively seeking opportunities", "14x Google Cloud Certified | Open to Work", "Professional Certification Collector", "Unemployed but Unstoppable 🚀"],
                    correctAnswer: "14x Google Cloud Certified | Open to Work"
                },
                {
                    id: 12,
                    question: "What's Dhiraj's superpower?",
                    options: ["Passing Google exams faster than getting interviews", "Teaching cloud while being on cloud nine (jobless)", "Turning unemployment into opportunity", "All of the above ⚡"],
                    correctAnswer: "All of the above ⚡"
                },
                {
                    id: 13,
                    question: "If Dhiraj's certifications were currency, he'd be:",
                    options: ["Broke but educated", "Rich in knowledge, poor in salary 💸", "A Google Cloud millionaire", "Still unemployed 😂"],
                    correctAnswer: "Rich in knowledge, poor in salary 💸"
                },
                {
                    id: 14,
                    question: "What does Dhiraj do in his free time (which is all the time)?",
                    options: ["Study for the 15th certification", "Organize hackathons for students", "Apply to jobs and get ghosted", "All of the above 🎯"],
                    correctAnswer: "All of the above 🎯"
                },
                {
                    id: 15,
                    question: "The best way to describe Dhiraj's journey:",
                    options: ["Certified genius, employment pending", "14 certs, 0 offers, 100% dedication 💪", "Living proof that certs ≠ jobs", "An inspiration to never give up"],
                    correctAnswer: "14 certs, 0 offers, 100% dedication 💪"
                },
                {
                    id: 16,
                    question: "What is Dhiraj's favorite pick-up line?",
                    options: ["Are you a cloud? Because you make my heart rain 🌧️", "Are you Google Cloud? Because you're everything I'm certified in ☁️", "Baby, are you an exception? Let me catch you.", "None (He only talks to computers)"],
                    correctAnswer: "Are you Google Cloud? Because you're everything I'm certified in ☁️"
                },
                {
                    id: 17,
                    question: "Why did Dhiraj cross the road?",
                    options: ["To get to the other cloud provider", "To escape the unemployment line", "To find better Wi-Fi", "He didn't, he just deployed a replica on the other side 🚀"],
                    correctAnswer: "He didn't, he just deployed a replica on the other side 🚀"
                },
                {
                    id: 18,
                    question: "What is Dhiraj's hidden talent?",
                    options: ["Debugging code by staring at it", "Getting certified without studying", "Explaining Kubernetes to his grandma", "All of the above"],
                    correctAnswer: "Debugging code by staring at it"
                },
                {
                    id: 19,
                    question: "Dhiraj's relationship status?",
                    options: ["Single", "Married", "Committed to git commit 💍", "It's complicated (with AWS)"],
                    correctAnswer: "Committed to git commit 💍"
                },
                {
                    id: 20,
                    question: "If Dhiraj was a superhero, his name would be?",
                    options: ["Captain Cloud 🦸‍♂️", "The Crtifier", "Unemployed Man", "Google-Man"],
                    correctAnswer: "Captain Cloud 🦸‍♂️"
                }
            ]
        }
    },
    {
        id: 2,
        date: '20 Dec 2025',
        type: 'Session',
        title: 'TechSprint 2025 | Ask Me Anything & Hackathon Guidance Session',
        description: 'Join us for an important online guidance & AMA session as part of TechSprint 2025. Gain clarity on submissions, evaluation expectations, and execution strategy.',
        longDescription: `
            <h3>TechSprint 2025 | Ask Me Anything & Hackathon Guidance Session</h3>
            <p><strong>Hosted by GDG on Campus – St. John College of Engineering & Management (Autonomous)</strong></p>

            <p>Join us for an important online guidance & AMA session as part of TechSprint 2025.</p>

            <p>This session is designed to help participants gain absolute clarity on hackathon submissions, evaluation expectations, and execution strategy before entering the build phase.</p>

            <p>Whether you already have an idea or are still brainstorming, this session will help you refine, validate, and strengthen your approach.</p>

            <h4>🎯 Session Focus</h4>
            <ul>
                <li>Clarity on Hackathon submissions & timelines</li>
                <li>What evaluators and judges expect</li>
                <li>How to sharpen your idea & execution</li>
                <li>Common mistakes to avoid during submission</li>
                <li><strong>Ask Me Anything (Q&A)</strong> – Opportunity to have your pressing questions answered by experts!</li>
            </ul>

            <div style="background: #e6f4ea; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #34a853;">
                <h4 style="margin-top: 0; color: #34a853;">🗣️ Speaker</h4>
                <p style="margin-bottom: 0;"><strong>Dhiraj Chaudhari</strong><br/>
                GDG on Campus Organizer<br/>
                Google Product Expert | 14× Google Cloud Certified</p>
            </div>

            <h4>🗓 Event Details</h4>
            <p><strong>Date:</strong> Saturday, 20 Dec 2025<br/>
            <strong>Time:</strong> 7:30 PM – 8:30 PM (IST)<br/>
            <strong>Mode:</strong> Online</p>

            <p>👉 <strong>Call to Action:</strong> Don't miss this chance to elevate your hackathon game and gain insights from an industry expert. Register now and be part of the journey to innovation!</p>
        `,
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', // Fixed working placeholder
        showTimer: true,
        registrations: 2,
        location: 'Online (Google Meet)',
        buttons: [
            {
                text: 'Register / RSVP',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-techsprint-2025-ask-me-anything-hackathon-guidance-session/',
                style: 'primary'
            }
        ],
        agenda: [
            {
                time: '07:15 PM',
                title: 'Session Starts',
                description: 'Join slightly early to settle in.'
            },
            {
                time: '07:30 PM – 08:30 PM',
                title: 'Guidance & AMA',
                description: 'Main session with Dhiraj Chaudhari.',
                speakers: [
                    {
                        name: 'Dhiraj Chaudhari',
                        role: 'Organizer',
                        image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
                        linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/'
                    }
                ]
            }
        ]
    }
];

export const pastEvents = [
    {
        id: 103,
        date: '15 Dec 2025',
        type: 'Workshop',
        title: 'TechSprint 2025 | Pre-Event: How NOT to Win a Hackathon',
        location: 'Online Google Meet',
        description: 'Day 1 of TechSprint 2025 successfully kicked off with the "Anti-Workshop" session focused on hackathon strategy, team building, and execution. \n\nSpeaker: Prathamesh Jakkula (Finalist – SIH’24 & MumbaiHacks’25)',
        materialsLink: 'https://www.youtube.com/watch?v=EkT1XYiY3gM',
        driveLink: 'https://drive.google.com/drive/folders/1h5C_-WAmtc67PDEfjlWfDdK-j-pRTKqU?usp=drive_link',
        registrations: 50,
        image: '/images/techsprint-day1/uploaded_image_0_1765824705394.png',
        gallery: [
            '/images/techsprint-day1/uploaded_image_0_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_1_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_2_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_3_1765824705394.png',
            '/images/techsprint-day1/uploaded_image_4_1765824705394.png'
        ]
    },
    {
        id: 101, // Unique ID for routing clarity
        date: '2 Oct 2025',
        type: 'Info session',
        title: 'Google Cloud Study Jams – Online Info Session',
        location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India',
        description: 'An online session diving deep into Google Cloud Platform essentials and how to kickstart your cloud journey.',
        materialsLink: 'https://docs.google.com/presentation/d/1goUL1QPjTLqMbLyKFuzTORWKXmkiCJ7K_gBM2UG61z0/edit?usp=sharing',
        registrations: 152,
        image: 'https://i.ibb.co/Ng0NCJvj/blob-Pca-Hqc5.webp',
        gallery: [
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ]
    },
    {
        id: 102,
        date: '24 Sept 2025',
        type: 'Info session',
        title: 'Info Session: GDG on Campus – SJCEM | Kick-off 2025',
        location: 'GDG on Campus St. John College of Engineering and Management Autonomous - Palghar, India',
        description: 'The inaugural session for our campus chapter, introducing the team, goals, and upcoming roadmap for 2025.',
        materialsLink: 'https://docs.google.com/presentation/d/1HUS16B9qQuLxBBUgkEHog2-ROPqccoG7b_ZpW4jS-y4/edit?usp=sharing',
        registrations: 200,
        image: 'https://i.ibb.co/nMk7f1mG/blob-Iq7f-MFD.webp'
    }
];
