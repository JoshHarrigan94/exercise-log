import { store } from "../state/store.js";
import { getAllTemplates } from "../logic/templateLibrary.js";

function getTodayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
}

function getMonthDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1);

    return {
      date,
      key: toDateKey(date),
      day: index + 1,
      isToday: toDateKey(date) === getTodayKey()
    };
  });
}

function getCompletedSessionForDate(dateKey) {
  return store.data.sessions.find(session =>
    session.startedAt?.slice(0, 10) === dateKey
  );
}

function getSuggestedPlan() {
  const templates = getAllTemplates();
  return templates[0] || null;
}

function renderCalendarDots(days) {
  const todayKey = getTodayKey();

  return `
    <div class="dot-calendar">
      ${days.map(day => {
        const completedSession = getCompletedSessionForDate(day.key);
        const hasPlannedSession = day.key === todayKey && getSuggestedPlan();

        return `
          <button
            class="calendar-day ${day.isToday ? "active" : ""}"
            data-calendar-day="${day.key}"
            type="button"
          >
            <span>${day.day}</span>

            <div class="calendar-dots">
              ${hasPlannedSession ? `<i class="dot dot-planned"></i>` : ""}
              ${completedSession ? `<i class="dot dot-completed"></i>` : ""}
            </div>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderSelectedDayPanel() {
  const today = new Date();
  const todayKey = getTodayKey();
  const completedSession = getCompletedSessionForDate(todayKey);
  const suggestedPlan = getSuggestedPlan();

  return `
    <article class="calendar-focus-card">
      <div>
        <span class="quiet-label">${formatDateLabel(today)}</span>
        <h2>${suggestedPlan ? suggestedPlan.name : "No planned session"}</h2>
        <p>
          ${
            suggestedPlan
              ? suggestedPlan.goal || "Planned session ready to log."
              : "Start an empty session or build a plan."
          }
        </p>
      </div>

      <div class="calendar-focus-actions">
        ${
          suggestedPlan
            ? `
              <button class="primary-button" data-template-id="${suggestedPlan.id}">
                Start Session
              </button>
            `
            : `
              <button class="primary-button" data-view="session">
                Create Plan
              </button>
            `
        }

        ${
          completedSession
            ? `
              <button class="secondary-button" data-session-id="${completedSession.id}">
                View Completed
              </button>
            `
            : ""
        }
      </div>
    </article>
  `;
}

export function renderDashboard() {
  const days = getMonthDays();
  const completedCount = store.data.sessions.length;

  return `
    <section class="screen active-screen today-screen">
      <div class="today-hero calendar-hero">
        <p class="eyebrow">${formatDateLabel(new Date())}</p>

        <h1>Today</h1>

        <p class="today-subtitle">
          Select the day, open the plan, log the session.
        </p>
      </div>

      <section class="calendar-feature">
        <div class="calendar-feature-header">
          <div>
            <span class="quiet-label">
              ${new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </span>
            <h2>Training calendar</h2>
          </div>

          <span class="calendar-streak-pill">
            ${completedCount} logged
          </span>
        </div>

        ${renderCalendarDots(days)}
      </section>

      ${renderSelectedDayPanel()}

      <div class="today-link-grid">
        <button class="soft-link-card" data-view="session">
          <span>Plans</span>
          <strong>Build or edit sessions</strong>
        </button>

        <button class="soft-link-card" data-view="history">
          <span>Progress</span>
          <strong>Review training data</strong>
        </button>

        <button class="soft-link-card" data-view="library">
          <span>Library</span>
          <strong>Exercises and methods</strong>
        </button>
      </div>
    </section>
  `;
}