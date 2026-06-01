import { store } from "../state/store.js";
import { getAllTemplates } from "../logic/templateLibrary.js";

function getTodayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function dateFromKey(dateKey) {
  return new Date(`${dateKey}T12:00:00`);
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
}

function getSelectedDate() {
  return dateFromKey(store.selectedCalendarDate || getTodayKey());
}

function getMonthDays() {
  const selected = getSelectedDate();
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1);
    const key = toDateKey(date);

    return {
      date,
      key,
      day: index + 1,
      isToday: key === getTodayKey(),
      isSelected: key === store.selectedCalendarDate
    };
  });
}

function getCompletedSessionForDate(dateKey) {
  return store.data.sessions.find(session =>
    session.startedAt?.slice(0, 10) === dateKey
  );
}

function getSuggestedPlanForDate(dateKey) {
  if (dateKey !== getTodayKey()) return null;

  const templates = getAllTemplates();
  return templates[0] || null;
}

function renderCalendarDots(days) {
  return `
    <div class="dot-calendar">
      ${days.map(day => {
        const completedSession = getCompletedSessionForDate(day.key);
        const plannedSession = getSuggestedPlanForDate(day.key);

        return `
          <button
            class="calendar-day ${day.isToday ? "today" : ""} ${day.isSelected ? "active" : ""}"
            data-calendar-day="${day.key}"
            type="button"
          >
            <span>${day.day}</span>

            <div class="calendar-dots">
              ${plannedSession ? `<i class="dot dot-planned"></i>` : ""}
              ${completedSession ? `<i class="dot dot-completed"></i>` : ""}
            </div>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderSelectedDayPanel() {
  const selectedDate = getSelectedDate();
  const selectedKey = toDateKey(selectedDate);
  const completedSession = getCompletedSessionForDate(selectedKey);
  const plannedSession = getSuggestedPlanForDate(selectedKey);
  const isToday = selectedKey === getTodayKey();

  return `
    <article class="calendar-focus-card">
      <div>
        <span class="quiet-label">${formatDateLabel(selectedDate)}</span>

        <h2>
          ${
            completedSession
              ? completedSession.name
              : plannedSession
                ? plannedSession.name
                : isToday
                  ? "No planned session"
                  : "No session logged"
          }
        </h2>

        <p>
          ${
            completedSession
              ? `${completedSession.exercises.length} logged exposures`
              : plannedSession
                ? plannedSession.goal || "Planned session ready to log."
                : isToday
                  ? "Start an empty session or build a plan."
                  : "Select today to start logging, or review completed sessions."
          }
        </p>
      </div>

      <div class="calendar-focus-actions">
        ${
          completedSession
            ? `
              <button class="secondary-button" data-session-id="${completedSession.id}">
                View Completed
              </button>
            `
            : ""
        }

        ${
          plannedSession
            ? `
              <button class="primary-button" data-template-id="${plannedSession.id}">
                Start Session
              </button>
            `
            : isToday
              ? `
                <button class="primary-button" data-view="session">
                  Create Plan
                </button>
              `
              : ""
        }
      </div>
    </article>
  `;
}

export function renderDashboard() {
  const selectedDate = getSelectedDate();
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
              ${selectedDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
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