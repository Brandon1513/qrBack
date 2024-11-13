const QRModel = require("../models/QR");

exports.saveQR = async (req, res) => {
  try {
    // Eliminar campos vacíos del cuerpo de la solicitud
    const filteredData = {};
    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key].toString().trim() !== ""
      ) {
        filteredData[key] = req.body[key].toString().trim();
      }
    });

    // Crear una nueva instancia con los datos filtrados
    const qrData = new QRModel(filteredData);

    // Guardar en la base de datos
    await qrData.save();
    res.status(200).send("Datos guardados correctamente.");
  } catch (error) {
    res.status(500).send("Error al guardar los datos: " + error.message);
  }
};

exports.getQrData = async (req, res) => {
  try {
    const qrDataList = await QRModel.find(); // Obtiene todos los documentos
    res.json(qrDataList); // Devuelve la lista en formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un QR por su ID
exports.deleteQR = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    const result = await QRModel.findByIdAndDelete(id); // Buscar y eliminar el documento

    if (!result) {
      return res.status(404).json({ message: "QR no encontrado" });
    }

    res.status(200).json({ message: "QR eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el QR", error });
  }
};

exports.updateQR = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL
    const filteredData = {};

    // Filtrar los datos para evitar campos vacíos
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && req.body[key].trim() !== "") {
        filteredData[key] = req.body[key].trim();
      }
    });

    // Actualizar el QR en la base de datos
    const updatedQR = await QRModel.findByIdAndUpdate(id, filteredData, {
      new: true,
    });

    if (!updatedQR) {
      return res.status(404).json({ message: "QR no encontrado" });
    }

    res.status(200).json(updatedQR); // Enviar el QR actualizado como respuesta
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el QR", error: error.message });
  }
};

exports.updateImpreso = async (req, res) => {
  const { id } = req.params;
  const { impreso } = req.body; // Recibe el nuevo estado desde el cuerpo de la petición

  try {
    // Encuentra el activo por su ID y actualiza el valor del checkbox
    const updatedActivo = await QRModel.findByIdAndUpdate(
      id,
      { impreso },
      { new: true }
    );

    if (!updatedActivo) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    res.json(updatedActivo);
  } catch (error) {
    console.error("Error al actualizar el checkbox:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
