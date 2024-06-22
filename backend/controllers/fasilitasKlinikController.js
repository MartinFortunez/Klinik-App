// const Fasilitas = require("../models/Fasilitas");

// // exports.getAllFasilitas = (req, res) => {
// //   Fasilitas.getAll((err, results) => {
// //     if (err) {
// //       res.status(500).json({ error: 'Internal server error' });
// //       return;
// //     }
// //     res.status(200).json(results);
// //   });
// // };

// exports.getAllFasilitas = (req, res) => {
//   Fasilitas.getAll((err, results) => {
//     if (err) {
//       // Log the error for server-side debugging (optional)
//       console.error("Error fetching data from Fasilitas:", err);

//       // Send a detailed error response
//       res.status(500).json({
//         error: "Internal Server Error",
//         message: "An error occurred while fetching the data from the database.",
//         details: err.message,
//         suggestion:
//           "Please check the server logs for more details and ensure the database is accessible.",
//       });
//       return;
//     }
//     res.status(200).json(results);
//   });
// };

// exports.addFasilitas = (req, res) => {
//   const { judul, deskripsi } = req.body;
//   const foto_fasilitas = req.file ? req.file.buffer : null;
//   const newFasilitas = { judul, deskripsi, foto_fasilitas };

//   Fasilitas.create(newFasilitas, (err) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to add facility" });
//       return;
//     }
//     // res.redirect("/dashboard/fasilitas");
//     res.status(200).json({ message: "Facility add successfully" });
//   });
// };

// exports.getFasilitasById = (req, res) => {
//   const { id } = req.params;

//   Fasilitas.getById(id, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     if (!result) {
//       res.status(404).json({ error: "Facility not found" });
//       return;
//     }
//     res.status(200).json(result);
//   });
// };

// exports.editFasilitas = (req, res) => {
//   const { id } = req.params;
//   const { judul, deskripsi } = req.body;
//   const foto_fasilitas = req.file ? req.file.buffer : null;
//   const updatedFasilitas = { judul, deskripsi, foto_fasilitas };

//   Fasilitas.update(id, updatedFasilitas, (err) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to update facility" });
//       return;
//     }
//     // res.redirect("/dashboard/fasilitas");
//     res.status(200).json({ message: "facility updated successfully" });
//   });
// };

// exports.deleteFasilitas = (req, res) => {
//   const { id } = req.params;

//   Fasilitas.delete(id, (err) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to delete facility" });
//       return;
//     }
//     // res.redirect("/dashboard/fasilitas");
//     res.status(200).json({ message: "Facility deleted successfully" });
//   });
// };

const Fasilitas = require("../models/Fasilitas");

// Get all Fasilitas
exports.getAllFasilitas = async (req, res) => {
  try {
    const results = await Fasilitas.findAll({
      attributes: ["fasilitas_id", "judul", "deskripsi", "foto_fasilitas"],
    });
    results.forEach((result) => {
      if (result.foto_fasilitas) {
        result.foto_fasilitas = result.foto_fasilitas.toString("base64");
      }
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      suggestion:
        "Please check the server logs for more details and ensure the database is accessible.",
    });
  }
};

// Get Fasilitas by ID
exports.getFasilitasById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Fasilitas.findByPk(id);
    if (result && result.foto_fasilitas) {
      result.foto_fasilitas = result.foto_fasilitas.toString("base64");
    }
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Facility not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      suggestion:
        "Please check the server logs for more details and ensure the database is accessible.",
    });
  }
};

// Add new Fasilitas
exports.addFasilitas = async (req, res) => {
  const { judul, deskripsi } = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const newFasilitas = { judul, deskripsi, foto_fasilitas };

  try {
    const fasilitas = await Fasilitas.create(newFasilitas);
    res.status(201).json({ message: "Facility added successfully", fasilitas });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add facility",
      message: err.message,
    });
  }
};

// Edit Fasilitas
exports.editFasilitas = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi } = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const updatedFasilitas = { judul, deskripsi, foto_fasilitas };

  try {
    await Fasilitas.update(updatedFasilitas, {
      where: { fasilitas_id: id },
    });
    const fasilitas = await Fasilitas.findByPk(id);
    res
      .status(200)
      .json({ message: "Facility updated successfully", fasilitas });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update facility",
      message: err.message,
    });
  }
};

// Delete Fasilitas
exports.deleteFasilitas = async (req, res) => {
  const { id } = req.params;

  try {
    await Fasilitas.destroy({
      where: { fasilitas_id: id },
    });
    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete facility",
      message: err.message,
    });
  }
};
