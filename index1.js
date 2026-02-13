const express = require("express");

const cg = [
  {
    studentName: "ABDUL HAQUE",
    University: "SUxCG 714",
    UniversityUID: "108444",
  },
  {
    studentName: "ADITYA KUMAR",
    University: "SUxCG 702",
    UniversityUID: "108716",
  },
  {
    studentName: "AMAN KUMAR",
    University: "SUxCG 702",
    UniversityUID: "108500",
  },
  {
    studentName: "AMRIT RAJ",
    University: "SUxCG 702",
    UniversityUID: "108587",
  },
];

const app = express();

/* Home route */
app.get("/", (req, res) => {
  res.send("Express server is running");
});

/* Get all students */
app.get("/cg", (req, res) => {
  res.status(200).json(cg);
});

/* Get only student names */
app.get("/cg/students", (req, res) => {
  const names = cg.map(student => student.studentName);
  res.status(200).json(names);
});

/* ✅ Get student by GR number (UniversityUID) */
app.get("/cg/students/:gr_number", (req, res) => {
  const { gr_number } = req.params;

  const student = cg.find(
    s => s.UniversityUID === gr_number
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
