// backend/controllers/dashboardController.js
export const getDashboard = (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
    userId: req.user.id,   // coming from JWT
    role: req.user.role,   // optional
  });
};
