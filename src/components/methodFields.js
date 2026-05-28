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
            <input id="dynamic-reps" type="number" placeholder="3" />
          </label>
        </div>
      `;

    case "top-set-backoff":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Top Load</span>
            <input id="dynamic-topLoad" type="text" placeholder="+25kg" />
          </label>

          <label class="form-field">
            <span>Top Reps</span>
            <input id="dynamic-topReps" type="number" placeholder="3" />
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Back-Off Load</span>
            <input id="dynamic-backoffLoad" type="text" placeholder="+10kg" />
          </label>

          <label class="form-field">
            <span>Back-Off Sets</span>
            <input id="dynamic-backoffSets" type="number" placeholder="3" />
          </label>
        </div>

        <label class="form-field">
          <span>Back-Off Reps</span>
          <input id="dynamic-backoffReps" type="number" placeholder="6" />
        </label>
      `;

    case "ladder":
      return `
        <label class="form-field">
          <span>Ladder</span>
          <input id="dynamic-ladder" type="text" placeholder="1-2-3-4-5" />
        </label>

        <label class="form-field">
          <span>Rounds</span>
          <input id="dynamic-rounds" type="number" placeholder="3" />
        </label>
      `;

    case "top-set-ladder":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Top Load</span>
            <input id="dynamic-topLoad" type="text" placeholder="+25kg" />
          </label>

          <label class="form-field">
            <span>Top Reps</span>
            <input id="dynamic-topReps" type="number" placeholder="3" />
          </label>
        </div>

        <label class="form-field">
          <span>Ladder</span>
          <input id="dynamic-ladder" type="text" placeholder="1-2-3-4-5" />
        </label>

        <label class="form-field">
          <span>Rounds</span>
          <input id="dynamic-rounds" type="number" placeholder="2" />
        </label>
      `;

    case "rest-pause":
      return `
        <label class="form-field">
          <span>Segments</span>
          <input id="dynamic-segments" type="text" placeholder="10+3+2" />
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+10kg" />
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="20s" />
          </label>
        </div>
      `;

    case "cluster":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Cluster Reps</span>
            <input id="dynamic-clusterReps" type="number" placeholder="2" />
          </label>

          <label class="form-field">
            <span>Clusters</span>
            <input id="dynamic-clusters" type="number" placeholder="5" />
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="+25kg" />
          </label>

          <label class="form-field">
            <span>Rest</span>
            <input id="dynamic-rest" type="text" placeholder="20s" />
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
          </label>
        </div>

        <div class="form-grid">
          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="3" />
          </label>

          <label class="form-field">
            <span>Load</span>
            <input id="dynamic-load" type="text" placeholder="BW / +10kg" />
          </label>
        </div>
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
            <input id="dynamic-rest" type="text" placeholder="30s" />
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

    case "plyometric":
      return `
        <div class="form-grid">
          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="5" />
          </label>

          <label class="form-field">
            <span>Reps</span>
            <input id="dynamic-reps" type="number" placeholder="3" />
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
          </label>

          <label class="form-field">
            <span>Sets</span>
            <input id="dynamic-sets" type="number" placeholder="3" />
          </label>
        </div>

        <label class="form-field">
          <span>Reps</span>
          <input id="dynamic-reps" type="number" placeholder="8" />
        </label>
      `;
  }
}
