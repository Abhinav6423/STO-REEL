import xss from "xss";
export const xssSanitizer = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = xss(req.body[key]);
            }
        }
    }

    next();
}

/* Prevent malicious HTML or JavaScript code
 * (like <script> tags) from being injected
 * into your app through user input.
*/
