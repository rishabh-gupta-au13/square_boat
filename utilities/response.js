

const clientError = (req, res, error) => {
  let response = {
    status: 400,
    error: error
  };
  return res.send(response);
};

const serverError = (req, res, error) => {

  let response = {
    status: 500,
    error:error
  };
  return res.send(response);
};

const reply = (req, res, data) => {

  let response = {
    status: 200,
    result: data
  }
  return res.send(response);
};

module.exports = {
  clientError,
  serverError,
  reply,
}
