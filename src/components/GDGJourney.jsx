const journeyData = [
  {
    title: "Join the Community",
    description:
      "Become part of a global developer network and connect with like-minded peers.",
  },
  {
    title: "Attend Tech Events",
    description:
      "Learn through workshops, hackathons, and expert-led tech sessions.",
  },
  {
    title: "Build Real Projects",
    description:
      "Apply your skills by contributing to real-world and community-driven projects.",
  },
  {
    title: "Grow as a Developer",
    description:
      "Enhance your technical skills, confidence, and career opportunities.",
  },
];

export default function GDGJourney() {
    return (
      <section className="gdg-journey">
        <h2>Your Journey with GDG</h2>
  
        <div className="journey-grid">
          {journeyData.map((item, index) => (
            <div
              className="journey-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}>          
              <div className="step">{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
