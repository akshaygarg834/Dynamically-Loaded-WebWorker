import "./styles.css";
import Worker1 from "./Worcker1";
document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

function createWorker(fn) {
  var blob = new Blob([`(${fn.toString()})()`], {
    type: "text/javascript"
  });
  var url = URL.createObjectURL(blob);

  return new Worker(url);
}

let worker = undefined;

import("./Worcker1").then(data => {
  worker = createWorker(Worker1, {
    type: "module"
  });

  worker.onmessage = message => {
    console.log({ parentmessage: message });
  };

  worker.postMessage(1);
});

window.addEventListener("unload", () => {
  console.log("Unloading Start");
  worker.terminate();
  worker = undefined;
});
