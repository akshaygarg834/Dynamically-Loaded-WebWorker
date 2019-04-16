export default () => {
  console.log("worker is initailzed", { self });
  self.onmessage = message => {
    postMessage("maa chida");
    console.log({ message });
  };
};
