const mainController = {
  indexAction: (req, res) => {
    res.sendFile('/integration/index.html', {
      root: __dirname + '/../..'
    });
  }
}

module.exports = mainController;