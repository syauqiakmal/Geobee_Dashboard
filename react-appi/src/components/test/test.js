import React, { useState } from "react";
import "./Tst.css";

const Test = () => {
  const [activeTab, setActiveTab] = useState("Top Mentions");

  const feeds = [
    {
      id: 1,
      source: "CNN Breaking News",
      logo: "https://via.placeholder.com/40",
      content:
        "American Airlines cancels hundreds of flights this weekend, citing bad weather earlier in the week and staffing shortages.",
      link: "#",
    },
    {
      id: 2,
      source: "CNN",
      logo: "https://via.placeholder.com/40",
      content:
        "... an alleged assault on an American Airlines flight attendant last week, which was described by the airline's CEO as 'one of the worst displays of ...'",
    },
    {
      id: 3,
      source: "The New York Times",
      logo: "https://via.placeholder.com/40",
      content:
        "An American Airlines flight attendant was struck on her nose by a passenger last week, leading to a concussion and a facial injury.",
      link: "#",
    },
    {
      id: 4,
      source: "Reuters",
      logo: "https://via.placeholder.com/40",
      content:
        "U.S. charges passenger with assaulting American Airlines flight attendant.",
      link: "#",
    },
  ];

  return (
    <div className="feed-container">
      {/* Tabs */}
      <div className="feed-tab">
        <button
          className={activeTab === "Top Mentions" ? "active-tab" : ""}
          onClick={() => setActiveTab("Top Mentions")}
        >
          Top Mentions
        </button>
        <button
          className={activeTab === "Top Influencers" ? "active-tab" : ""}
          onClick={() => setActiveTab("Top Influencers")}
        >
          Top Influencers
        </button>
      </div>

      {/* Feed Items */}
      <div className="feed">
        {feeds.map((item) => (
          <div className="feed-item" key={item.id}>
            <img src={item.logo} alt={`${item.source} Logo`} className="feed-logo" />
            <div className="feed-content">
              <h3>{item.source}</h3>
              <p>
                {item.content.split("American Airlines").map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    {index < item.content.split("American Airlines").length - 1 && (
                      <span className="highlight">American Airlines</span>
                    )}
                  </React.Fragment>
                ))}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
