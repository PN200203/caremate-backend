
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareMate Healthcare API is running"
  });
});

// 1. Appointment Management API
app.get("/getAppointmentDetails", (req, res) => {
  const { appointmentId } = req.query;

  if (!appointmentId) {
    return res.status(400).json({
      success: false,
      message: "Please provide an appointment ID."
    });
  }

  const appointments = {
    APT45021: {
      appointmentId: "APT45021",
      appointmentStatus: "CONFIRMED",
      appointmentDate: "2026-10-12",
      appointmentTime: "10:30 AM",
      providerName: "Dr. Sharma",
      appointmentType: "Consultation",
      rescheduleEligible: true,
      cancellationEligible: true
    },
    APT_RESTRICTED: {
      appointmentId: "APT_RESTRICTED",
      appointmentStatus: "CONFIRMED",
      appointmentDate: "2026-10-15",
      appointmentTime: "11:00 AM",
      providerName: "Dr. Rao",
      appointmentType: "Consultation",
      rescheduleEligible: false,
      cancellationEligible: false
    }
  };

  const appointment = appointments[appointmentId];

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found. Please check the appointment ID."
    });
  }

  return res.json(appointment);
});

// 2. Insurance Eligibility API
app.get("/checkInsuranceEligibility", (req, res) => {
  const { memberId } = req.query;

  if (!memberId) {
    return res.status(400).json({
      success: false,
      message: "Please provide a member ID."
    });
  }

  const members = {
    MEM1001: {
      memberId: "MEM1001",
      eligibilityStatus: "ACTIVE",
      payerName: "Demo Health Insurance",
      planName: "Standard Health Plan",
      effectiveDate: "2026-01-01",
      expirationDate: "2026-12-31",
      verificationStatus: "VERIFIED"
    },
    MEM_INACTIVE: {
      memberId: "MEM_INACTIVE",
      eligibilityStatus: "INACTIVE",
      payerName: "Demo Health Insurance",
      planName: "Standard Health Plan",
      effectiveDate: "2025-01-01",
      expirationDate: "2025-12-31",
      verificationStatus: "VERIFIED"
    },
    MEM_VERIFY: {
      memberId: "MEM_VERIFY",
      eligibilityStatus: "PENDING",
      payerName: "Demo Health Insurance",
      planName: "Standard Health Plan",
      effectiveDate: null,
      expirationDate: null,
      verificationStatus: "REQUIRES_VERIFICATION"
    }
  };

  const member = members[memberId];

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Insurance member not found."
    });
  }

  return res.json(member);
});

// 3. Lab Report Status API
app.get("/getLabReportStatus", (req, res) => {
  const { labReportId } = req.query;

  if (!labReportId) {
    return res.status(400).json({
      success: false,
      message: "Please provide a lab report ID."
    });
  }

  const reports = {
    LAB1001: {
      labReportId: "LAB1001",
      reportStatus: "AVAILABLE",
      testName: "Complete Blood Count",
      collectionDate: "2026-10-08",
      expectedAvailableDate: "2026-10-10",
      reportAvailable: true,
      deliveryMethod: "Patient portal",
      message: "Your lab report is available."
    },
    LAB_PROCESSING: {
      labReportId: "LAB_PROCESSING",
      reportStatus: "PROCESSING",
      testName: "Lipid Profile",
      collectionDate: "2026-10-11",
      expectedAvailableDate: "2026-10-14",
      reportAvailable: false,
      deliveryMethod: "Patient portal",
      message: "Your lab report is still processing."
    },
    LAB_DELAYED: {
      labReportId: "LAB_DELAYED",
      reportStatus: "DELAYED",
      testName: "Demo Laboratory Test",
      collectionDate: "2026-10-05",
      expectedAvailableDate: null,
      reportAvailable: false,
      deliveryMethod: "Patient portal",
      message: "Your report is delayed. A representative can assist you."
    }
  };

  const report = reports[labReportId];

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Lab report not found. Please check the report ID."
    });
  }

  return res.json(report);
});

// Start the server
app.listen(PORT, () => {
  console.log(`CareMate Healthcare API running on port ${PORT}`);
});
