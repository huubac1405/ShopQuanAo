const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Lấy token từ header đúng
        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Cắt bỏ "Bearer "
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token không hợp lệ", status: "ERROR" });
            }

            console.log("Decoded Token:", decoded); // Kiểm tra dữ liệu token
            if (decoded?.isAdmin) {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập", status: "ERROR" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", status: "ERROR" });
    }
};

const authUserMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const userId = req.params.id; // Lấy id từ request

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token không hợp lệ", status: "ERROR" });
            }

            console.log("Decoded Token:", decoded);
            if (decoded?.isAdmin || decoded.id === userId) {
                next();
            } else {
                return res.status(403).json({ message: "Bạn không có quyền truy cập", status: "ERROR" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", status: "ERROR" });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};
