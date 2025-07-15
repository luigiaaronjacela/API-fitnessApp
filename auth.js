const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY="fitnessApp"

//[SECTION] Token Creation


module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, JWT_SECRET_KEY, {});
}

//[SECTION] Token Verification

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(401).json({ auth: "Failed. No Token" });
  } else {
    // ✅ Clean token
    token = token.replace("Bearer ", "");

    // 🔐 Verify token
    jwt.verify(token, JWT_SECRET_KEY, function (err, decodedToken) {
      if (err) {
        return res.status(401).json({
          auth: "Failed",
          message: err.message,
        });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  }
};


//[SECTION] Verify Admin

// module.exports.verifyAdmin = (req, res, next) => {
//     if(req.user.isAdmin) {
//         next();
//     } else {
//         return res.status(403).send({
//             auth: "Failed",
//             message: "Action Forbidden"
//         })
//     }
// }


// [SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err);

    //Add status code 500
    const statusCode = err.status || 500;
    // if the error object contains a message property, we use it as the error message; otherwise, we default to 'Internal Server Error'.
    // || -> It ensures that default values are used in such cases, providing a fallback mechanism for error handling.
    const errorMessage = err.message || 'Internal Server Error';

    // Send a standardized error response
    //We construct a standardized error response JSON object with the appropriate error message, status code, error code, and any additional details provided in the error object.
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details
        }
    });
};

// Middleware to check if the user is authenticated:
module.exports.isLoggedIn = (req, res, next) =>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
}
