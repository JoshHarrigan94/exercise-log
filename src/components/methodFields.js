export function renderMethodFields(methodId) {
  switch (methodId) {
    case "top-set":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+25kg" />
          </label>

          <label class="form-field">
            <span>Reps</span>
            <input id="dynamic-reps" type="text" placeholder="3" />
          </label>
        </div>
      `;

    case "ladder":
      return `
        <label class="form-field">
          <span>Ladder Structure</span>
          <input id="dynamic-ladder" type="text" placeholder="1-2-3-4-5" />
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Rounds</span>
            <input id="dynamic-rounds" type="number" placeholder="3" />
          </label>

          <label class="form-field">
            <span>Total Reps</span>
            <input id="dynamic-total-reps" type="number" placeholder="45" />
          </label>
        </div>
      `;

    case "rest-pause":
      return `
        <label class="form-field">
          <span>Rep Structure</span>
          <input id="dynamic-structure" type="text" placeholder="10+3+2" />
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+10kg" />
          </label>

          <label class="form-field">
            <span>Rest Seconds</span>
            <input id="dynamic-rest" type="number" placeholder="20" />
          </label>
        </div>
      `;

    case "cluster":
      return `
        <label class="form-field">
          <span>Cluster Structure</span>
          <input id="dynamic-structure" type="text" placeholder="2-2-2-2-2" />
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+25kg" />
          </label>

          <label class="form-field">
            <span>Rest Seconds</span>
            <input id="dynamic-rest" type="number" placeholder="20" />
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
            <input id="dynamic-duration" type="number" placeholder="20" />
          </label>
        </div>

        <label class="form-field">
          <span>Load</span>
          <input id="dynamic-load" type="text" placeholder="+10kg / BW" />
        </label>
      `;

    case "intervals":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Work</span>
            <input id="dynamic-work" type="text" placeholder="1 rep" />
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="30 sec" />
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Rounds</span>
            <input id="dynamic-rounds" type="number" placeholder="20" />
          </label>

          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="28kg" />
          </label>
        </div>
      `;

    default:
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="80kg" />
          </label>

          <label class="form-field">
            <span>Reps</span>
            <input id="dynamic-reps" type="text" placeholder="8" />
          </label>
        </div>
      `;
  }
}
