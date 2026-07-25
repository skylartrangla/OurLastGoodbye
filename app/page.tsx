"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Tab = "journey" | "freestyle" | "treasure" | "planb" | "final";
type Category = "Activity" | "Food" | "Café" | "Bar";

type Place = {
  name: string;
  category: Category;
  area: "Central" | "West Lake" | "Outside" | "Anywhere";
  mood: "Slow" | "Playful" | "Culture" | "Night";
  note: string;
};

const places: Place[] = [
  { name: "St. Joseph’s Cathedral", category: "Activity", area: "Central", mood: "Culture", note: "Best paired with a slow walk through the Old Quarter." },
  { name: "Tống Duy Tân night food street", category: "Food", area: "Central", mood: "Night", note: "A late-night option when we still have energy." },
  { name: "Tạ Hiện beer street", category: "Bar", area: "Central", mood: "Night", note: "Lively, busy, and best when we want to people-watch." },
  { name: "Hoàn Kiếm walking street", category: "Activity", area: "Central", mood: "Slow", note: "Good for an unplanned evening wander." },
  { name: "Hỏa Lò Prison Relic", category: "Activity", area: "Central", mood: "Culture", note: "Reserve time to explore without rushing." },
  { name: "Imperial Citadel of Thăng Long", category: "Activity", area: "Central", mood: "Culture", note: "A calm history stop with plenty of space to walk." },
  { name: "Water puppet theatre", category: "Activity", area: "Central", mood: "Culture", note: "Check showtimes and book in advance." },
  { name: "Vietnam Fine Arts Museum", category: "Activity", area: "Central", mood: "Culture", note: "A quiet indoor option for a rainy or hot afternoon." },
  { name: "Đinh Lễ book street", category: "Activity", area: "Central", mood: "Slow", note: "Browse slowly and choose a small keepsake." },
  { name: "West Lake kayak or pedal boat", category: "Activity", area: "West Lake", mood: "Playful", note: "Weather-dependent; best near sunset." },
  { name: "Royal City bowling", category: "Activity", area: "Anywhere", mood: "Playful", note: "Easy indoor Plan B when the weather changes." },
  { name: "VCCA art centre", category: "Activity", area: "Anywhere", mood: "Culture", note: "Indoor exhibition option inside Royal City." },
  { name: "Escape room", category: "Activity", area: "Anywhere", mood: "Playful", note: "Pick a bilingual room and reserve a slot." },
  { name: "Jump Arena", category: "Activity", area: "Anywhere", mood: "Playful", note: "For a high-energy freestyle afternoon." },
  { name: "Pottery workshop at Gốm CHI", category: "Activity", area: "Central", mood: "Slow", note: "A small object we make can become a trip keepsake." },
  { name: "The Quintessence of Tonkin", category: "Activity", area: "Outside", mood: "Culture", note: "Runs on selected evenings; allow travel time." },
  { name: "Horse riding", category: "Activity", area: "Outside", mood: "Playful", note: "Confirm availability before leaving central Hanoi." },
  { name: "Go-kart", category: "Activity", area: "Outside", mood: "Playful", note: "A spontaneous competitive option." },
  { name: "Sixdoong Café & Camping", category: "Café", area: "West Lake", mood: "Slow", note: "A spacious coffee stop with an outdoor feeling." },
  { name: "Tằm Café", category: "Café", area: "West Lake", mood: "Slow", note: "Garden atmosphere; pair with a West Lake walk." },
  { name: "Railway coffee village", category: "Café", area: "Central", mood: "Playful", note: "Follow local safety instructions and access rules." },
  { name: "Giảng egg coffee", category: "Café", area: "Central", mood: "Culture", note: "A classic Hanoi taste near the Old Quarter." },
  { name: "Hanoi House", category: "Bar", area: "Central", mood: "Night", note: "Small, atmospheric, and tucked above the street." },
  { name: "Sunset Bar", category: "Bar", area: "West Lake", mood: "Night", note: "Choose this for a slower, dressed-up evening." },
  { name: "Bee’Znees", category: "Bar", area: "Central", mood: "Night", note: "Hidden-bar energy; check the latest entry details." },
  { name: "The Other Room", category: "Bar", area: "Central", mood: "Night", note: "A cozy cocktail option for a quieter night." },
  { name: "Đào Philosophy Bar", category: "Bar", area: "Central", mood: "Night", note: "A conversation-first cocktail stop." },
  { name: "The Haflington", category: "Bar", area: "Central", mood: "Night", note: "A polished final drink near Hoàn Kiếm." },
  { name: "Tầm Vị", category: "Food", area: "Central", mood: "Culture", note: "Vietnamese family-style meal; reserve if possible." },
  { name: "Phở Thìn Lò Đúc", category: "Food", area: "Central", mood: "Culture", note: "A rich Hanoi-style bowl for breakfast or lunch." },
  { name: "Bún đậu Hàng Khay", category: "Food", area: "Central", mood: "Culture", note: "Compact and very local; expect a busy space." },
  { name: "Phở cuốn Hương Mai", category: "Food", area: "Central", mood: "Slow", note: "A lighter meal around Trúc Bạch." },
  { name: "Chả cá Lã Vọng", category: "Food", area: "Central", mood: "Culture", note: "A signature Hanoi specialty to share." },
  { name: "Bánh đúc nóng", category: "Food", area: "Central", mood: "Slow", note: "Warm comfort food for a rainy afternoon." },
  { name: "Xôi Yến", category: "Food", area: "Central", mood: "Night", note: "Reliable when we need something filling and quick." },
  { name: "Chè Bốn Mùa", category: "Food", area: "Central", mood: "Slow", note: "Choose two desserts and trade halfway." },
];

const days = [
  {
    label: "Day 1",
    title: "Arrive & exhale",
    note: "No pressure. We begin slowly.",
    items: [
      ["08:00", "A soft landing", "Airport, bags, and time to breathe"],
      ["11:30", "First meal together", "A familiar Vietnamese welcome"],
      ["16:00", "Old Quarter wander", "No destination, just us"],
      ["20:00", "Night in Hanoi", "A drink, a walk, or an early rest"],
    ],
  },
  {
    label: "Day 2",
    title: "Hanoi in full colour",
    note: "Culture, small discoveries, and good food.",
    items: [
      ["08:30", "Breakfast ritual", "Coffee and something warm"],
      ["10:30", "A cultural stop", "Museum or heritage site"],
      ["15:00", "Make a keepsake", "Workshop or book-street detour"],
      ["19:30", "Dinner worth remembering", "Our table, no rush"],
    ],
  },
  {
    label: "Day 3",
    title: "Choose the adventure",
    note: "The playful, slightly unpredictable day.",
    items: [
      ["09:00", "Slow start", "Keep energy for later"],
      ["11:00", "A little competition", "Bowling, escape room, or go-kart"],
      ["16:30", "Golden-hour pause", "West Lake if the weather agrees"],
      ["21:00", "Hidden Hanoi", "Cocktails and conversation"],
    ],
  },
  {
    label: "Day 4",
    title: "No map required",
    note: "Our freestyle day—let Hanoi decide.",
    items: [
      ["09:30", "Roll for breakfast", "Let the randomizer choose"],
      ["12:00", "Follow one clue", "Pick culture, playful, or slow"],
      ["17:00", "Change the plan", "Because we are allowed to"],
      ["20:30", "One beautiful night", "Dress up or keep it effortless"],
    ],
  },
  {
    label: "Day 5",
    title: "One last full day",
    note: "A gentle ending, with space for what matters.",
    items: [
      ["09:00", "Favourite repeat", "Return to something we loved"],
      ["12:30", "Our Hanoi lunch", "Choose together"],
      ["16:00", "A final keepsake", "Photo, note, or tiny souvenir"],
      ["20:00", "The last treasure", "Unlock when the day is complete"],
    ],
  },
];

const rewards = [
  "A small love-note clue",
  "You choose tonight’s dessert",
  "One wish, no questions asked",
  "A surprise for our final night",
  "The letter at the end of five days",
];

const tabs: { id: Tab; label: string; mark: string }[] = [
  { id: "journey", label: "Journey", mark: "⌁" },
  { id: "freestyle", label: "Freestyle", mark: "↝" },
  { id: "treasure", label: "Treasure", mark: "◇" },
  { id: "planb", label: "Plan B", mark: "↻" },
  { id: "final", label: "Final", mark: "♡" },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("journey");
  const [day, setDay] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [category, setCategory] = useState<"All" | Category>("All");
  const [mood, setMood] = useState<"Any" | Place["mood"]>("Any");
  const [roll, setRoll] = useState<Place | null>(null);
  const [rollNote, setRollNote] = useState("");
  const [swapSource, setSwapSource] = useState("");
  const [alternatives, setAlternatives] = useState<Place[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem("hanoi-five-days") ?? "{}");
        setChecks(saved.checks ?? {});
        setOpened(saved.opened ?? {});
      } catch {
        setChecks({});
        setOpened({});
      }
      setProgressLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progressLoaded) {
      window.localStorage.setItem(
        "hanoi-five-days",
        JSON.stringify({ checks, opened }),
      );
    }
  }, [checks, opened, progressLoaded]);

  const todayCount = useMemo(
    () =>
      days[day].items.reduce(
        (total, _, index) => total + (checks[`${day}-${index}`] ? 1 : 0),
        0,
      ),
    [checks, day],
  );

  const openedCount = Object.values(opened).filter(Boolean).length;

  function selectTab(next: Tab) {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function randomPlace() {
    let pool = places.filter(
      (place) =>
        (category === "All" || place.category === category) &&
        (mood === "Any" || place.mood === mood),
    );
    let note = "A match for both of your choices.";

    if (!pool.length && category !== "All") {
      pool = places.filter((place) => place.category === category);
      note = `No ${mood.toLowerCase()} ${category.toLowerCase()} option was available, so we kept “${category}” and widened the mood.`;
    }
    if (!pool.length && mood !== "Any") {
      pool = places.filter((place) => place.mood === mood);
      note = `No exact combination was available, so we kept the “${mood}” mood and widened the category.`;
    }
    if (!pool.length) {
      pool = places;
      note = "No exact combination was available, so Hanoi chose freely.";
    }

    const next = pool[Math.floor(Math.random() * pool.length)];
    setRoll(next);
    setRollNote(note);
  }

  function openPlanB(source: string) {
    setSwapSource(source);
    const shuffled = [...places].sort(() => Math.random() - 0.5);
    setAlternatives(shuffled.slice(0, 3));
    selectTab("planb");
  }

  return (
    <main
      className="site-shell"
      style={{
        "--journal-image": `url("${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/romantic-hanoi-background.png")`,
      } as CSSProperties}
    >
      <div className="paper-grain" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" onClick={() => selectTab("journey")} aria-label="Return to journey">
          <span className="stamp">HANOI<br /><b>5</b></span>
          <span>
            <small>Our little travel journal</small>
            <strong>Five Days in Hanoi</strong>
            <em>5 days · August 2026</em>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {tabs.map((item) => (
            <button
              key={item.id}
              className={tab === item.id ? "active" : ""}
              onClick={() => selectTab(item.id)}
            >
              <span>{item.mark}</span>{item.label}
            </button>
          ))}
        </nav>
      </header>

      {tab === "journey" && (
        <section className="view journey-view">
          <div className="day-strip" aria-label="Choose a day">
            {days.map((item, index) => (
              <button
                key={item.label}
                className={day === index ? "active" : ""}
                onClick={() => setDay(index)}
              >
                <small>0{index + 1}</small>{item.label}
              </button>
            ))}
          </div>

          <div className="journey-grid">
            <div className="timeline-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Our day, from morning to midnight</p>
                  <h1>{days[day].title}</h1>
                  <p>{days[day].note}</p>
                </div>
                <span className="day-number">0{day + 1}</span>
              </div>

              <div className="timeline">
                {days[day].items.map((item, index) => {
                  const key = `${day}-${index}`;
                  const checked = !!checks[key];
                  return (
                    <article className={`timeline-card ${checked ? "checked" : ""}`} key={key}>
                      <button
                        className="check"
                        aria-label={`${checked ? "Undo" : "Complete"} checkpoint: ${item[1]}`}
                        onClick={() => setChecks({ ...checks, [key]: !checked })}
                      >
                        {checked ? "✓" : ""}
                      </button>
                      <time>{item[0]}</time>
                      <div>
                        <h3>{item[1]}</h3>
                        <p>{item[2]}</p>
                      </div>
                      <button className="swap-link" onClick={() => openPlanB(item[1])}>
                        Closed? Swap it
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="treasure-card">
              <span className="ribbon">Tonight’s treasure</span>
              <div className="heart-lock" aria-hidden="true">♡</div>
              <p className="progress"><strong>{todayCount}</strong><span>/ 4</span></p>
              <h2>{todayCount >= 3 ? "The chest is ready" : `${3 - todayCount} more ${3 - todayCount === 1 ? "checkpoint" : "checkpoints"}`}</h2>
              <p>Complete any 3 moments. A changed plan still counts as a real memory.</p>
              <div className="token-row" aria-label={`${todayCount} of 4 checkpoints collected`}>
                {[0, 1, 2, 3].map((index) => (
                  <span key={index} className={index < todayCount ? "earned" : ""}>✦</span>
                ))}
              </div>
              <button
                className="primary"
                disabled={todayCount < 3 || opened[String(day)]}
                onClick={() => setOpened({ ...opened, [String(day)]: true })}
              >
                {opened[String(day)] ? "Treasure opened" : todayCount >= 3 ? "Open tonight’s treasure" : "Keep exploring"}
              </button>
              {opened[String(day)] && <div className="reward-reveal">{rewards[day]}</div>}
            </aside>
          </div>
        </section>
      )}

      {tab === "freestyle" && (
        <section className="view freestyle-view">
          <div className="page-intro">
            <p className="eyebrow">When the best plan is no plan</p>
            <h1>Let Hanoi choose for us.</h1>
            <p>Pick the feeling. We’ll draw one idea from our Hanoi list and see where the day goes.</p>
          </div>
          <div className="randomizer">
            <div className="filters">
              <label>What are we looking for?
                <select value={category} onChange={(event) => setCategory(event.target.value as "All" | Category)}>
                  <option>All</option><option>Activity</option><option>Food</option><option>Café</option><option>Bar</option>
                </select>
              </label>
              <label>What is the mood?
                <select value={mood} onChange={(event) => setMood(event.target.value as "Any" | Place["mood"])}>
                  <option>Any</option><option>Slow</option><option>Playful</option><option>Culture</option><option>Night</option>
                </select>
              </label>
              <button className="primary roll-button" onClick={randomPlace}>Draw our next clue</button>
            </div>
            <div className={`result-card ${roll ? "has-result" : ""}`}>
              {roll ? (
                <>
                  <span className="match-note">{rollNote}</span>
                  <span className="result-category">{roll.category} · {roll.area}</span>
                  <h2>{roll.name}</h2>
                  <p>{roll.note}</p>
                  <div className="result-actions">
                    <button className="primary" onClick={() => openPlanB(roll.name)}>Find alternatives</button>
                    <button className="secondary" onClick={randomPlace}>Draw again</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="big-compass">✧</span>
                  <h2>A small adventure is waiting.</h2>
                  <p>Your first clue will appear here.</p>
                </>
              )}
            </div>
          </div>
          <p className="source-note">Freestyle ideas are adapted from the “Ha Noi Planning” workbook. Opening hours and reservations should be confirmed closer to the trip.</p>
        </section>
      )}

      {tab === "treasure" && (
        <section className="view">
          <div className="page-intro compact">
            <p className="eyebrow">Five evenings, five small secrets</p>
            <h1>Our treasure cabinet</h1>
            <p>Each day needs any three checkpoints. Flexibility is part of the game.</p>
          </div>
          <div className="chest-grid">
            {days.map((item, index) => {
              const count = item.items.filter((_, itemIndex) => checks[`${index}-${itemIndex}`]).length;
              const isOpen = !!opened[String(index)];
              return (
                <article className={`day-chest ${isOpen ? "open" : ""}`} key={item.label}>
                  <span className="chest-day">0{index + 1}</span>
                  <div className="mini-lock">{isOpen ? "♡" : "◇"}</div>
                  <h2>{item.label}</h2>
                  <p>{isOpen ? rewards[index] : `${count} / 3 keys collected`}</p>
                  <button
                    className="secondary"
                    onClick={() => { setDay(index); selectTab("journey"); }}
                  >
                    {isOpen ? "Revisit this day" : "Find the keys"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {tab === "planb" && (
        <section className="view">
          <div className="page-intro compact">
            <p className="eyebrow">Closed, raining, tired—or simply changed our minds</p>
            <h1>Plan B is still our plan.</h1>
            <p>{swapSource ? `Let’s replace “${swapSource}” with something that fits us better.` : "Choose a new clue without treating the day like it went wrong."}</p>
          </div>
          <div className="planb-controls">
            <button
              className="primary"
              onClick={() => setAlternatives([...places].sort(() => Math.random() - 0.5).slice(0, 3))}
            >
              Refresh three options
            </button>
            <button className="secondary" onClick={() => selectTab("freestyle")}>Open full randomizer</button>
          </div>
          <div className="alternative-grid">
            {(alternatives.length ? alternatives : places.slice(8, 11)).map((place) => (
              <article key={place.name}>
                <span>{place.category} · {place.mood}</span>
                <h2>{place.name}</h2>
                <p>{place.note}</p>
                <button className="text-button" onClick={() => { setRoll(place); selectTab("freestyle"); }}>Choose this clue →</button>
              </article>
            ))}
          </div>
          <div className="permission-note">
            <strong>Our only rule:</strong>
            <p>Changing the schedule is not missing the trip. If we are together, the checkpoint still counts.</p>
          </div>
        </section>
      )}

      {tab === "final" && (
        <section className="view final-view">
          <div className={`final-letter ${openedCount === 5 ? "unlocked" : ""}`}>
            <span className="wax-seal">S + V</span>
            <p className="eyebrow">{openedCount === 5 ? "All five chapters complete" : "For the end of our fifth day"}</p>
            <h1>{openedCount === 5 ? "One final letter, just for you." : "This letter is still sealed."}</h1>
            {openedCount === 5 ? (
              <>
                <p className="letter-placeholder">Your personal final message will live here after you send it to me.</p>
                <span className="signature">With love, always in this moment.</span>
              </>
            ) : (
              <>
                <p>Open each day’s treasure first. The ending should wait until we have lived the whole story.</p>
                <div className="final-progress"><span style={{ width: `${openedCount * 20}%` }} /></div>
                <small>{openedCount} of 5 treasures opened</small>
              </>
            )}
          </div>
        </section>
      )}

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {tabs.map((item) => (
          <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => selectTab(item.id)}>
            <span>{item.mark}</span>{item.label}
          </button>
        ))}
      </nav>
    </main>
  );
}
