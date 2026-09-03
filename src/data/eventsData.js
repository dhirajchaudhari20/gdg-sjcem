export const upcomingEvents = [
    {
        id: 129747,
        date: '7 Sep 2026',
        type: 'In-person Datathon',
        title: '🔥 DATATHON 2026 IS HERE!',
        description: 'Datathon 2026 is an intense in-person data hackathon & competition at SJCEM. Work with real-world datasets, build predictive AI models, data pipelines, and compete for top prizes!',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        showTimer: true,
        registrations: '1000 RSVPs',
        teamSize: 'Team & Individual',
        location: 'In-person • SJCEM Campus, Palghar, India',
        registrationStatus: {
            message: 'Free Registration • In-person Datathon at SJCEM Campus',
            type: 'urgent'
        },
        buttons: [
            {
                text: 'RSVP / Register Here',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-datathon-2026-is-here/',
                style: 'primary'
            }
        ]
    },
    {
        id: 129746,
        date: '5 Sep 2026',
        type: 'Virtual Workshop',
        title: 'Android App Day: Build Your First App',
        description: 'Learn Android development with Kotlin and Jetpack Compose. Build your very first native mobile app step-by-step with GDG community mentors.',
        image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80',
        showTimer: true,
        registrations: '1000 RSVPs',
        teamSize: 'Individual',
        location: 'Virtual (Google Meet)',
        registrationStatus: {
            message: 'Free Virtual Workshop • Beginners Welcome',
            type: 'urgent'
        },
        buttons: [
            {
                text: 'RSVP / Register Here',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-android-app-day-build-your-first-app/',
                style: 'primary'
            }
        ]
    },
    {
        id: 5,
        date: '13 Mar 2026',
        type: 'AI Workshop',
        title: 'Build Your Own "Bargaining Shopkeeper" AI Agent',
        description: 'Learn to build an AI Agent using Gemini 3 and the Agent Development Kit (ADK). Connect tools, write backend logic in Python, and deploy on Google Cloud Run.',
        image: '/images/ai-workshop.png',
        showTimer: true,
        registrations: 'Limited',
        teamSize: 'Individual',
        location: 'Lab 1, 4th Floor, Computer Engineering Department, SJCEM',
        registrationStatus: {
            message: 'Free of Cost. Laptop Not Required. Participation Certificate provided.',
            type: 'urgent'
        },
        buttons: [
            {
                text: 'Register Here',
                link: 'https://docs.google.com/forms/d/1oGCMEj8XyqCeF9xU70L4VTtBMXBSnn3kjdVznw86mFg/viewform',
                style: 'primary'
            },
            {
                text: 'Start Codelab',
                link: 'https://codelabs.developers.google.com/agentic-app-gemini-3-adk#0',
                style: 'outline'
            },
            {
                text: 'PPT Link',
                link: 'https://docs.google.com/presentation/d/1rpJzd1TGK5SiBR88YJPH8A-1mGBg8rUvtzdjW9Dcgc4/edit?slide=id.g3cf933807a7_0_0#slide=id.g3cf933807a7_0_0',
                style: 'outline'
            }
        ],
        longDescription: `
            <h3>🚀 FREE AI WORKSHOP – GDG on Campus SJCEM</h3>
            <p>Build Your Own <strong>“Bargaining Shopkeeper” AI Agent</strong> using <em>Gemini 3 & Google Agent Development Kit (ADK)</em> 🤖</p>
            <p><strong>Speaker:</strong> Dhiraj Chaudhari (Google Product Expert, 13x Google Cloud Certified)</p>
            <p><strong>What you will learn:</strong></p>
            <ul>
                <li>Build an AI Agent using Gemini 3</li>
                <li>Connect tools with Agent Development Kit (ADK)</li>
                <li>Backend logic using Python</li>
                <li>Deploy AI apps on Google Cloud Run</li>
                <li>Create an interface where users can bargain with an AI shopkeeper</li>
            </ul>
            <div style="background: #e8f0fe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #1a73e8;">
                <h4 style="margin-top: 0; color: #1a73e8;">🎓 Details</h4>
                <p>✅ Free of Cost</p>
                <p>💻 Laptop Not Required</p>
                <p>📜 Participation Certificate Provided</p>
                <p>⚠️ Limited Seats</p>
            </div>
        `,
        agenda: [
            {
                id: 'workshop',
                label: 'Workshop Schedule (13 Mar)',
                items: [
                    {
                        time: '01:30 PM – 03:00 PM',
                        title: 'Build an AI Agent Workshop',
                        description: 'Hands-on session to build an AI Agent using Gemini 3, connect tools with ADK, backend logic in Python, deploy on Google Cloud Run, and create a bargaining interface.',
                        speakers: [
                            {
                                name: 'Dhiraj Chaudhari',
                                role: 'Google Product Expert | 13× Google Cloud Certified',
                                image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec'
                            }
                        ]
                    }
                ]
            }
        ],
        faq: [
            { question: 'Do I need to carry my laptop?', answer: 'No, a laptop is not required for this workshop.' },
            { question: 'Is the workshop free?', answer: 'Yes, it is completely free of cost.' },
            { question: 'Will I get a certificate?', answer: 'Yes, a participation certificate will be provided to the attendees.' },
            { question: 'Who can attend?', answer: 'Anyone interested in AI, Gemini 3, and Agent Development Kit can attend. Seats are limited, so register early!' }
        ]
    }
];

export const pastEvents = [
    {
        id: 128239,
        date: '31 Aug 2026',
        status: 'ended',
        type: 'Virtual Workshop',
        title: 'Intro to Google Cloud: Navigating the Digital Future',
        description: 'Discover the fundamentals of Google Cloud Platform (GCP), cloud compute, IAM, Cloud Storage, and serverless architectures to kickstart your cloud journey.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 6,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-intro-to-google-cloud-navigating-the-digital-future/',
                style: 'outline'
            }
        ]
    },
    {
        id: 128193,
        date: '31 Jul 2026',
        status: 'ended',
        type: 'Virtual Workshop',
        title: 'Elevate Your App with Firebase Workshop',
        description: 'Hands-on workshop on Firebase Authentication, Firestore Database, Cloud Storage, and Realtime Database for modern web and mobile applications.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 2,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-elevate-your-app-with-firebase-workshop/',
                style: 'outline'
            }
        ]
    },
    {
        id: 128143,
        date: '13 Jul 2026',
        status: 'ended',
        type: 'Virtual Session',
        title: 'Peer-to-Peer Learning & Networking Session',
        description: 'Connect with fellow tech enthusiasts, share project experiences, discuss open-source projects, and build meaningful peer connections across campus.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 10,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-peer-to-peer-learning-amp-networking-session/',
                style: 'outline'
            }
        ]
    },
    {
        id: 124600,
        date: '15 Jun 2026',
        status: 'ended',
        type: 'Hackathon Challenge',
        title: 'CodeCraze: GDG Hackathon Challenge',
        description: 'A fast-paced mini hackathon challenge where student developers built creative web & mobile solutions solving real campus problems under time limits.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 6,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-codecraze-gdg-hackathon-challenge/',
                style: 'outline'
            }
        ]
    },
    {
        id: 124156,
        date: '16 May 2026',
        status: 'ended',
        type: 'Virtual Workshop',
        title: 'Introduction to Firebase: Building Modern Web Apps',
        description: 'A foundational walkthrough on integrating Firebase SDK into React & JavaScript web applications, implementing Auth login, and syncing real-time data.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 3,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-introduction-to-firebase-building-modern-web-apps/',
                style: 'outline'
            }
        ]
    },
    {
        id: 124155,
        date: '16 May 2026',
        status: 'ended',
        type: 'Virtual Workshop',
        title: 'AI-Driven Web Development Workshop',
        description: 'Explore how generative AI APIs (Gemini API, Web LLMs) can transform modern web interfaces with smart autocompletion, chat interfaces, and dynamic recommendations.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 3,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-ai-driven-web-development-workshop/',
                style: 'outline'
            }
        ]
    },
    {
        id: 124154,
        date: '14 May 2026',
        status: 'ended',
        type: 'Virtual Session',
        title: 'AI and Machine Learning Introduction',
        description: 'An introductory session on machine learning concepts, supervised vs unsupervised learning, neural networks, and Google\'s AI developer tools ecosystem.',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 5,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-ai-and-machine-learning-introduction/',
                style: 'outline'
            }
        ]
    },
    {
        id: 122017,
        date: '12 May 2026',
        status: 'ended',
        type: 'In-person Hackathon',
        title: 'GDG Solution Challenge 2026 - Hackathon & Submission',
        description: 'In-person hackathon sprint and submission workshop for student teams solving UN Sustainable Development Goals.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        location: 'SJCEM Campus, Palghar, India',
        registrations: 3,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-gdg-solution-challenge-2026-hackathon-amp-submission-1/',
                style: 'outline'
            }
        ]
    },
    {
        id: 122014,
        date: '23 Apr 2026',
        status: 'ended',
        type: 'Virtual Hackathon',
        title: 'GDG Solution Challenge 2026 – Hackathon & Submission',
        description: 'Virtual project check-in and technical mentoring session for teams submitting projects to the Google Solution Challenge 2026.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 4,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-gdg-solution-challenge-2026-hackathon-amp-submission/',
                style: 'outline'
            }
        ]
    },
    {
        id: 121741,
        date: '18 Apr 2026',
        status: 'ended',
        type: 'Virtual Session',
        title: 'Getting Started with Google Antigravity: An Agentic Development Experience',
        description: 'Deep-dive session into Google Antigravity, exploring agentic pair programming, subagents, system design workflows, and AI coding automation.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
        location: 'Virtual • GDG Live',
        registrations: 4,
        buttons: [
            {
                text: 'View Event Details',
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-getting-started-with-google-antigravity-an-agentic-development-experience/',
                style: 'outline'
            }
        ]
    },
    {
        id: 4,
        date: '31 Jan 2026',
        status: 'ended',
        type: 'Grand Finale',
        title: 'TechSprint Hackathon 2025 – Grand Finale',
        description: 'The Grand Finale of TechSprint 2025! Top teams competed for the ultimate prize at SJCEM Campus.',
        image: 'https://i.ibb.co/bjc6f31T/Generated-Image-December-04-2025-8-46-PM.jpg',
        location: 'SJCEM, Palghar, India',
        driveLink: 'https://drive.google.com/drive/folders/1HiH1c7ulKezMwkUpnr8A6ONcW4Y_QEuA?usp=sharing',
        showTimer: false,
        partners: [
            { name: 'Hack2Skill', logo: 'https://h2svision.github.io/publicAssets/vision/favicon.png' },
            { name: 'DC Infotech Private Limited', logo: 'https://storage.googleapis.com/vision-hack2skill-production/innovator/USER00398865/1764868779435-logo.webp' }
        ],
        judges: [
            {
                name: 'Dr. Sunny Sall',
                role: 'Faculty Advisor',
                image: 'https://wsrv.nl/?url=https%3A%2F%2Fi.ibb.co%2FRTNCNWTD%2Ffile-2.jpg&w=400&h=400&fit=cover&a=center&q=80&output=webp',
                linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in',
                bio: 'Faculty Advisor and HOD of Computer Engineering at St. John College of Engineering and Management.'
            },
            {
                name: 'Nomthandazo T. Tshuma',
                role: 'Lead AI Engineer | GDE',
                image: 'https://media.licdn.com/dms/image/v2/D4D03AQFfFEuKlDTZ5g/profile-displayphoto-shrink_200_200/B4DZcebfwaHMAY-/0/1748562214841?e=1766620800&v=beta&t=UK1GVNOfnuAAJqTPrvUamUS7Zj0PkuiWTfkN2a_nuiI',
                linkedin: 'https://www.linkedin.com/in/nomthat/',
                bio: 'A Data & AI Engineer and ML specialist, I convert raw data into strategic assets.'
            },
            {
                name: 'Biswanath Giri',
                role: 'GDE | Principal Architect',
                image: 'https://media.licdn.com/dms/image/v2/D5603AQHZRTzsf7raNA/profile-displayphoto-scale_200_200/B56ZoMZ29DIYAY-/0/1761144697834?e=1766620800&v=beta&t=-1zXZ1xM5FPmYxvIHi9kZ94vY0JHthmriYUKxtkk5Ws',
                linkedin: 'https://www.linkedin.com/in/biswanathgiri/',
                bio: '16+ Years of IT industry experience. Google Developer Expert (GDE) in Cloud. Principal Architect at Kenvue.'
            }
        ],
        prizes: {
            title: 'Grand Finale Rewards',
            description: 'The moment of truth! Winners will be awarded exciting prizes and certificates.',
            items: [
                { icon: '🏆', title: '1st Place', desc: 'Winner Trophy + Swag + Certificate' },
                { icon: '🥈', title: '2nd Place', desc: 'Runner-up Trophy + Swag + Certificate' },
                { icon: '🥉', title: '3rd Place', desc: 'Swag + Certificate' }
            ]
        },
        faq: [
            { question: 'What time should I report?', answer: 'Reporting time is 10:00 AM sharp at the SJCEM Campus.' },
            { question: 'Is lunch provided?', answer: 'Yes, a lunch break is scheduled from 12:30 PM to 01:00 PM.' },
            { question: 'Do I need to bring my laptop?', answer: 'Yes, please bring your laptops for the final development sprint and demos.' },
            { question: 'Can I bring valid ID?', answer: 'Yes, carrying your college ID card is mandatory for entry.' }
        ],
        buttons: [
            {
                text: 'View Photos',
                link: 'https://drive.google.com/drive/folders/1HiH1c7ulKezMwkUpnr8A6ONcW4Y_QEuA?usp=sharing',
                style: 'primary'
            }
        ],
        gallery: [
            "/images/techsprint/recents/IMG_1187.jpg",
            "/images/techsprint/recents/IMG_1188.jpg",
            "/images/techsprint/recents/IMG_1189.jpg",
            "/images/techsprint/recents/IMG_1194.jpg",
            "/images/techsprint/recents/IMG_1195.jpg",
            "/images/techsprint/recents/IMG_1196.jpg",
            "/images/techsprint/recents/IMG_1197.jpg",
            "/images/techsprint/recents/IMG_1198.jpg",
            "/images/techsprint/recents/IMG_1199.jpg",
            "/images/techsprint/recents/IMG_1200.jpg",
            "/images/techsprint/recents/IMG_1201.jpg",
            "/images/techsprint/recents/IMG_1202.jpg",
            "/images/techsprint/recents/IMG_1203.jpg",
            "/images/techsprint/recents/IMG_1204.jpg",
            "/images/techsprint/recents/IMG_1205.jpg",
            "/images/techsprint/recents/IMG_1206.jpg",
            "/images/techsprint/recents/IMG_1207.jpg",
            "/images/techsprint/recents/IMG_1208.jpg",
            "/images/techsprint/recents/IMG_1209.jpg",
            "/images/techsprint/recents/IMG_1210.jpg",
            "/images/techsprint/recents/IMG_1211.jpg",
            "/images/techsprint/recents/IMG_1212.jpg",
            "/images/techsprint/recents/IMG_1213.jpg",
            "/images/techsprint/recents/IMG_1214.jpg",
            "/images/techsprint/recents/IMG_1215.jpg",
            "/images/techsprint/recents/IMG_1216.jpg",
            "/images/techsprint/recents/IMG_1217.jpg",
            "/images/techsprint/recents/IMG_1218.jpg",
            "/images/techsprint/recents/IMG_1219.jpg",
            "/images/techsprint/recents/IMG_1220.jpg",
            "/images/techsprint/recents/IMG_1221.jpg",
            "/images/techsprint/recents/IMG_1222.jpg",
            "/images/techsprint/recents/IMG_1223.jpg",
            "/images/techsprint/recents/IMG_1224.jpg",
            "/images/techsprint/recents/IMG_1225.jpg",
            "/images/techsprint/recents/IMG_1226.jpg",
            "/images/techsprint/recents/IMG_1227.jpg",
            "/images/techsprint/recents/IMG_1228.jpg",
            "/images/techsprint/recents/IMG_1229.jpg",
            "/images/techsprint/recents/IMG_1230.jpg",
            "/images/techsprint/recents/IMG_1231.jpg",
            "/images/techsprint/recents/IMG_1232.jpg",
            "/images/techsprint/recents/IMG_1233.jpg",
            "/images/techsprint/recents/IMG_1234.jpg",
            "/images/techsprint/recents/IMG_1235.jpg",
            "/images/techsprint/recents/IMG_1237.jpg",
            "/images/techsprint/recents/IMG_1238.jpg",
            "/images/techsprint/recents/IMG_1239.jpg",
            "/images/techsprint/recents/IMG_1240.jpg",
            "/images/techsprint/recents/IMG_1241.jpg",
            "/images/techsprint/recents/IMG_1242.jpg",
            "/images/techsprint/recents/IMG_1243.jpg",
            "/images/techsprint/recents/IMG_1244.jpg",
            "/images/techsprint/recents/IMG_1247.jpg",
            "/images/techsprint/recents/IMG_1248.jpg",
            "/images/techsprint/recents/IMG_1249.jpg",
            "/images/techsprint/recents/IMG_1252.jpg",
            "/images/techsprint/recents/IMG_1253.jpg",
            "/images/techsprint/recents/IMG_1254.jpg",
            "/images/techsprint/recents/IMG_1255.jpg",
            "/images/techsprint/recents/IMG_1299.jpg",
            "/images/techsprint/recents/IMG_1300.jpg",
            "/images/techsprint/recents/IMG_1301.jpg",
            "/images/techsprint/recents/IMG_1302.jpg",
            "/images/techsprint/recents/IMG_1320.jpg",
            "/images/techsprint/recents/IMG_1321.jpg",
            "/images/techsprint/recents/IMG_1322.jpg",
            "/images/techsprint/recents/IMG_1323.jpg",
            "/images/techsprint/recents/IMG_1324.jpg",
            "/images/techsprint/recents/IMG_1325.jpg",
            "/images/techsprint/recents/IMG_1326.jpg",
            "/images/techsprint/recents/IMG_1327.jpg",
            "/images/techsprint/recents/IMG_1328.jpg",
            "/images/techsprint/recents/IMG_1329.jpg",
            "/images/techsprint/recents/IMG_1330.jpg",
            "/images/techsprint/recents/IMG_1331.jpg",
            "/images/techsprint/recents/IMG_1332.jpg",
            "/images/techsprint/recents/IMG_1333.jpg",
            "/images/techsprint/recents/IMG_1334.jpg",
            "/images/techsprint/recents/IMG_1335.jpg",
            "/images/techsprint/recents/IMG_1336.jpg",
            "/images/techsprint/recents/IMG_1337.jpg",
            "/images/techsprint/recents/IMG_1338.jpg",
            "/images/techsprint/recents/IMG_1339.jpg",
            "/images/techsprint/recents/IMG_1340.jpg",
            "/images/techsprint/recents/IMG_1342.jpg",
            "/images/techsprint/recents/IMG_1343.jpg",
            "/images/techsprint/recents/IMG_1344.jpg",
            "/images/techsprint/recents/IMG_1345.jpg",
            "/images/techsprint/recents/IMG_1346.jpg",
            "/images/techsprint/recents/IMG_1347.jpg",
            "/images/techsprint/recents/IMG_1348.jpg",
            "/images/techsprint/recents/IMG_1349.jpg",
            "/images/techsprint/recents/IMG_1350.jpg",
            "/images/techsprint/recents/IMG_1351.jpg",
            "/images/techsprint/recents/IMG_1352.jpg",
            "/images/techsprint/recents/IMG_1353.jpg",
            "/images/techsprint/recents/IMG_1355.jpg",
            "/images/techsprint/recents/IMG_1356.jpg",
            "/images/techsprint/recents/IMG_1357.jpg",
            "/images/techsprint/recents/IMG_1361.jpg",
            "/images/techsprint/recents/IMG_1362.jpg",
            "/images/techsprint/recents/IMG_1363.jpg",
            "/images/techsprint/recents/IMG_1364.jpg",
            "/images/techsprint/recents/IMG_1365.jpg",
            "/images/techsprint/recents/IMG_1366.jpg",
            "/images/techsprint/recents/IMG_1368.jpg",
            "/images/techsprint/recents/IMG_1369.jpg",
            "/images/techsprint/recents/IMG_1370.jpg",
            "/images/techsprint/recents/IMG_1371.jpg",
            "/images/techsprint/recents/IMG_1372.jpg",
            "/images/techsprint/recents/IMG_1373.jpg",
            "/images/techsprint/recents/IMG_1374.jpg",
            "/images/techsprint/recents/IMG_1375.jpg",
            "/images/techsprint/recents/IMG_1376.jpg",
            "/images/techsprint/recents/IMG_1377.jpg",
            "/images/techsprint/recents/IMG_1378.jpg",
            "/images/techsprint/recents/IMG_1379.jpg",
            "/images/techsprint/recents/IMG_1380.jpg",
            "/images/techsprint/recents/IMG_1381.jpg",
            "/images/techsprint/recents/IMG_1382.jpg",
            "/images/techsprint/recents/IMG_1383.jpg",
            "/images/techsprint/recents/IMG_1384.jpg",
            "/images/techsprint/recents/IMG_1385.jpg",
            "/images/techsprint/recents/IMG_1386.jpg",
            "/images/techsprint/recents/IMG_1389.jpg",
            "/images/techsprint/recents/IMG_1390.jpg",
            "/images/techsprint/recents/IMG_1391.jpg",
            "/images/techsprint/recents/IMG_1392.jpg",
            "/images/techsprint/recents/IMG_1393.jpg",
            "/images/techsprint/recents/IMG_1395.jpg",
            "/images/techsprint/recents/IMG_1396.jpg",
            "/images/techsprint/recents/IMG_1399.jpg",
            "/images/techsprint/recents/IMG_1400.jpg",
            "/images/techsprint/recents/IMG_1401.jpg",
            "/images/techsprint/recents/IMG_1402.jpg",
            "/images/techsprint/recents/IMG_1403.jpg",
            "/images/techsprint/recents/IMG_1404.jpg",
            "/images/techsprint/recents/IMG_1405.jpg",
            "/images/techsprint/recents/IMG_1406.jpg",
            "/images/techsprint/recents/IMG_1407.jpg"
        ],
        agenda: [
            {
                id: 'finale',
                label: 'Grand Finale Schedule',
                items: [
                    { time: '10:00 AM – 10:15 AM', title: 'Participant Reporting & Check-In', description: 'Team verification, Seating & system setup' },
                    { time: '10:15 AM – 10:30 AM', title: 'Opening Ceremony', description: 'Welcome address, Overview of TechSprint 2025 journey, Brief about finale rules & judging criteria' },
                    { time: '10:30 AM – 12:30 PM', title: 'Final Development Sprint', description: 'Code refinement, Debugging & testing, Mentor support (if applicable)' },
                    { time: '12:30 PM – 01:00 PM', title: 'Lunch Break 🍽️', description: '' },
                    { time: '01:00 PM – 02:30 PM', title: 'Project Presentations & Demos', description: 'Each team presents their solution, Live demo + Q&A with judges' },
                    { time: '02:30 PM – 03:00 PM', title: 'Judges’ Deliberation', description: 'Evaluation & final scoring, Networking break for participants' },
                    { time: '03:00 PM – 03:30 PM', title: 'Valedictory & Prize Distribution', description: 'Announcement of winners, Certificates & rewards, Closing remarks & group photos' }
                ]
            }
        ]
    },
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
        quiz: {
            title: "TechSprint Fun Trivia 🧠",
            description: "Test your knowledge about the event and our organizers! Top the leaderboard to win swag!",
            questions: [
                {
                    question: "What is the main goal of TechSprint 2025?",
                    options: ["To run a marathon", "To build innovative solutions using Google Tech", "To play video games", "To watch movies"],
                    correctAnswer: "To build innovative solutions using Google Tech"
                },
                {
                    question: "Who is the organizer with 14x Google Cloud Certifications but jokingly 'Unemployed'?",
                    options: ["Sundar Pichai", "Dhiraj Chaudhari", "Elon Musk", "Sam Altman"],
                    correctAnswer: "Dhiraj Chaudhari"
                },
                {
                    question: "Which of these is NOT a judging criterion?",
                    options: ["Innovation", "Technical Implementation", "Color of your T-shirt", "Presentation"],
                    correctAnswer: "Color of your T-shirt"
                },
                {
                    question: "Where is the Grand Finale held?",
                    options: ["Online", "SJCEM Campus", "Google HQ", "Mars"],
                    correctAnswer: "SJCEM Campus"
                },
                {
                    question: "What is the team size limit?",
                    options: ["1 Member", "2-4 Members", "10 Members", "Unlimited"],
                    correctAnswer: "2-4 Members"
                }
            ]
        },
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
                                image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
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
                                image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
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
                                image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
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
        gallery: [
            "/images/techsprint/kickoff/IMG_7930.JPG",
            "/images/techsprint/kickoff/IMG_7931.JPG",
            "/images/techsprint/kickoff/IMG_7932.JPG",
            "/images/techsprint/kickoff/IMG_7933.JPG",
            "/images/techsprint/kickoff/IMG_7934.JPG",
            "/images/techsprint/kickoff/IMG_7935.JPG",
            "/images/techsprint/kickoff/IMG_7936.JPG",
            "/images/techsprint/kickoff/IMG_7937.JPG",
            "/images/techsprint/kickoff/IMG_7938.JPG",
            "/images/techsprint/kickoff/IMG_7939.JPG",
            "/images/techsprint/kickoff/IMG_7940.JPG",
            "/images/techsprint/kickoff/IMG_7941.JPG",
            "/images/techsprint/kickoff/IMG_7942.JPG",
            "/images/techsprint/kickoff/IMG_7943.JPG",
            "/images/techsprint/kickoff/IMG_7944.JPG",
            "/images/techsprint/kickoff/IMG_7946.JPG",
            "/images/techsprint/kickoff/IMG_7947.JPG",
            "/images/techsprint/kickoff/IMG_7948.JPG",
            "/images/techsprint/kickoff/IMG_7949.JPG",
            "/images/techsprint/kickoff/IMG_7950.JPG",
            "/images/techsprint/kickoff/IMG_7951.JPG",
            "/images/techsprint/kickoff/IMG_7952.JPG",
            "/images/techsprint/kickoff/IMG_7953.JPG",
            "/images/techsprint/kickoff/IMG_7954.JPG",
            "/images/techsprint/kickoff/IMG_7955.JPG",
            "/images/techsprint/kickoff/IMG_7956.JPG",
            "/images/techsprint/kickoff/IMG_7957.JPG",
            "/images/techsprint/kickoff/IMG_7958.JPG",
            "/images/techsprint/kickoff/IMG_7959.JPG",
            "/images/techsprint/kickoff/IMG_7960.JPG",
            "/images/techsprint/kickoff/IMG_7961.JPG",
            "/images/techsprint/kickoff/IMG_7962.JPG",
            "/images/techsprint/kickoff/IMG_7963.JPG",
            "/images/techsprint/kickoff/IMG_7964.JPG",
            "/images/techsprint/kickoff/IMG_7965.JPG",
            "/images/techsprint/kickoff/IMG_7966.JPG",
            "/images/techsprint/kickoff/IMG_7967.JPG",
            "/images/techsprint/kickoff/IMG_7968.JPG",
            "/images/techsprint/kickoff/IMG_7969.JPG",
            "/images/techsprint/kickoff/IMG_7970.JPG",
            "/images/techsprint/kickoff/IMG_7975.JPG",
            "/images/techsprint/kickoff/IMG_7976.JPG",
            "/images/techsprint/kickoff/IMG_7977.JPG",
            "/images/techsprint/kickoff/IMG_7978.JPG",
            "/images/techsprint/kickoff/IMG_7979.JPG",
            "/images/techsprint/kickoff/IMG_7982.JPG",
            "/images/techsprint/kickoff/IMG_7983.JPG",
            "/images/techsprint/kickoff/IMG_7984.JPG",
            "/images/techsprint/kickoff/IMG_7985.JPG",
            "/images/techsprint/kickoff/IMG_7986.JPG",
            "/images/techsprint/kickoff/IMG_7987.JPG",
            "/images/techsprint/kickoff/IMG_7988.JPG",
            "/images/techsprint/kickoff/IMG_7989.JPG",
            "/images/techsprint/kickoff/IMG_7990.JPG",
            "/images/techsprint/kickoff/IMG_7991.JPG",
            "/images/techsprint/kickoff/IMG_7992.JPG",
            "/images/techsprint/kickoff/IMG_7993.JPG",
            "/images/techsprint/kickoff/IMG_7995.JPG",
            "/images/techsprint/kickoff/IMG_7996.JPG",
            "/images/techsprint/kickoff/IMG_7997.JPG",
            "/images/techsprint/kickoff/IMG_7998.JPG",
            "/images/techsprint/kickoff/IMG_7999.JPG",
            "/images/techsprint/kickoff/IMG_8000.JPG",
            "/images/techsprint/kickoff/IMG_8001.JPG",
            "/images/techsprint/kickoff/IMG_8002.JPG",
            "/images/techsprint/kickoff/IMG_8003.JPG",
            "/images/techsprint/kickoff/IMG_8004.JPG",
            "/images/techsprint/kickoff/IMG_8006.JPG",
            "/images/techsprint/kickoff/IMG_8007.JPG",
            "/images/techsprint/kickoff/IMG_8008.JPG",
            "/images/techsprint/kickoff/IMG_8009.JPG",
            "/images/techsprint/kickoff/IMG_8010.JPG",
            "/images/techsprint/kickoff/IMG_8011.JPG",
            "/images/techsprint/kickoff/IMG_8012.JPG",
            "/images/techsprint/kickoff/IMG_8013.JPG",
            "/images/techsprint/kickoff/IMG_8014.JPG",
            "/images/techsprint/kickoff/IMG_8015.JPG",
            "/images/techsprint/kickoff/IMG_8016.JPG",
            "/images/techsprint/kickoff/IMG_8017.JPG",
            "/images/techsprint/kickoff/IMG_8018.JPG",
            "/images/techsprint/kickoff/IMG_8019.JPG",
            "/images/techsprint/kickoff/IMG_8020.JPG",
            "/images/techsprint/kickoff/IMG_8021.JPG",
            "/images/techsprint/kickoff/IMG_8022.JPG",
            "/images/techsprint/kickoff/IMG_8023.JPG",
            "/images/techsprint/kickoff/IMG_8024.JPG",
            "/images/techsprint/kickoff/IMG_8025.JPG",
            "/images/techsprint/kickoff/IMG_8026.JPG",
            "/images/techsprint/kickoff/IMG_8027.JPG",
            "/images/techsprint/kickoff/IMG_8028.JPG",
            "/images/techsprint/kickoff/IMG_8029.JPG",
            "/images/techsprint/kickoff/IMG_8030.JPG",
            "/images/techsprint/kickoff/IMG_8031.JPG",
            "/images/techsprint/kickoff/IMG_8032.JPG",
            "/images/techsprint/kickoff/IMG_8033.JPG",
            "/images/techsprint/kickoff/IMG_8034.JPG",
            "/images/techsprint/kickoff/IMG_8035.JPG",
            "/images/techsprint/kickoff/IMG_8036.JPG",
            "/images/techsprint/kickoff/IMG_8037.JPG",
            "/images/techsprint/kickoff/IMG_8038.JPG",
            "/images/techsprint/kickoff/IMG_8039.JPG",
            "/images/techsprint/kickoff/IMG_8040.JPG",
            "/images/techsprint/kickoff/IMG_8041.JPG",
            "/images/techsprint/kickoff/IMG_8042.JPG",
            "/images/techsprint/kickoff/IMG_8043.JPG",
            "/images/techsprint/kickoff/IMG_8044.JPG",
            "/images/techsprint/kickoff/IMG_8045.JPG",
            "/images/techsprint/kickoff/IMG_8046.JPG",
            "/images/techsprint/kickoff/IMG_8047.JPG",
            "/images/techsprint/kickoff/IMG_8048.JPG",
            "/images/techsprint/kickoff/IMG_8049.JPG",
            "/images/techsprint/kickoff/IMG_8050.JPG",
            "/images/techsprint/kickoff/IMG_8051.JPG",
            "/images/techsprint/kickoff/IMG_8052.JPG",
            "/images/techsprint/kickoff/IMG_8053.JPG",
            "/images/techsprint/kickoff/IMG_8054.JPG",
            "/images/techsprint/kickoff/IMG_8055.JPG",
            "/images/techsprint/kickoff/IMG_8056.JPG",
            "/images/techsprint/kickoff/IMG_8057.JPG",
            "/images/techsprint/kickoff/IMG_8058.JPG",
            "/images/techsprint/kickoff/IMG_8059.JPG",
            "/images/techsprint/kickoff/IMG_8060.JPG",
            "/images/techsprint/kickoff/IMG_8061.JPG",
            "/images/techsprint/kickoff/IMG_8062.JPG",
            "/images/techsprint/kickoff/IMG_8063.JPG",
            "/images/techsprint/kickoff/IMG_8064.JPG",
            "/images/techsprint/kickoff/IMG_8065.JPG",
            "/images/techsprint/kickoff/IMG_8066.JPG",
            "/images/techsprint/kickoff/IMG_8067.JPG",
            "/images/techsprint/kickoff/IMG_8068.JPG",
            "/images/techsprint/kickoff/IMG_8069.JPG",
            "/images/techsprint/kickoff/IMG_8070.JPG",
            "/images/techsprint/kickoff/IMG_8071.JPG",
            "/images/techsprint/kickoff/IMG_8074.JPG",
            "/images/techsprint/kickoff/IMG_8075.JPG",
            "/images/techsprint/kickoff/IMG_8076.JPG",
            "/images/techsprint/kickoff/IMG_8077.JPG",
            "/images/techsprint/kickoff/IMG_8078.JPG",
            "/images/techsprint/kickoff/IMG_8079.JPG",
            "/images/techsprint/kickoff/IMG_8080.JPG",
            "/images/techsprint/kickoff/IMG_8081.JPG",
            "/images/techsprint/kickoff/IMG_8082.JPG",
            "/images/techsprint/kickoff/IMG_8083.JPG",
            "/images/techsprint/kickoff/IMG_8084.JPG",
            "/images/techsprint/kickoff/IMG_8085.JPG",
            "/images/techsprint/kickoff/IMG_8086.JPG",
            "/images/techsprint/kickoff/IMG_8087.JPG",
            "/images/techsprint/kickoff/IMG_8088.JPG",
            "/images/techsprint/kickoff/IMG_8089.JPG",
            "/images/techsprint/kickoff/IMG_8090.JPG",
            "/images/techsprint/kickoff/IMG_8092.JPG",
            "/images/techsprint/kickoff/IMG_8093.JPG",
            "/images/techsprint/kickoff/IMG_8094.JPG",
            "/images/techsprint/kickoff/IMG_8095.JPG",
            "/images/techsprint/kickoff/IMG_8096.JPG",
            "/images/techsprint/kickoff/IMG_8098.JPG",
            "/images/techsprint/kickoff/IMG_8099.JPG",
            "/images/techsprint/kickoff/IMG_8100.JPG",
            "/images/techsprint/kickoff/IMG_8101.JPG",
            "/images/techsprint/kickoff/IMG_8102.JPG",
            "/images/techsprint/kickoff/IMG_8103.JPG",
            "/images/techsprint/kickoff/IMG_8104.JPG",
            "/images/techsprint/kickoff/IMG_8105.JPG",
            "/images/techsprint/kickoff/IMG_8106.JPG",
            "/images/techsprint/kickoff/IMG_8107.JPG",
            "/images/techsprint/kickoff/IMG_8108.JPG",
            "/images/techsprint/kickoff/IMG_8109.JPG",
            "/images/techsprint/kickoff/IMG_8112.JPG",
            "/images/techsprint/kickoff/IMG_8113.JPG",
            "/images/techsprint/kickoff/IMG_8114.JPG",
            "/images/techsprint/kickoff/IMG_8115.JPG",
            "/images/techsprint/kickoff/IMG_8116.JPG",
            "/images/techsprint/kickoff/IMG_8117.JPG",
            "/images/techsprint/kickoff/IMG_8118.JPG",
            "/images/techsprint/kickoff/IMG_8119.JPG",
            "/images/techsprint/kickoff/IMG_8120.JPG",
            "/images/techsprint/kickoff/IMG_8121.JPG",
            "/images/techsprint/kickoff/IMG_8122.JPG",
            "/images/techsprint/kickoff/IMG_8123.JPG",
            "/images/techsprint/kickoff/IMG_8124.JPG",
            "/images/techsprint/kickoff/IMG_8125.JPG",
            "/images/techsprint/kickoff/IMG_8126.JPG",
            "/images/techsprint/kickoff/IMG_8127.JPG",
            "/images/techsprint/kickoff/IMG_8128.JPG",
            "/images/techsprint/kickoff/IMG_8129.JPG",
            "/images/techsprint/kickoff/IMG_8130.JPG",
            "/images/techsprint/kickoff/IMG_8131.JPG",
            "/images/techsprint/kickoff/IMG_8132.JPG",
            "/images/techsprint/kickoff/IMG_8133.JPG",
            "/images/techsprint/kickoff/IMG_8134.JPG",
            "/images/techsprint/kickoff/IMG_8135.JPG",
            "/images/techsprint/kickoff/IMG_8136.JPG",
            "/images/techsprint/kickoff/IMG_8137.JPG",
            "/images/techsprint/kickoff/IMG_8138.JPG",
            "/images/techsprint/kickoff/IMG_8139.JPG",
            "/images/techsprint/kickoff/IMG_8140.JPG",
            "/images/techsprint/kickoff/IMG_8141.JPG",
            "/images/techsprint/kickoff/IMG_8142.JPG",
            "/images/techsprint/kickoff/IMG_8143.JPG",
            "/images/techsprint/kickoff/IMG_8144.JPG",
            "/images/techsprint/kickoff/IMG_8145.JPG",
            "/images/techsprint/kickoff/IMG_8150.JPG",
            "/images/techsprint/kickoff/IMG_8151.JPG",
            "/images/techsprint/kickoff/IMG_8152.JPG",
            "/images/techsprint/kickoff/IMG_8153.JPG",
            "/images/techsprint/kickoff/IMG_8154.JPG",
            "/images/techsprint/kickoff/IMG_8155.JPG",
            "/images/techsprint/kickoff/IMG_8156.JPG",
            "/images/techsprint/kickoff/IMG_8157.JPG",
            "/images/techsprint/kickoff/IMG_8158.JPG",
            "/images/techsprint/kickoff/IMG_8159.JPG",
            "/images/techsprint/kickoff/IMG_8160.JPG",
            "/images/techsprint/kickoff/IMG_8163.JPG",
            "/images/techsprint/kickoff/IMG_8164.JPG",
            "/images/techsprint/kickoff/IMG_8165.JPG",
            "/images/techsprint/kickoff/IMG_8166.JPG",
            "/images/techsprint/kickoff/IMG_8167.JPG",
            "/images/techsprint/kickoff/IMG_8168.JPG",
            "/images/techsprint/kickoff/IMG_8169.JPG",
            "/images/techsprint/kickoff/IMG_8170.JPG",
            "/images/techsprint/kickoff/IMG_8171.JPG",
            "/images/techsprint/kickoff/IMG_8172.JPG",
            "/images/techsprint/kickoff/IMG_8173.JPG",
            "/images/techsprint/kickoff/IMG_8175.JPG",
            "/images/techsprint/kickoff/IMG_8176.JPG",
            "/images/techsprint/kickoff/IMG_8177.JPG",
            "/images/techsprint/kickoff/IMG_8178.JPG",
            "/images/techsprint/kickoff/IMG_8179.JPG",
            "/images/techsprint/kickoff/IMG_8180.JPG",
        ],
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
            status: 'announced',
            top10: [
                { rank: 1, team: 'the Debuggers', score: 9 },
                { rank: 2, team: 'DEV_AXIS', score: 8 },
                { rank: 3, team: 'Dev_Fusion', score: 7.5 },
                { rank: 4, team: 'Dorara', score: 7.5 },
                { rank: 5, team: 'syntax', score: 7 },
                { rank: 6, team: 'void slayers', score: 7 },
                { rank: 7, team: 'Dev_With_Innovation', score: 7 },
                { rank: 8, team: 'Synapse Sages', score: 6 },
                { rank: 9, team: 'Tech Pirates', score: 6 },
                { rank: 10, team: 'stranger strings- gemini api', score: 4 }
            ],
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
        id: 3,
        date: '20 Dec 2025',
        status: 'ended',
        type: 'Session',
        title: 'TechSprint 2025 | Ask Me Anything & Hackathon Guidance Session',
        description: 'Join us for an important online guidance & AMA session as part of TechSprint 2025. Gain clarity on submissions, evaluation expectations, and execution strategy.',
        codelab: {
            title: 'Agentic App with Gemini 3 ADK',
            description: 'Follow this code lab to learn about Agentic App with Gemini 3 ADK. Follow this step-by-step codelab to build and deploy your multi-agent AI system.',
            link: 'https://codelabs.developers.google.com/agentic-app-gemini-3-adk#0',
            isExternal: true,
            buttonText: 'Start Code Lab 🚀'
        },
        slides: 'https://docs.google.com/presentation/d/1rpJzd1TGK5SiBR88YJPH8A-1mGBg8rUvtzdjW9Dcgc4/edit?usp=sharing',
        quiz: {
            title: "TechSprint Fun Trivia 🧠",
            description: "Test your knowledge about the event and our organizers! Top the leaderboard to win swag!",
            questions: [
                {
                    question: "What is the main goal of TechSprint 2025?",
                    options: ["To run a marathon", "To build innovative solutions using Google Tech", "To play video games", "To watch movies"],
                    correctAnswer: "To build innovative solutions using Google Tech"
                },
                {
                    question: "Who is the organizer with 14x Google Cloud Certifications but jokingly 'Unemployed'?",
                    options: ["Sundar Pichai", "Dhiraj Chaudhari", "Elon Musk", "Sam Altman"],
                    correctAnswer: "Dhiraj Chaudhari"
                },
                {
                    question: "Which of these is NOT a judging criterion?",
                    options: ["Innovation", "Technical Implementation", "Color of your T-shirt", "Presentation"],
                    correctAnswer: "Color of your T-shirt"
                },
                {
                    question: "Where is the Grand Finale be held?",
                    options: ["Online", "SJCEM Campus", "Google HQ", "Mars"],
                    correctAnswer: "SJCEM Campus"
                },
                {
                    question: "What is the team size limit?",
                    options: ["1 Member", "2-4 Members", "10 Members", "Unlimited"],
                    correctAnswer: "2-4 Members"
                }
            ]
        },
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
                link: 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-techsprint-2025-ask-me-anything-amp-hackathon-guidance-session/',
                style: 'primary'
            },
            {
                text: 'Join Session (Meet)',
                link: 'https://meet.google.com/ghv-pdks-zsj?authuser=0&hs=122&ijlm=1765555890226',
                style: 'outline'
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
                        image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
                        linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/'
                    }
                ]
            },
            {
                time: 'Self-Paced',
                title: 'Agentic App with Gemini 3 ADK',
                description: 'Follow this code lab to learn about Agentic App with Gemini 3 ADK. Follow this step-by-step codelab to build and deploy your multi-agent AI system.',
                link: 'https://codelabs.developers.google.com/agentic-app-gemini-3-adk#0',
                linkText: 'Start Code Lab'
            }
        ]
    },
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
