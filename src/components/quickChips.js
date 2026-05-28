export function renderQuickChips(targetId, values = []) {
  return `
    <div class="quick-chip-row" data-chip-target="${targetId}">
      ${values.map(value => `
        <button 
          type="button"
          class="quick-chip"
          data-chip-value="${value}"
          data-chip-target-input="${targetId}"
        >
          ${value}
        </button>
      `).join("")}
    </div>
  `;
}

export function bindQuickChips() {
  document.querySelectorAll("[data-chip-target-input]").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.chipTargetInput;
      const value = button.dataset.chipValue;
      const input = document.querySelector(`#${targetId}`);

      if (!input) return;

      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });
}
