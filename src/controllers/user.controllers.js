const catchError = require("../utils/catchError");
const User = require("../models/User");

const getAll = catchError(async (req, res) => {
    const users = await User.findAll()
  return res.json(users);
});

const create = catchError(async (req, res) => {
  const user = req.body;
  const newUser = await User.create(user)
  console.log(req.body);
  return res.status(201).json(newUser)
});

const getOne = catchError(async (req, res)=>{
    const {id} = req.params
    const user = await User.findByPk(id)

    if(!user) return res.sendStatus(404)

    return res.json(user)
})

const remove  = catchError(async(req, res) =>{
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
})

const update = catchError(async(req, res)=>{
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
}
)

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
};
