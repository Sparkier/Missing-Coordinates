<script lang="ts">
  import { PC, DrawConfiguration } from "missing-coordinates";
  import type { Data } from "missing-coordinates/src";
  import githubImage from "./GitHub.png";

  export let drawConfiguration: DrawConfiguration;
  export let data: Data;

  $: axes = data.axes.map((axis) => axis.name);
  $: removalAmounts = new Map(axes.map((axis) => [axis, 0]));
  $: manipulatedData = {
    name: data.name,
    axes: data.axes.map((axis) => {
      const indexArray = [...Array(axis.data.length).keys()];
      const removalFraction = removalAmounts.get(axis.name);
      if (removalFraction !== undefined) {
        const numToRemove = axis.data.length * (removalFraction / 100);
        const shuffled = indexArray.sort(() => 0.5 - Math.random());
        const indicesToRemove = shuffled.slice(0, numToRemove);
        const removalData = [...axis.data];
        indicesToRemove.forEach((index) => (removalData[index] = null));
        return { name: axis.name, data: removalData };
      }
      return { name: axis.name, data: axis.data };
    }),
  };

  function changeRemovalAmount(e: CustomEvent, axis: string) {
    removalAmounts = removalAmounts.set(
      axis,
      +(e.currentTarget as HTMLInputElement).value
    );
  }
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
      <PC data={manipulatedData} {drawConfiguration} />
    </div>
  </div>
  <div class="content p-t">
    <div class="header">Remove Data</div>
    {#each [...removalAmounts] as removalAmount}
      <div class="row-content p-bt">
        {removalAmount[0]}
        <div class="p-l">
          <input
            type="range"
            min="0"
            max="100"
            value={removalAmount[1]}
            on:change={(e) => changeRemovalAmount(e, removalAmount[0])}
          />
        </div>
        <div class="p-l">
          {`${removalAmount[1]}%`}
        </div>
      </div>
    {/each}
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
  .p-bt {
    padding-bottom: 0.5em;
    padding-top: 0.5em;
  }
  .p-t {
    padding-top: 1em;
  }
  .p-l {
    padding-left: 0.5em;
  }
  .header {
    font-size: 2em;
  }
</style>
