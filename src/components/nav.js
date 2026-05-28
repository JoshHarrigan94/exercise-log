const navItems = [
  { id: "dashboard", label: "Today", icon: "⌂" },
  { id: "session", label: "Train", icon: "＋" },
  { id: "live", label: "Live", icon: "●" },
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
