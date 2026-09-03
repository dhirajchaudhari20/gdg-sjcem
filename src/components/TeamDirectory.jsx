import React, { useState, useMemo } from 'react';
import { teamData } from '../data/teamData';
import './TeamDirectory.css';

const TeamDirectory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    const departments = ['All', 'Tech', 'Events', 'Community', 'Media', 'Content'];

    const filteredMembers = useMemo(() => {
        return teamData.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.role.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = selectedDept === 'All' || member.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, selectedDept]);

    return (
        <section className="directory-section">
            <div className="directory-container">
                <h1 className="directory-title">Team <span className="highlight-text">Directory</span></h1>
                <p className="directory-subtitle">Find your name and role in the GDG on Campus SJCEM team.</p>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-box"
                    />

                    <div className="dept-tabs">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                className={`dept-tab ${selectedDept === dept ? 'active' : ''}`}
                                onClick={() => setSelectedDept(dept)}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="members-grid">
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <div key={index} className="member-card" data-aos="fade-up" data-aos-delay={index * 50}>
                                <div className={`dept-badge ${member.department.toLowerCase()}`}>{member.department}</div>
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No members found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TeamDirectory;
