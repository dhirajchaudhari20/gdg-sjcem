import React from 'react';

const LinkedInIcon = () => (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const XIcon = () => (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const SocialPill = ({ linkedin, twitter, github, instagram, name }) => (
    <div className="flex items-center gap-1 sm:gap-1.5 bg-[#121214] p-1 sm:p-1.5 rounded-lg sm:rounded-xl shadow-lg border border-black/10">
        {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#222226] hover:bg-[#0077b5] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer">
                <LinkedInIcon />
            </a>
        )}
        {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer"
                aria-label={`${name} X Twitter`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#222226] hover:bg-black text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer">
                <XIcon />
            </a>
        )}
        {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
                aria-label={`${name} GitHub`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#222226] hover:bg-[#333] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer">
                <GitHubIcon />
            </a>
        )}
        {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer"
                aria-label={`${name} Instagram`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#222226] hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer">
                <InstagramIcon />
            </a>
        )}
    </div>
);

const MemberCard = ({ member }) => (
    <div className="group relative bg-[#f1f1f3] text-[#111111] rounded-[20px] sm:rounded-[28px] p-3.5 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[510px] overflow-hidden shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-300">
        {/* Name at top */}
        <div className="relative z-10 space-y-0.5 sm:space-y-1">
            <h3 className="text-base sm:text-2xl lg:text-[1.65rem] font-bold text-[#111111] leading-[1.1] tracking-tight">
                {member.name.split(' ').map((part, i, arr) => (
                    <span key={i}>{part}{i < arr.length - 1 ? <br /> : null}</span>
                ))}
            </h3>
            {member.role && (
                <p className="text-[10px] sm:text-xs text-[#555] font-medium tracking-wide uppercase">{member.role}</p>
            )}
        </div>

        {/* Photo fills card below name */}
        <div className="absolute inset-x-0 bottom-0 top-[82px] sm:top-[144px] flex items-end justify-center pointer-events-none overflow-hidden">
            <img
                alt={member.name}
                className="w-full h-full object-cover object-[center_top] transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                src={member.image}
            />
            {/* top fade */}
            <div className="absolute inset-x-0 top-0 h-8 sm:h-10 bg-gradient-to-b from-[#f1f1f3] via-[#f1f1f3]/60 to-transparent pointer-events-none"></div>
            {/* bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-14 sm:h-20 bg-gradient-to-t from-[#f1f1f3]/60 via-[#f1f1f3]/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Social pill at bottom */}
        <div className="relative z-20 self-end mt-auto pt-2 sm:pt-4">
            <SocialPill
                name={member.name}
                linkedin={member.linkedin}
                twitter={member.twitter}
                github={member.github}
                instagram={member.instagram}
            />
        </div>
    </div>
);

const Organizers = () => {
    const facultyAdvisors = [
        {
            name: 'Dr. Sunny Sall',
            role: 'Faculty Advisor & HOD',
            image: 'https://i.ibb.co/RTNCNWTD/file-2.jpg',
            linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in',
        }
    ];

    const coreTeam = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.82787-15/780982008_18011856923929174_9102320389309764789_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=111&_nc_map=urlgen_bucketless&ig_cache_key=Mzk2ODY1Njc1MDM4Mjc1OTY4Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzAyNC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=cOn4Rt-LNwUQ7kNvwH493qE&_nc_oc=Adp-e-J8pQopD5pCM8Y0j8bOr0JXehS3L-nW1PPKaToQ3l8W1ENL0RFtfeOVvtlHMW0&_nc_zt=23&_nc_ht=instagram.fbom5-1.fna&_nc_gid=B5JkRuFT49PXQZXbPfKd7g&_nc_ss=7ba8c&oh=00_AQNZWFUxNnRGTLQW49s6Pp0fXFKU3ZT2JpD-Tyz2KqkfeA&oe=6AC048F2',
            twitter: 'https://twitter.com/DhirajC39511965',
            linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/',
            github: 'https://github.com/dhirajchaudhari20',
            instagram: 'https://www.instagram.com/the_alpha_engineer/',
        },
        {
            name: 'Aayush Bari',
            role: 'Co-Organizer',
            image: 'https://i.ibb.co/qFpsP4MF/Profile-Pic.jpg',
            linkedin: 'https://www.linkedin.com/in/aayush-bari/',
            github: 'https://github.com/Aayush0735',
            instagram: 'https://www.instagram.com/aayush.bari.585',
            twitter: 'https://x.com/aayush_bari01',
        }
    ];

    const departmentLeads = [
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            linkedin: 'https://www.linkedin.com/in/abhijeetrogye/',
        },
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/',
            github: 'https://github.com/Sumedh1102',
            instagram: 'https://www.instagram.com/sumedh1102',
        },
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg',
            linkedin: 'https://www.linkedin.com/in/rupesh-nandale-287678277/',
            github: 'https://github.com/rupesh108-iebe',
            twitter: 'https://x.com/Anvayu108',
        },
        {
            name: 'Sahas Bochare',
            role: 'Community & Marketing Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg',
            linkedin: 'https://www.linkedin.com/in/sahasbochare',
        },
        {
            name: 'Manasvi Kadu',
            role: 'Social Media Head',
            image: 'https://i.ibb.co/3yk1pRCB/IMG-20251206-153035.jpg',
            linkedin: 'https://www.linkedin.com/in/manasvi-kadu-8729b3286',
            github: 'https://github.com/AlgoWhizMk',
            twitter: 'https://x.com/manasvi52370',
            instagram: 'https://www.instagram.com/_manasv.iii',
        },
        {
            name: 'Sejal Rai',
            role: 'PR & Outreach Lead',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQE0pqh_npE7bQ/profile-displayphoto-scale_200_200/B4EZlln7rdKQAY-/0/1758346591904?e=1766620800&v=beta&t=Z8phlcanXrqhmSGB_Q7PPxypHkc12KSHRogFe9aD4k0',
            linkedin: 'https://www.linkedin.com/in/sejal-rai-18334a321/',
        },
        {
            name: 'Aleena Joji',
            role: 'Content Lead',
            image: 'https://i.ibb.co/ycV0QkCQ/1000153477.png',
            linkedin: 'https://www.linkedin.com/in/aleenajoji',
            instagram: 'https://www.instagram.com/_aleena21_',
        },
        {
            name: 'Prathamesh Jakkula',
            role: 'AIML / DSA Lead',
            image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
            linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/',
            github: 'https://github.com/Prathamesh01110',
            twitter: 'https://x.com/Prathamesh01_',
        },
    ];

    return (
        <section id="team" className="py-24 sm:py-32 border-b border-[rgba(255,255,255,0.08)] bg-[#080808] relative overflow-hidden scroll-mt-20">
            <div id="organizers" className="absolute -top-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 space-y-3">
                    <span className="block text-[#ea4335] font-mono uppercase text-xs tracking-wider">Meet Our Team</span>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                        The Organizing Squad
                    </h2>
                    <p className="text-xs sm:text-base text-[#a1a1aa] font-normal leading-relaxed max-w-2xl mx-auto pt-1 px-2">
                        Meet the passionate organizers behind GDG on Campus SJCEM. Dedicated to building a vibrant community, sharing knowledge, and creating unforgettable experiences for developers.
                    </p>
                </div>

                {/* Faculty Advisor */}
                <div className="mb-10 sm:mb-16">
                    <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-5 sm:mb-8">Faculty Advisor</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {facultyAdvisors.map((member, i) => (
                            <MemberCard key={i} member={member} />
                        ))}
                    </div>
                </div>

                {/* Core Team */}
                <div className="mb-10 sm:mb-16">
                    <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-5 sm:mb-8">Core Organizers</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {coreTeam.map((member, i) => (
                            <MemberCard key={i} member={member} />
                        ))}
                    </div>
                </div>

                {/* Department Leads */}
                <div>
                    <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-5 sm:mb-8">Department Leads</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {departmentLeads.map((member, i) => (
                            <MemberCard key={i} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Organizers;
