
const express = require("express");
const app = express();
app.use(express.json());

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
  {
    studentName: "ANISHA CHHAJER",
    University: "SUxCG 714",
    UniversityUID: "108565",
  },
  {
    studentName: "PRASHANT PARMAR",
    University: "SUxCG 714",
    UniversityUID: "108697",
  },
  {
    studentName: "PRITESH BACHHAV",
    University: "SUxCG 714",
    UniversityUID: "108654",
  },
  {
    studentName: "RISHI BHAII",
    University: "SUxCG 714",
    UniversityUID: "108657",
  },
  {
    studentName: "ANSHUUUU",
    University: "SUxCG 714",
    UniversityUID: "108254",
  },
];

app.get("/", (req, res) => {
  res.send("Express server is running");
});

app.get("/cg", (req, res) => {
  res.status(200).json(cg);
});

app.get("/cg/students", (req, res) => {
  const names = cg.map((student) => student.studentName);
  res.status(200).json(names);
});

app.post("/cg", (req, res) => {
  const newUsers = [];

  req.body.forEach((student, index) => {
    const newUser = {
      id: cg.length + index + 1,
      studentName: student.studentName,
      University: student.University,
      UniversityUID: student.UniversityUID,
    };

    cg.push(newUser);
    newUsers.push(newUser);
  });

  res.status(201).json({
    message: "Students added successfully",
    users: newUsers,
  });
});

app.get("/cg/students/:gr_number", (req, res) => {
  const { gr_number } = req.params;

  const student = cg.find(
    (s) => s.UniversityUID === gr_number
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
});

app.get("/cg/students/name/:studentName", (req, res) => {
  const { studentName } = req.params;

  const student = cg.find((s) => s.studentName.toLowerCase() === studentName.toLowerCase());

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
