const navItems = [
  { id: "dashboard", label: "Today", icon: "⌂" },
  { id: "session", label: "Plan", icon: "＋" },
  { id: "live", label: "Live", icon: "●" },
  { id: "library", label: "Library", icon: "□" },
  { id: "progress", label: "Progress", icon: "↗" },
  { id: "history", label: "History", icon: "◷" }
];

export function renderNav(activeView) {
  return `
    <nav class="bottom-nav">
      ${navItems.map(item => `
        <button 
          class="nav-item ${activeView === item.id ? "active" : ""}" 
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
  return `
    <aside class="desktop-sidebar">
      <div class="sidebar-brand">
        <span>Progression Lab</span>
        <strong>Training Workspace</strong>
      </div>

      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <button
            class="sidebar-nav-item ${activeView === item.id ? "active" : ""}"
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