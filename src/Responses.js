const respondJSON = (req, res, types, status, object) => {
  const type = types[0];
  const headers = {
    'Content-type': type,
  };
  res.writeHead(status, headers);

  if (type === 'application/json') {
    res.write(JSON.stringify(object));
  } else if (type === 'text/xml') {
    // convert to XML
    let xmlRes = '<response>';
    if (object.message) { xmlRes += `<message>${object.message}</message>`; }
    if (object.id) { xmlRes += `<id>${object.id}</id>`; }
    xmlRes += '</response>';
    res.write(xmlRes);
  }

  res.end();
};

const success = (req, res, types) => {
  const json = {
    message: 'This is a successful response',
  };
  return respondJSON(req, res, types, 200, json);
};

const badRequest = (req, res, types, params) => {
  const json = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    json.message = 'Missing valid query parameter set equal to true';
    json.id = 'badRequest';

    return respondJSON(req, res, types, 400, json);
  }

  return respondJSON(req, res, types, 200, json);
};

const unauthorized = (req, res, types, params) => {
  const json = {
    message: 'You have successfully viewed the content.',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    json.message = 'Missing valid query parameter set equal to yes';
    json.id = 'unauthorized';

    return respondJSON(req, res, types, 401, json);
  }

  return respondJSON(req, res, types, 200, json);
};

const forbidden = (req, res, types) => {
  const json = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return respondJSON(req, res, types, 403, json);
};

const internal = (req, res, types) => {
  const json = {
    message: 'Internal Server Error . Something went wrong.',
    id: 'internalError',
  };
  return respondJSON(req, res, types, 500, json);
};

const notImplemented = (req, res, types) => {
  const json = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respondJSON(req, res, types, 501, json);
};

const notFound = (req, res, types) => {
  const json = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respondJSON(req, res, types, 404, json);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
