// TODO: 컨트롤러 코드
const models = require("../models"); // ../models/index.js

exports.index = (req, res) => {
  res.render("index");
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.signin = (req, res) => {
  res.render("signin");
};

exports.post_signup = (req, res) => {
  // User.post_signup(req.body, () => {
  //   res.send(true); // 회원가입 성공
  // });

  models.User.create({
    userid: req.body.userid,
    name: req.body.name,
    pw: req.body.pw,
  }).then((result) => {
    console.log("create >> ", result);
    res.send(true);
  });
};

exports.post_signin = (req, res) => {
  // User.post_signin(req.body, (result) => {
  //   console.log("Controller post_signin: ", result);

  //   if (result.length > 0) {
  //     // 유저 조회 o -> 로그인 성공 -> [ {} ]
  //     res.send(true);
  //   } else {
  //     // 유저 조회 x -> 로그인 실패 -> []
  //     res.send(false);
  //   }
  // });
  models.User.findOne({
    where: {
      userid: req.body.userid,
      pw: req.body.pw,
    },
  }).then((result) => {
    console.log("post_signin findOne >> ", result);
    if (!result) {
      // 유저 조회 o -> 로그인 성공 -> [ {} ]
      res.send(false);
    } else {
      // 유저 조회 x -> 로그인 실패 -> []
      res.send(true);
    }
  });
};

exports.post_profile = (req, res) => {
  // console.log(req.body)

  // User.post_profile(req.body.userid, (result) => {
  //   console.log(result); // [ {} ]

  //   if (result.length > 0) {
  //     res.render("profile", { data: result[0] });
  //   }
  //   // else 절 추가 xxxxx
  //   // POST /user/profile
  //   // 로그인이 성공되어야만 수행하는 요청
  // });
  models.User.findOne({
    where: { userid: req.body.userid },
  }).then((result) => {
    console.log("post_profilefindOne >> ", result);

    res.render("profile", { data: result });
  });
};

exports.edit_profile = (req, res) => {
  // User.edit_profile(req.body, () => {
  //   res.send("회원정보 수정 성공!");
  // });
  models.User.update(
    {
      userid: req.body.userid,
      name: req.body.name,
      pw: req.body.pw,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then((result) => {
    console.log("update >> ", result);
    res.send("수정 성공!!!");
  });
};

exports.delete_profile = (req, res) => {
  // User.delete_profile(req.body.id, () => {
  //   res.send("회원 탈퇴 성공");
  // });
  models.User.destroy({
    where: { id: req.body.id },
  }).then((result) => {
    console.log("destroy >> ", result);
    res.send("회원 탈퇴 성공!!!!");
  });
};
