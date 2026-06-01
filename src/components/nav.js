const navItems = [
  { id: "dashboard", label: "Today", icon: "⌂" },
  { id: "session", label: "Plans", icon: "＋" },
  { id: "history", label: "Review", icon: "↗" },
  { id: "library", label: "Library", icon: "□" }
];

function normaliseActiveView(activeView) {
  if (activeView === "live") return "dashboard";
  if (activeView === "progress") return "history";
  if (activeView === "session-detail") return "history";

  return activeView;
}

export function renderNav(activeView) {
  const normalisedView = normaliseActiveView(activeView);

  return `
    <nav class="bottom-nav">
      ${navItems.map(item => `
        <button 
          class="nav-item ${normalisedView === item.id ? "active" : ""}" 
          data-view="${item.id}"
        >
          <span>${item.icon}</span>
          <small>${item.label}</small>
        </button>
      `).join("")}
    </nav>
  `;
}

export function renderSidebar(activeView) {
  const normalisedView = normaliseActiveView(activeView);

  return `
    <aside class="desktop-sidebar">
      <div class="sidebar-brand">
        <span>Progression Lab</span>
        <strong>Training Workspace</strong>
      </div>

      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <button
            class="sidebar-nav-item ${normalisedView === item.id ? "active" : ""}"
            data-view="${item.id}"
          >
            <span>${item.icon}</span>
            <strong>${item.label}</strong>
          </button>
        `).join("")}
      </nav>
    </aside>
  `;
}