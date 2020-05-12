const resizer = require("node-image-resizer");
module.exports = (height, width, filePath) => {
  const setup = {
    all: {
      path: "./public/upload/",
    },
    versions: [
      {
        prefix: height + width,
        width: parseInt(width),
        height: parseInt(height),
      },
    ],
  };
  (async () => {
    await resizer(filePath, setup);
  })();
};
