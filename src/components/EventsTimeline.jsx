import { useNavigate } from "react-router-dom";
const eventsData = [
  {
    title: "Past Events",
    status: "past",
    context: "Previously conducted sessions that helped members build strong foundations.",
    items: ["AI & ML Workshop", "Web Development Bootcamp"],
  },
  {
    title: "Ongoing",
    status: "active",
    context: "Currently active initiatives where you can participate and learn hands-on.",
    items: ["Open Source Sprint"],
  },
  {
    title: "Upcoming Events",
    status: "upcoming",
    context: "Upcoming opportunities to gain skills, collaborate, and grow as a developer.",
    items: ["GDG Hackathon", "Cloud Study Jam"],
  },
  {
    title: "More Coming Soon",
    status: "neutral",
    context: "More community-driven events are being planned. Stay connected!",
    items: ["Stay tuned for upcoming GDG sessions and workshops"],
  },
];

export default function EventsTimeline() {

  const navigate = useNavigate();

  return (
    <section className="events-section">
      <h2>Events & Activities</h2>

      <div className="events-grid">
        {eventsData.map((group, index) => (
          <div
          className={`events-card card-${index + 1}`}
          key={index}
            data-status={group.status}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
          <span className={`event-badge ${group.status}`}>
            {group.status === "active" && "ONGOING"}
            {group.status === "upcoming" && "UPCOMING"}
            {group.status === "past" && "PAST"}
            {group.status === "neutral" && "INFO"}
          </span>

            <h3>{group.title}</h3>
            <p className="event-context">{group.context}</p>

            {group.items.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}

            <button
              className="event-cta"
              onClick={() => {
                if (event.status === "past") navigate("/gallery");
                else navigate("/");
              }}
            >
              <span className="cta-text">
                {event.status === "active" && "Join Now"}
                {event.status === "upcoming" && "Get Notified"}
                {event.status === "past" && "View Highlights"}
                {event.status === "neutral" && "Stay Updated"}
              </span>
              <span className="cta-arrow">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
