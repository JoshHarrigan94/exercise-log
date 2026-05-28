import { renderQuickChips } from "./quickChips.js";

const loadChips = ["BW", "+5kg", "+10kg", "+15kg", "+20kg", "+25kg", "+30kg"];
const rungsChips = ["1-2-3", "1-2-3-4", "1-2-3-4-5", "1-2-3-4-5-6"];
const restChips = ["20s", "30s", "45s", "60s", "90s"];
const segmentChips = ["8+3+2", "10+3+2", "12+4+2", "15+5+3"];
const roundsChips = ["1", "2", "3", "4", "5"];

export function renderMethodFields(methodId) {
  switch (methodId) {
    case "top-set":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+25kg" />
            ${renderQuickChips("dynamic-load", loadChips)}
          </label>

          <label class="form-field">
            <span>Reps</span>
            <input id="dynamic-reps" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-reps", ["1", "2", "3", "4", "5"])}
          </label>
        </div>
      `;

    case "top-set-backoff":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Top Load</span>
            <input id="dynamic-topLoad" type="text" placeholder="+25kg" />
            ${renderQuickChips("dynamic-topLoad", loadChips)}
          </label>

          <label class="form-field">
            <span>Top Reps</span>
            <input id="dynamic-topReps" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-topReps", ["1", "2", "3", "4", "5"])}
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Back-Off Load</span>
            <input id="dynamic-backoffLoad" type="text" placeholder="+10kg" />
            ${renderQuickChips("dynamic-backoffLoad", ["BW", "+5kg", "+10kg", "+15kg", "+20kg"])}
          </label>

          <label class="form-field">
            <span>Back-Off Sets</span>
            <input id="dynamic-backoffSets" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-backoffSets", ["2", "3", "4", "5"])}
          </label>
        </div>

        <label class="form-field">
          <span>Back-Off Reps</span>
          <input id="dynamic-backoffReps" type="number" placeholder="6" />
          ${renderQuickChips("dynamic-backoffReps", ["5", "6", "8", "10", "12"])}
        </label>
      `;

    case "ladder":
      return `
        <label class="form-field">
          <span>Ladder</span>
          <input id="dynamic-ladder" type="text" placeholder="1-2-3-4-5" />
          ${renderQuickChips("dynamic-ladder", rungsChips)}
        </label>

        <label class="form-field">
          <span>Rounds</span>
          <input id="dynamic-rounds" type="number" placeholder="3" />
          ${renderQuickChips("dynamic-rounds", roundsChips)}
        </label>
      `;

    case "top-set-ladder":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Top Load</span>
            <input id="dynamic-topLoad" type="text" placeholder="+25kg" />
            ${renderQuickChips("dynamic-topLoad", loadChips)}
          </label>

          <label class="form-field">
            <span>Top Reps</span>
            <input id="dynamic-topReps" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-topReps", ["1", "2", "3", "4", "5"])}
          </label>
        </div>

        <label class="form-field">
          <span>Ladder</span>
          <input id="dynamic-ladder" type="text" placeholder="1-2-3-4-5" />
          ${renderQuickChips("dynamic-ladder", rungsChips)}
        </label>

        <label class="form-field">
          <span>Rounds</span>
          <input id="dynamic-rounds" type="number" placeholder="2" />
          ${renderQuickChips("dynamic-rounds", roundsChips)}
        </label>
      `;

    case "rest-pause":
      return `
        <label class="form-field">
          <span>Segments</span>
          <input id="dynamic-segments" type="text" placeholder="10+3+2" />
          ${renderQuickChips("dynamic-segments", segmentChips)}
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+10kg" />
            ${renderQuickChips("dynamic-load", loadChips)}
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="20s" />
            ${renderQuickChips("dynamic-rest", restChips)}
          </label>
        </div>
      `;

    case "cluster":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Cluster Reps</span>
            <input id="dynamic-clusterReps" type="number" placeholder="2" />
            ${renderQuickChips("dynamic-clusterReps", ["1", "2", "3", "4", "5"])}
          </label>

          <label class="form-field">
            <span>Clusters</span>
            <input id="dynamic-clusters" type="number" placeholder="5" />
            ${renderQuickChips("dynamic-clusters", ["3", "4", "5", "6", "8", "10"])}
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+25kg" />
            ${renderQuickChips("dynamic-load", loadChips)}
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="20s" />
            ${renderQuickChips("dynamic-rest", restChips)}
          </label>
        </div>
      `;

    case "isometric":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Position</span>
            <select id="dynamic-position">
              <option value="top">Top</option>
              <option value="mid">Mid</option>
              <option value="bottom">Bottom</option>
            </select>
          </label>

          <label class="form-field">
            <span>Duration</span>
            <input id="dynamic-duration" type="number" placeholder="30" />
            ${renderQuickChips("dynamic-duration", ["10", "15", "20", "30", "45", "60"])}
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-sets", ["1", "2", "3", "4", "5"])}
          </label>

          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="BW / +10kg" />
            ${renderQuickChips("dynamic-load", loadChips)}
          </label>
        </div>
      `;

    case "intervals":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Work</span>
            <input id="dynamic-work" type="text" placeholder="1 rep" />
            ${renderQuickChips("dynamic-work", ["1 rep", "5 reps", "10 reps", "20s", "30s"])}
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="30s" />
            ${renderQuickChips("dynamic-rest", restChips)}
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Rounds</span>
            <input id="dynamic-rounds" type="number" placeholder="20" />
            ${renderQuickChips("dynamic-rounds", ["10", "12", "15", "20", "25", "30"])}
          </label>

          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="28kg" />
            ${renderQuickChips("dynamic-load", ["BW", "8kg", "16kg", "20kg", "24kg", "28kg"])}
          </label>
        </div>
      `;

    case "plyometric":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="5" />
            ${renderQuickChips("dynamic-sets", ["2", "3", "4", "5", "6", "8"])}
          </label>

          <label class="form-field">
            <span>Reps</span>
            <input id="dynamic-reps" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-reps", ["1", "2", "3", "5", "8", "10"])}
          </label>
        </div>

        <label class="form-field">
          <span>Intent</span>
          <select id="dynamic-intent">
            <option value="max power">Max power</option>
            <option value="extensive rhythm">Extensive rhythm</option>
            <option value="reactive">Reactive</option>
            <option value="technical">Technical</option>
          </select>
        </label>

        <label class="form-field">
          <span>Landing Stress</span>
          <select id="dynamic-landingStress">
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
      `;

    default:
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="80kg" />
            ${renderQuickChips("dynamic-load", ["BW", "40kg", "60kg", "80kg", "100kg", "120kg"])}
          </label>

          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="3" />
            ${renderQuickChips("dynamic-sets", ["2", "3", "4", "5"])}
          </label>
        </div>

        <label class="form-field">
          <span>Reps</span>
          <input id="dynamic-reps" type="number" placeholder="8" />
          ${renderQuickChips("dynamic-reps", ["5", "6", "8", "10", "12", "15"])}
        </label>
      `;
  }
}
