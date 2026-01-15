import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import ImageWithLoader from './ImageWithLoader';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import './Organizers.css';
import './Team.css';

const Team = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        window.scrollTo(0, 0);
        if (selectedOrganizer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedOrganizer]);

    const facultyAdvisor = [
        {
            name: 'Dr. Sunny Sall',
            role: 'Faculty Advisor & HOD Computer Engineering',
            image: 'https://i.ibb.co/RTNCNWTD/file-2.jpg',
            bio: 'Head of Department, Computer Engineering. Guiding the GDG on Campus chapter to excellence.',
            linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in',
            googleScholar: 'https://scholar.google.com/citations?user=DV2d_v8AAAAJ&hl=en'
        }
    ];

    const coreTeam = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
            twitter: 'https://twitter.com/DhirajC39511965',
            linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/',
            github: 'https://github.com/dhirajchaudhari20',
            instagram: 'https://www.instagram.com/the_alpha_engineer/',
            bio: 'Passionate about building communities and empowering students through technology.'
        },
        {
            name: 'Aayush Mahesh Bari',
            role: 'Co-Organizer',
            image: 'https://i.ibb.co/qFpsP4MF/Profile-Pic.jpg',
            linkedin: 'https://www.linkedin.com/in/aayush-bari/',
            github: 'https://github.com/Aayush0735',
            instagram: 'https://www.instagram.com/aayush.bari.585',
            twitter: 'https://x.com/aayush_bari01',
            bio: 'I work at the intersection of Agentic AI, TensorFlow, and RAG, building solutions that are scalable, performant, and meaningful. I enjoy sharing knowledge through workshops, events, and mentorship, helping students grow in emerging tech. As GDG Co-Organizer, I foster community innovation and hands-on learning.'
        }
    ];

    const departmentLeads = [
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            linkedin: 'https://www.linkedin.com/in/abhijeetrogye/'
        },
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/',
            github: 'https://github.com/Sumedh1102',
            instagram: 'https://www.instagram.com/sumedh1102'
        },
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg',
            linkedin: 'https://www.linkedin.com/in/rupesh-nandale-287678277/',
            github: 'https://github.com/rupesh108-iebe',
            twitter: 'https://x.com/Anvayu108'
        },
        {
            name: 'Sahas Santosh Bochare',
            role: 'Community & Marketing Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg',
            linkedin: 'https://www.linkedin.com/in/sahasbochare',
            bio: 'Leading with passion | Growing with community 💖'
        },
        {
            name: 'Manasvi Kadu',
            role: 'Social Media Head',
            image: 'https://i.ibb.co/3yk1pRCB/IMG-20251206-153035.jpg',
            linkedin: 'https://www.linkedin.com/in/manasvi-kadu-8729b3286',
            github: 'https://github.com/AlgoWhizMk',
            twitter: 'https://x.com/manasvi52370?t=HBTufU3UyjMkyQP0ZwmUbA&s=09',
            instagram: 'https://www.instagram.com/_manasv.iii?igsh=MWl2MDA0eGk1NzgxOA==',
            bio: 'Bringing clean design, creative ideas, and an eye for trends to elevate GDG on Campus SJCEM’s social media identity.'
        },
        {
            name: 'Sejal Rai',
            role: 'PR & Outreach Lead',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQE0pqh_npE7bQ/profile-displayphoto-scale_200_200/B4EZlln7rdKQAY-/0/1758346591904?e=1766620800&v=beta&t=Z8phlcanXrqhmSGB_Q7PPxypHkc12KSHRogFe9aD4k0',
            linkedin: 'https://www.linkedin.com/in/sejal-rai-18334a321/'
        },
        {
            name: 'Aleena Maria Joji',
            role: 'Content Lead',
            image: 'https://i.ibb.co/ycV0QkCQ/1000153477.png',
            linkedin: 'https://www.linkedin.com/in/aleenajoji',
            instagram: 'https://www.instagram.com/_aleena21_?igsh=MXZhazlpMzdzYW9vdw=='
        },
        {
            name: 'Prathamesh Jakkula',
            role: 'AIML/DSA Lead',
            image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
            linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/',
            github: 'https://github.com/Prathamesh01110',
            twitter: 'https://x.com/Prathamesh01_',
            bio: "Started as a participant, became a finalist, then a winner; now I mentor and judge hackathons, with still a long way to go. I enjoy working with Google’s AI tools ,Building agents, and practical ML projects while helping others learn faster."
        }
    ];

    const techTeam = [
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/',
            github: 'https://github.com/Sumedh1102',
            instagram: 'https://www.instagram.com/sumedh1102'
        },
        {
            name: 'Prathamesh Jakkula',
            role: 'AIML/DSA Lead',
            image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
            linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/',
            github: 'https://github.com/Prathamesh01110',
            twitter: 'https://x.com/Prathamesh01_',
            bio: "Started as a participant, became a finalist, then a winner; now I mentor and judge hackathons, with still a long way to go. I enjoy working with Google’s AI tools ,Building agents, and practical ML projects while helping others learn faster."
        },
        {
            name: 'Sairaj Ganpat Khade',
            role: 'Tech Member',
            image: 'https://i.ibb.co/BxrR0JZ/1000036970.jpg',
            linkedin: 'https://www.linkedin.com/in/sairaj-khade-95b9b6373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://github.com/Sairajgit25'
        },
        {
            name: 'Ramesh Kheemaram Choudhary',
            role: 'Technical member',
            image: 'https://i.ibb.co/dwB15YnD/my-pic.jpg',
            linkedin: 'https://www.linkedin.com/in/ramesh-choudhary-397025291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://github.com/RameshKChoudhary',
            instagram: 'https://www.instagram.com/ramesh__07__05?igsh=Y3JlYTFveWJkODNo',
            bio: 'Ramesh Choudhary is a Frontend Developer and AIML Engineering student skilled in building responsive and user-friendly web applications. With strong expertise in React.js, JavaScript, Python, and API integration, he focuses on creating practical and scalable digital solutions.'
        },
        {
            name: 'Rutuja Ramesh Gharat',
            role: 'Technical Writer',
            image: 'https://i.ibb.co/WNvns43P/IMG-20251013-WA0039.jpg',
            linkedin: 'https://www.linkedin.com/in/rutuja-gharat-6b8375372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://github.com/RutujaGharat-11',
            instagram: 'https://www.instagram.com/rutujagharat_11?igsh=MTMzdHZ3dXpwajFvOA=='
        },
        { name: 'Shashikant Rajput', role: 'Web Development Lead' },
        { name: 'Prashant Yadav', role: 'App Lead' },
        { name: 'Hitanshu Vaidya', role: 'Member' },
        { name: 'Riya Umesh Singh', role: 'Member' },
        { name: 'Anushri Amul Sane', role: 'Member' },
        {
            name: 'Saiyed Furquanahmed Barkatali',
            role: 'Technical Member',
            image: 'https://ci3.googleusercontent.com/mail-img-att/AGAZnRqOXDi3oqKgNmRplPsyABU-eUApOuyxjQKwVAET_nBDYLj7RJW8TI-_T0uwnYJ4ZdiqdL4_ZnW1SoYIAX4L9PQKDo8rj-pGIZ7kPq76Py-dy_clZ2vNiCB285M4xcDyaDgoqK70eMwqV5FH_DCWmXcOWjvH016JS8SO52IybaYiFAK5HQhxwFWlZ91Y-k96-iTo37psZYR_-6gs77PDUO47NVTLoDNtNjFzustfk7QKFJ7WJRUrPRQrSQ4EPLTJH-BKrPuPgUbTb3sDvGSllsSPddfcSkmXwVV3PkPuwKUL5h0NvoZ2_hdVuR9U9d9Q0EE2eHwigC0iqgGKMWYmjY8Q5YhHU1l6sLYX346rF0GnBWrLsNM2xeNNAy0LUyqqCDWbwZENIzeGatusCpKioVNZE-82YUkRiC3Ip_KjMRuxQ4rR_n8pepis6g9ZBlWXdgHT8gTBBzK5hx99C5wQw9SfIH2x7b_ITeIOzmmlN1nRugWDA4JtlJ_jJcH3Aauo2kOo_URb-o1Vp0US9gTOAm5lfxm6fogXvN4AeLiPDy5XF_cMRtg1-bq5Jv6Q9EcXFhmcQSSfDHBYgRLRlRykYshSy7CNPqtpn-_wKirZPvCu7pw8hwrrfydVDXMzdR2a9RnfdJ0Qf9Sixti6dNPG7NJm4XQp0IQCUCc0PLWFlKyB69caJxR98-hiJbSUBj8e35xfZwboen0dN9p0ZA48_8aLos0yPf6BGk_Cjz-8o6VcrMGSaSmmmJguYUkr5byNewQfVblxJihwAh-q2CMmgfEtGr78ST1tH5gqW-fM6H4lgtuKCgjlsbVkXO0C5V0SAK6OP5ltki7HrNmzc4vJWZxchggKi1VXdRxCiolLYzHO2gCMwDITMJqMOi_HTO6Pxm3g-pypND7Ti0sruRxX1mglPXL3rwaJNg6NrBnvwNdRz9xErc_5Jn-1Twpg2sTPvAsrmrwzSLsvf-4JSQSsf-w7P1bpkSeAhg5578wqRh7SuAhKroQbGs5STgx-Bboe0Gk3czWeFti2tVEytYQZEqfFmLTtlNnkPwCB-pYTxut-YulzGQ=s0-l75-ft',
            linkedin: 'https://www.linkedin.com/in/furquan-s-9331372a6',
            github: 'https://github.com/fabs7869'
        },
        { name: 'Sakshi Jaywant Mhatre', role: 'Volunteer' },
        { name: 'Satyam R. Tiwari', role: 'Volunteer', image: 'https://i.ibb.co/v6MmDcds/1000121746.jpg' },
        {
            name: 'Saish Mekal',
            role: 'Web Development Lead',
            image: 'https://i.ibb.co/B7022qg/IMG-0369.jpg',
            linkedin: 'https://www.linkedin.com/in/saish-mekal-64499b253',
            github: 'https://github.com/saishmekal',
            instagram: 'https://www.instagram.com/saish_mekal',
            twitter: 'https://x.com/saishmekal',
            bio: 'Full-stack Developer passionate about learning, building, and contributing to the developer community. Excited to grow and collaborate with GDG.'
        },
        {
            name: 'Rudra Jaikar',
            role: 'Tech Volunteer',
            image: 'https://i.ibb.co/gZ2YvP3y/1000036261.jpg',
            linkedin: 'https://www.linkedin.com/in/rudra-jaikar-0b3956369',
            github: 'https://github.com/ThatWasShiva'
        },
        {
            name: 'Satyam Mahto',
            role: 'Technical Member',
            image: 'https://i.ibb.co/8LpnHcnf/1000078158.jpg',
            linkedin: 'https://www.linkedin.com/in/satyam-mahto-8862b7366',
            github: 'https://github.com/satyammahto',
            instagram: 'https://www.instagram.com/satyam_mahto.06',
            twitter: 'https://x.com/SatyamMaht77813',
            bio: 'Computer science SE Engineering student interested in software development and AI'
        }
    ];

    const eventsTeam = [
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg',
            linkedin: 'https://www.linkedin.com/in/rupesh-nandale-287678277/',
            github: 'https://github.com/rupesh108-iebe',
            twitter: 'https://x.com/Anvayu108'
        },
        {
            name: 'Darshan Repale',
            role: 'Events and Operations Department',
            image: 'https://i.ibb.co/Q7B8LByd/1000227605.jpg',
            linkedin: 'https://www.linkedin.com/in/darshan-repale-89b1bb321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://github.com/DarshanR1234'
        },
        { name: 'Lokesh Rane', role: 'Outreach Coordinator' },
        { name: 'Sarth Gawad', role: 'Event Manager' },

        {
            name: 'Mihir Kishor Pimple',
            role: 'Logistic Manager',
            image: 'https://i.ibb.co/0jPxP35b/DSC02319.jpg',
            linkedin: 'https://www.linkedin.com/in/mihir-pimple-378338223',
            instagram: 'https://www.instagram.com/mihirpimple',
            bio: 'Tech enthusiast with hands-on logistics management experience, building smart projects and supporting GDG SJCEM events.'
        },
        { name: 'Neha Vijay Parab', role: 'Event Coordinator' },
        { name: 'Vighnesh Rane', role: 'Member' },
        {
            name: 'Neej Patel',
            role: 'Event Member',
            image: 'https://i.ibb.co/BKqSNWjv/IMG-20250111-WA0007.jpg',
            linkedin: 'https://www.linkedin.com/in/neej-patel-968404260',
            instagram: 'https://www.instagram.com/neej_p223'
        },
        { name: 'Sahil Dongre', role: 'Volunteer' },
        { name: 'Kamlesh S. Choudhary', role: 'Volunteer' },
        { name: 'Rajendra Singh Rajput', role: 'Volunteer' },
        { name: 'Tejas D. Bhavthankar', role: 'Volunteer' },
        { name: 'Jowin Mascarenhas', role: 'Volunteer' },
        {
            name: 'Siddhant Koli',
            role: 'Event Manager',
            image: 'https://i.ibb.co/vC45k4Rv/Whats-App-Image-2025-12-07-at-19-41-31-beac7d3a.jpg',
            linkedin: 'https://www.linkedin.com/in/siddhant-koli-385502374/',
            github: 'https://github.com/SiddhantKoli',
            instagram: 'http://instagram.com/sidye1/'
        },
        {
            name: 'Smital Raut',
            role: 'Volunteer',
            image: 'https://i.ibb.co/vfvR08h/IMG-20241022-162511.jpg',
            github: 'https://github.com/smitatraut841-sketch',
            instagram: 'https://www.instagram.com/_.smitall._'
        },
        { name: 'Shivprasad S. Umbare', role: 'Volunteer' },
        {
            name: 'Vidhi Naresh Jain',
            role: 'Volunteer',
            image: 'https://i.ibb.co/BH7Vc2rb/1000012426.jpg'
        },
        {
            name: 'Upasana Meher',
            role: 'Volunteer',
            image: 'https://i.ibb.co/Vpg73nmX/1000113270.jpg',
            linkedin: 'https://www.linkedin.com/in/upasana-meher-495481397',
            instagram: 'https://www.instagram.com/upasana_meher'
        },
        {
            name: 'Jyoti Awasthi',
            role: 'Volunteer',
            image: 'https://i.ibb.co/2Yh5bzDr/IMG-20251207-WA0005.jpg',
            linkedin: 'https://www.linkedin.com/in/jyoti-awasthi-22b381326',
            instagram: 'https://www.instagram.com/jyoti_awasthi12',
            bio: 'Simple yet effective.'
        }
    ];

    const communityTeam = [
        {
            name: 'Sahas Santosh Bochare',
            role: 'Community & Marketing Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg',
            linkedin: 'https://www.linkedin.com/in/sahasbochare',
            bio: 'Leading with passion | Growing with community 💖'
        },
        {
            name: 'Sejal Rai',
            role: 'PR & Outreach Lead',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQE0pqh_npE7bQ/profile-displayphoto-scale_200_200/B4EZlln7rdKQAY-/0/1758346591904?e=1766620800&v=beta&t=Z8phlcanXrqhmSGB_Q7PPxypHkc12KSHRogFe9aD4k0',
            linkedin: 'https://www.linkedin.com/in/sejal-rai-18334a321/'
        },

        {
            name: 'Tanaya Mohan Bagade',
            role: 'Partnership Manager',
            image: 'https://i.ibb.co/75KrSkd/IMG-20251206-WA0008.jpg',
            linkedin: 'https://www.linkedin.com/in/tanaya-bagade-11b497330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://github.com/tanayabagade53-spec',
            instagram: 'https://www.instagram.com/_tanayabagade?igsh=Nm93Y3p6OTVhYjdy',
            bio: "Hey there! I’m a Partnership Manager who loves working with people and building connections that help our tech community grow. Whether it’s collaborating with organizations or supporting student initiatives, I’m always up for creating partnerships that make a difference."
        },
        {
            name: 'Pratishtha Upadhyay',
            role: 'Community and marketing member',
            image: 'https://i.ibb.co/GjQ7LKr/1000108151.jpg',
            linkedin: 'https://www.linkedin.com/in/pratishtha-upadhyay-ba42b4392?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            instagram: 'https://www.instagram.com/disco_potato___?igsh=NDF4czFhMHpmNHFs',
            bio: 'A second-year student who loves learning new tech skills. Excited to grow, collaborate, and explore opportunities through GDG.'
        },
        {
            name: 'Vaishnavi H Khandagale',
            role: 'Community and Marketing member',
            image: 'https://i.ibb.co/vvxSHbtD/1000128292.webp',
            linkedin: 'https://www.linkedin.com/in/vaishnavi-khandagale-519203371?utm_source=share_via&utm_content=profile&utm_medium=member_android'
        },
        {
            name: 'Sadaf Shakeel Asar',
            role: 'Community Coordinator',
            image: 'https://i.ibb.co/7d14tgDQ/1000074178.png',
            linkedin: 'https://www.linkedin.com/in/sadaf-asar-68093a328'
        },
        { name: 'Vaibhav Somanna', role: 'Member' },
        {
            name: 'Saanj Bari',
            role: 'Community Member (PR)',
            image: 'https://i.ibb.co/DDH1ySwy/28a1e745-83f8-425a-bfa9-aca5f0610c84-1-all-3220.jpg',
            linkedin: 'https://www.linkedin.com/in/saanj-bari-59a2b1315',
            bio: 'PR community member at GDG, committed to promoting events, engaging developers, and supporting a vibrant tech community.'
        },

        {
            name: 'Prachi Vishwakarma',
            role: 'Community Member',
            image: 'https://i.ibb.co/mVtLsDYr/IMG-20241130-WA0009.jpg',
            linkedin: 'https://www.linkedin.com/in/prachi-vishwakarma-b1778b30b',
            instagram: 'https://www.instagram.com/prachi_artverse',
            bio: 'A creative thinker who values expression, teamwork, and community involvement.'
        },
        { name: 'S. Madhav', role: 'Volunteer' },
        { name: 'Devyani Jadhav', role: 'Volunteer' },
        {
            name: 'Rupali Bharat Kashid',
            role: 'Community Volunteer',
            image: 'https://i.ibb.co/4gWBcGmm/1000390606.jpg',
            linkedin: 'https://www.linkedin.com/in/rupali-kashid-41b70a363',
            instagram: 'https://www.instagram.com/rupaliiii_07',
            twitter: 'https://x.com/krupalii_07',
            bio: 'GDG Community Volunteer-Rupali | Exploring technology, teamwork, and real-world innovation.'
        },
        { name: 'Priti Brijnath Vishwakarma', role: 'Volunteer' },
        {
            name: 'Dev Sehgal',
            role: 'Community Volunteer',
            image: 'https://i.ibb.co/HTTvX8JN/1000010196.jpg',
            linkedin: 'https://www.linkedin.com/in/dev-sehgal-913b39391',
            instagram: 'https://www.instagram.com/ft.deev._'
        },
        { name: 'Atharva Mallya', role: 'Volunteer' },
        { name: 'Om Manglure', role: 'Volunteer' }
    ];

    const mediaTeam = [
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            linkedin: 'https://www.linkedin.com/in/abhijeetrogye/'
        },
        {
            name: 'Kushal Mali',
            role: 'Media Member',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQEnJP7XBOHz6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707369848628?e=1766620800&v=beta&t=tjxCvW6Wm9FvWWgvKd3B_rpR-hDgn5qWuui8xi8e6Ps',
            linkedin: 'https://www.linkedin.com/in/kushal-mali-b109b12b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            instagram: 'https://www.instagram.com/kushal9035?igsh=MTUyMWJrZ2I0eXlkOA==',
            bio: "Hi, I'm Kushal Mali, a passionate member of GDG Media. I love exploring new trends, creating engaging content, and connecting with like-minded individuals. Let's collaborate and make a positive impact together! 📱💻"
        },
        {
            name: 'Tanishka Gharat',
            role: 'Volunteer for Media & Design',
            image: 'https://i.ibb.co/RkdPV2tZ/1000109533.jpg',
            linkedin: 'https://linkedin.com/in/tanishka-gharat'
        },
        {
            name: 'Aarchi C. Pimple',
            role: 'Graphic Designer',
            image: 'https://i.ibb.co/spzPSs1P/IMG-20250330-WA0012.jpg',
            linkedin: 'https://www.linkedin.com/in/aarchi-pimple-0a2a0b374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
        },
        {
            name: 'Manasvi Kadu',
            role: 'Social Media Head',
            image: 'https://i.ibb.co/3yk1pRCB/IMG-20251206-153035.jpg',
            linkedin: 'https://www.linkedin.com/in/manasvi-kadu-8729b3286',
            github: 'https://github.com/AlgoWhizMk',
            twitter: 'https://x.com/manasvi52370?t=HBTufU3UyjMkyQP0ZwmUbA&s=09',
            instagram: 'https://www.instagram.com/_manasv.iii?igsh=MWl2MDA0eGk1NzgxOA==',
            bio: 'Bringing clean design, creative ideas, and an eye for trends to elevate GDG on Campus SJCEM’s social media identity.'
        },
        { name: 'Siddhant Kiran Meher', role: 'Graphic Designer', image: 'https://i.ibb.co/Q3gRBMgj/EU2237020.jpg' },
        {
            name: 'Devanshu Pal',
            role: 'Social Media Manager',
            image: 'https://i.ibb.co/dshhfGbv/1000393118.png',
            linkedin: 'https://www.linkedin.com/in/devanshu-pal-84a25632a',
            bio: 'I’m Devanshu, a social media–first content creator. I focus on growing brands through smart visuals, consistent posting, and trending strategies.'
        },
        { name: 'Viraj Tamhanekar', role: 'Member', image: 'https://media.licdn.com/dms/image/v2/D4D03AQHuJOwdR7GHIQ/profile-displayphoto-crop_800_800/B4DZqvjKeRIkAI-/0/1763881823603?e=1766620800&v=beta&t=bpxNqsH4OwnOTszb4C4Gd6hUe2yCYlfFqPZs3E3FZOE' },
        { name: 'Arya Kurup', role: 'Member' },
        { name: 'Prathamesh Dhatavkar', role: 'Member' },
        { name: 'Sarvesh Ambire', role: 'Member' },
        { name: 'Harsh Chaudhari', role: 'Member' },
        {
            name: 'Vidhisha Nitin Sonar',
            role: 'Design Team Member',
            image: 'https://i.ibb.co/ycYNFXq5/My-Pic.jpg',
            linkedin: 'https://www.linkedin.com/in/vidhisha-sonar-ba29b7325',
            instagram: 'https://www.instagram.com/vidhisha._28',
            bio: 'Passionate about the intersection of art and technology. My goal is to make digital products look as good as they work.'
        },
        { name: 'Juee Subhash Patil', role: 'Member' },
        { name: 'Sai Deepak Alim', role: 'Volunteer' },

        {
            name: 'Shivanshu Mishra',
            role: 'Media & Design',
            image: 'https://i.ibb.co/wFxwMdJC/1000083291.jpg',
            linkedin: 'https://www.linkedin.com/in/shivanshu-mishra-740569373',
            github: 'https://github.com/shivanshubeast',
            instagram: 'https://www.instagram.com/shivanshu_beast',
            bio: 'Creative thinker and great brainstormer with ideas out of the box'
        },
        {
            name: 'Parveen Abdul Rahiman Shaikh',
            role: 'Media Volunteer',
            image: 'https://i.ibb.co/9mQWSj5j/1000136066.jpg',
            linkedin: 'https://www.linkedin.com/in/parveen-shaikh-b85753397',
            github: 'https://github.com/Parveen1820',
            instagram: 'https://www.instagram.com/shaikhparveen.20',
            twitter: 'https://x.com/ParveenSha17555',
            bio: 'I’m an active and easy-going person who loves exploring tech and taking on new challenges.'
        },
        {
            name: 'Viren Suresh Soni',
            role: 'Media Volunteer',
            image: 'https://i.ibb.co/WJY531W/1000032268.jpg',
            linkedin: 'https://www.linkedin.com/in/viren-soni-485b5a356',
            github: 'https://github.com/Viren4689',
            instagram: 'https://www.instagram.com/_viren.soni_',
            twitter: 'https://x.com/virensoni4689',
            bio: 'I’m an enthusiastic and calm media volunteer with a strong interest in technology and digital tools.'
        }
    ];

    const contentTeam = [
        {
            name: 'Aleena Maria Joji',
            role: 'Content Lead',
            image: 'https://i.ibb.co/ycV0QkCQ/1000153477.png',
            linkedin: 'https://www.linkedin.com/in/aleenajoji',
            instagram: 'https://www.instagram.com/_aleena21_?igsh=MXZhazlpMzdzYW9vdw=='
        },
        {
            name: 'Rashmi Sharad Chaudhari',
            role: 'Content and Research Team Member',
            image: 'https://i.ibb.co/jP7kQp1n/1000170841.jpg',
            linkedin: 'https://www.linkedin.com/in/rashmi-chaudhari-66105b386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            instagram: 'https://www.instagram.com/rashmii.2006?igsh=ZmE0aXpvY2Y4ZWI3'
        },
        {
            name: 'Rutuja Ramesh Gharat',
            role: 'Technical Writer',
            image: 'https://i.ibb.co/WNvns43P/IMG-20251013-WA0039.jpg',
            linkedin: 'https://www.linkedin.com/in/rutuja-gharat-6b8375372',
            github: 'https://github.com/RutujaGharat-11',
            instagram: 'https://www.instagram.com/rutujagharat_11'
        },
        {
            name: 'Ritika Chaurasiya',
            role: 'Content and Research Member',
            linkedin: 'https://www.linkedin.com/in/ritika-chaurasiya-20231a379',
            instagram: 'https://www.instagram.com/ritika.chaurasiya06',
            bio: 'Second year ECS student.'
        },
        { name: 'Durvesh Suresh Vinherkar', role: 'Content Lead' },
        { name: 'Siddhi Mahendra Akre', role: 'Member' },
        { name: 'Ilf Bhimani', role: 'Volunteer' },
        { name: 'Ayushi Shukla', role: 'Volunteer' },
        { name: 'Nayi Prem Babubhai', role: 'Volunteer' }
    ];

    const judges = [];

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2);
    };

    const isLead = (role) => {
        const r = role.toLowerCase();
        return r.includes('head') || r.includes('lead') || r.includes('manager') || r.includes('co-organizer') || r.includes('organizer');
    };

    const renderOrganizerCard = (org, index) => (
        <Tilt
            key={index}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={400}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glarePosition="all"
            className="organizer-tilt-card"
            data-aos="fade-up"
        >
            <li
                className="people-card general-card"
                onClick={() => setSelectedOrganizer(org)}
            >
                <div
                    className="organizer-avatar-bg"
                    style={{
                        backgroundColor: org.image ? 'transparent' : '#e8f0fe',
                        color: '#1a73e8'
                    }}
                >
                    {org.image ? (
                        <ImageWithLoader
                            src={getOptimizedImageUrl(org.image, 400)}
                            alt={org.name}
                            style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                        />
                    ) : (
                        <span className="initials">{getInitials(org.name)}</span>
                    )}
                </div>

                <div className="People-styles-info">
                    <h2 className="organizer-name-premium" dir="auto">{org.name}</h2>
                    <p className="organizer-role-premium" dir="auto">{org.role}</p>

                    {/* Social Icons on Card */}
                    <div className="card-socials" onClick={(e) => e.stopPropagation()}>
                        {org.linkedin && (
                            <a href={org.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        )}
                        {org.github && (
                            <a href={org.github} target="_blank" rel="noreferrer" className="social-icon github">
                                <i className="fab fa-github"></i>
                            </a>
                        )}
                        {org.instagram && (
                            <a href={org.instagram} target="_blank" rel="noreferrer" className="social-icon instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        )}
                        {org.twitter && (
                            <a href={org.twitter} target="_blank" rel="noreferrer" className="social-icon twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                        )}
                        {org.googleScholar && (
                            <a href={org.googleScholar} target="_blank" rel="noreferrer" className="social-icon google-scholar">
                                <i className="fas fa-graduation-cap"></i>
                            </a>
                        )}
                    </div>
                </div>
            </li>
        </Tilt>
    );

    const totalMembers = facultyAdvisor.length + coreTeam.length + departmentLeads.length + judges.length + techTeam.length + eventsTeam.length + communityTeam.length + mediaTeam.length + contentTeam.length;

    const renderTeamSection = (title, teamArray, animation) => {
        const leads = teamArray.filter(m => isLead(m.role));
        const members = teamArray.filter(m => !isLead(m.role));

        return (
            <React.Fragment key={title}>
                <h2 className="section-title-premium team-title" data-aos={animation} style={{ marginTop: '3rem' }}>
                    {title} <span style={{ fontSize: '0.6em', opacity: 1, verticalAlign: 'middle', marginLeft: '10px', background: 'rgba(66, 133, 244, 0.1)', padding: '2px 12px', borderRadius: '12px', color: '#4285F4', WebkitTextFillColor: 'initial' }}>{teamArray.length}</span>
                </h2>

                {leads.length > 0 && (
                    <ul className="organizers-grid team-grid" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                        {leads.map((member, idx) => renderOrganizerCard(member, `lead-${idx}`))}
                    </ul>
                )}

                {members.length > 0 && (
                    <ul className="organizers-grid team-grid">
                        {members.map((member, idx) => renderOrganizerCard(member, `mem-${idx}`))}
                    </ul>
                )}
            </React.Fragment>
        );
    };

    return (
        <section className="section team-section-container theme-provider-namespace-people-card">
            <div className="container">
                {/* Floating Background Blobs */}
                <div className="floating-blob blob-blue"></div>
                <div className="floating-blob blob-red"></div>
                <div className="floating-blob blob-yellow"></div>
                <div className="floating-blob blob-green"></div>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-aos="fade-down">
                    <h1 className="section-title-premium" style={{ marginBottom: '1rem', fontSize: '3.5rem' }}>Meet the Squad</h1>
                    <p style={{ fontSize: '1.2rem', color: '#5f6368', maxWidth: '600px', margin: '0 auto' }}>
                        A community of <strong style={{ color: '#4285F4' }}>{totalMembers}+</strong> passionate developers, designers, and innovators building the future together.
                    </p>
                </div>

                <h1 className="section-title-premium" data-aos="fade-up" style={{ fontSize: '2.5rem' }}>
                    Visionary Leaders
                    <span style={{ fontSize: '0.5em', opacity: 1, verticalAlign: 'middle', marginLeft: '10px', background: 'rgba(52, 168, 83, 0.1)', padding: '2px 10px', borderRadius: '12px', color: '#34A853', WebkitTextFillColor: 'initial' }}>{facultyAdvisor.length}</span>
                </h1>
                <ul className="organizers-grid faculty-grid">
                    {facultyAdvisor.map(renderOrganizerCard)}
                </ul>

                <div className="team-divider-premium"></div>

                <h1 className="section-title-premium" data-aos="fade-up" style={{ fontSize: '2.5rem' }}>
                    Core Team
                    <span style={{ fontSize: '0.5em', opacity: 1, verticalAlign: 'middle', marginLeft: '10px', background: 'rgba(234, 67, 53, 0.1)', padding: '2px 10px', borderRadius: '12px', color: '#EA4335', WebkitTextFillColor: 'initial' }}>{coreTeam.length}</span>
                </h1>
                <ul className="organizers-grid">
                    {coreTeam.map(renderOrganizerCard)}
                </ul>

                <div className="team-divider-premium"></div>

                <h1 className="section-title-premium" data-aos="fade-up" style={{ fontSize: '2.5rem' }}>
                    Department Leads
                    <span style={{ fontSize: '0.5em', opacity: 1, verticalAlign: 'middle', marginLeft: '10px', background: 'rgba(251, 188, 4, 0.1)', padding: '2px 10px', borderRadius: '12px', color: '#FBBC04', WebkitTextFillColor: 'initial' }}>{departmentLeads.length}</span>
                </h1>
                <ul className="organizers-grid department-leads-grid" style={{ justifyContent: 'center' }}>
                    {departmentLeads.map(renderOrganizerCard)}
                </ul>

                <div className="team-divider-premium"></div>

                {renderTeamSection("Industry Experts & Judges ⚖️", judges, "fade-up")}

                <div className="team-divider-premium"></div>

                {renderTeamSection("Tech Wizards 💻", techTeam, "fade-right")}
                {renderTeamSection("Events & Operations 🚀", eventsTeam, "fade-left")}
                {renderTeamSection("Community & Marketing 🤝", communityTeam, "fade-right")}
                {renderTeamSection("Media & Design 🎨", mediaTeam, "fade-left")}
                {renderTeamSection("Content & Research 📝", contentTeam, "fade-right")}
            </div>

            {/* Modal */}
            {selectedOrganizer && (
                <div className="organizer-modal-overlay" onClick={() => setSelectedOrganizer(null)}>
                    <div className="organizer-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedOrganizer(null)}>&times;</button>
                        <div className="modal-header">
                            <div
                                className="modal-avatar clickable"
                                onClick={() => setIsAvatarExpanded(true)}
                                style={{
                                    backgroundColor: selectedOrganizer.image ? 'transparent' : '#4285F4'
                                }}>
                                {selectedOrganizer.image ? (
                                    <ImageWithLoader
                                        src={getOptimizedImageUrl(selectedOrganizer.image, 600)}
                                        alt={selectedOrganizer.name}
                                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                    />
                                ) : (
                                    <span className="initials">{getInitials(selectedOrganizer.name)}</span>
                                )}
                            </div>
                        </div>
                        <div className="modal-body">
                            <h2 className="modal-name">{selectedOrganizer.name}</h2>
                            <p className="modal-role">{selectedOrganizer.role}</p>
                            {selectedOrganizer.bio && <p className="modal-bio">{selectedOrganizer.bio}</p>}
                            {selectedOrganizer.linkedin && (
                                <a href={selectedOrganizer.linkedin} target="_blank" rel="noreferrer" className="modal-social-link">LinkedIn</a>
                            )}
                            {selectedOrganizer.github && (
                                <a href={selectedOrganizer.github} target="_blank" rel="noreferrer" className="modal-social-link">GitHub</a>
                            )}
                            {selectedOrganizer.instagram && (
                                <a href={selectedOrganizer.instagram} target="_blank" rel="noreferrer" className="modal-social-link">Instagram</a>
                            )}
                            {selectedOrganizer.twitter && (
                                <a href={selectedOrganizer.twitter} target="_blank" rel="noreferrer" className="modal-social-link">Twitter/X</a>
                            )}
                            {selectedOrganizer.googleScholar && (
                                <a href={selectedOrganizer.googleScholar} target="_blank" rel="noreferrer" className="modal-social-link">Google Scholar</a>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Avatar Lightbox */}
            {isAvatarExpanded && selectedOrganizer && selectedOrganizer.image && (
                <div
                    className="avatar-lightbox"
                    onClick={() => setIsAvatarExpanded(false)}
                >
                    <img
                        src={selectedOrganizer.image}
                        alt={selectedOrganizer.name}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />
                    <button className="lightbox-close-btn" onClick={() => setIsAvatarExpanded(false)}>&times;</button>
                </div>
            )}
        </section>
    );
};

export default Team;
