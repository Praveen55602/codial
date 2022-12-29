// controller will contain different actions

module.exports.home = (req, res) => {
  return res.render("home", {
    title: "home",
  });
};

module.exports.login = (req, res) => {
  return res.render("login");
};
