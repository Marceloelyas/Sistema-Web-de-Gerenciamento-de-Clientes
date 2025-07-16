const Document = require('../models/Document');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

// @desc    Upload document
// @route   POST /api/documents
// @access  Private
exports.uploadDocument = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const file = req.files.file;

  // Check file type
  if (!file.mimetype.startsWith('application') && !file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload a valid file', 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a file less than ${process.env.MAX_FILE_UPLOAD / 1000000}MB`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `doc_${req.user.id}_${Date.now()}${path.parse(file.name).ext}`;

  // Upload path
  const uploadPath = `${process.env.FILE_UPLOAD_PATH}/${file.name}`;

  // Move file
  file.mv(uploadPath, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    const document = await Document.create({
      user: req.user.id,
      client: req.body.clientId,
      fileName: file.name,
      originalName: req.files.file.name,
      fileType: file.mimetype,
      fileSize: file.size,
      description: req.body.description
    });

    res.status(200).json({
      success: true,
      data: document
    });
  });
});

// @desc    Get documents for client
// @route   GET /api/clients/:clientId/documents
// @access  Private
exports.getDocuments = asyncHandler(async (req, res, next) => {
  const documents = await Document.find({ client: req.params.clientId });

  res.status(200).json({
    success: true,
    count: documents.length,
    data: documents
  });
});

// @desc    Download document
// @route   GET /api/documents/:id/download
// @access  Private
exports.downloadDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return next(new ErrorResponse('Document not found', 404));
  }

  const filePath = path.join(process.env.FILE_UPLOAD_PATH, document.fileName);

  if (!fs.existsSync(filePath)) {
    return next(new ErrorResponse('File not found', 404));
  }

  res.download(filePath, document.originalName);
});

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
exports.deleteDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return next(new ErrorResponse('Document not found', 404));
  }

  // Check ownership
  if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this document', 401));
  }

  // Delete file
  const filePath = path.join(process.env.FILE_UPLOAD_PATH, document.fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await document.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
