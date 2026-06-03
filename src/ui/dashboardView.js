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

function getPlanMovementCount(plan) {
  if (!plan) return 0;

  if (Array.isArray(plan.exercises)) {
    return plan.exercises.length;
  }

  if (Array.isArray(plan.weeks)) {
    return plan.weeks.reduce((total, week) => {
      return total + (week.workouts || []).reduce((workoutTotal, workout) => {
        return workoutTotal + (workout.exercises || []).length;
      }, 0);
    }, 0);
  }

  return 0;
}

function renderCalendarDots(days) {
  return `
    <div class="adapt-calendar-strip">
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

  const movementCount = getPlanMovementCount(plannedSession);

  return `
    <article class="adapt-day-card">
      <div class="adapt-day-card-copy">
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
              ? `${completedSession.exercises.length} logged exposures captured.`
              : plannedSession
                ? plannedSession.goal || `${movementCount} planned movements ready.`
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
  const todayPlan = getSuggestedPlanForDate(getTodayKey());
  const movementCount = getPlanMovementCount(todayPlan);

  return `
    <section class="screen active-screen today-screen adapt-today-screen">
      <section class="adapt-hero-card">
        <div class="adapt-hero-art"></div>

        <div class="adapt-hero-content">
          <div class="adapt-hero-topline">
            <p class="eyebrow">${formatDateLabel(new Date())}</p>

            <span class="adapt-signal-pill">
              Ready signal
            </span>
          </div>

          <div class="adapt-hero-main">
            <h1>
              ${
                todayPlan
                  ? todayPlan.name
                  : "Today"
              }
            </h1>

            <p>
              ${
                todayPlan
                  ? todayPlan.goal || "Your planned exposure is ready. Log it cleanly and let the system learn from the result."
                  : "No plan selected yet. Build the next exposure and keep the signal clean."
              }
            </p>
          </div>

          <div class="adapt-hero-metrics">
            <div>
              <span>Plan</span>
              <strong>${todayPlan ? "Loaded" : "Empty"}</strong>
            </div>

            <div>
              <span>Movements</span>
              <strong>${movementCount}</strong>
            </div>

            <div>
              <span>Logged</span>
              <strong>${completedCount}</strong>
            </div>
          </div>

          <div class="adapt-hero-actions">
            ${
              todayPlan
                ? `
                  <button class="primary-button adapt-primary-cta" data-template-id="${todayPlan.id}">
                    Start Session
                  </button>
                `
                : `
                  <button class="primary-button adapt-primary-cta" data-view="session">
                    Build Plan
                  </button>
                `
            }

            <button class="secondary-button" data-view="history">
              Review
            </button>
          </div>
        </div>
      </section>

      <section class="adapt-signal-grid">
        <article class="adapt-signal-card">
          <span>Current signal</span>
          <strong>Ready to train</strong>
          <p>Use today’s log to confirm load, volume and recovery cost.</p>
        </article>

        <article class="adapt-signal-card">
          <span>System focus</span>
          <strong>Execution quality</strong>
          <p>Keep the session clean before chasing more complexity.</p>
        </article>
      </section>

      <section class="calendar-feature adapt-calendar-card">
        <div class="calendar-feature-header">
          <div>
            <span class="quiet-label">
              ${selectedDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </span>

            <h2>Training rhythm</h2>
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
          <span>Review</span>
          <strong>Understand the signal</strong>
        </button>

        <button class="soft-link-card" data-view="library">
          <span>Library</span>
          <strong>Movements and methods</strong>
        </button>
      </div>
    </section>
  `;
}