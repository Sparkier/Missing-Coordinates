<script lang="ts">
  import { PC, DrawConfiguration } from "missing-coordinates";
import type { Data } from "missing-coordinates/src";
  import githubImage from "./GitHub.png";

  export let drawConfiguration: DrawConfiguration;
  export let data: Data;
</script>

<main class="content">
  <div class="head">
    <div class="row-content">
      <h3>Missing Coordinate Default View</h3>
    </div>
    <button
      class="github-button"
      on:click={() =>
        window.open("https://github.com/Sparkier/Missing-Coordinates")}
    >
      <img src={githubImage} alt="github mark" />
      <div>View on GitHub</div>
    </button>
  </div>
  <div class="main-div">
    <div class="chart-div">
      <PC {data} {drawConfiguration} />
    </div>
  </div>
</main>

<style>
  .content {
    display: flex;
    flex-direction: column;
    font-family: "SF Pro Text", "Myriad Set Pro", "SF Pro Icons",
      "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .row-content {
    display: flex;
    align-items: center;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .github-button {
    display: flex;
    align-items: center;
    height: 2em;
    margin: 1em;
    padding: 0.5em;
    border: 1px solid black;
    border-radius: 5px;
  }
  .github-button:active {
    background-color: #eee;
  }
  img {
    height: 100%;
    padding-right: 0.5em;
  }
  button {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    background-color: transparent;
    text-transform: none;
    border: none;
    overflow: visible;
    -webkit-appearance: button;
  }
  button:active {
    color: inherit;
  }
  .chart-div {
    border: 1px solid black;
    display: inline-block;
  }
  .main-div {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
  }
</style>
