package com.hms.controller;
import com.hms.sevice.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;  // Use java.util.Optional

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hms.exception.*;
// Correct the package name
import com.hms.entity.*;  // Ensure all necessary entities are imported

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private RoomService roomService;  // Added RoomService to handle room assignment

    // Endpoint to get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Endpoint to get a student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to add a new student
    @PostMapping
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding student: " + e.getMessage());
        }
    }

    // Endpoint to assign a student to a room
    @PutMapping("/{studentId}/assign-room/{roomId}")
    public ResponseEntity<String> assignStudentToRoom(
            @PathVariable Long studentId,
            @PathVariable Long roomId) {
        try {
            // Ensure student and room exist
            Student student = studentService.getStudentById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

            Room room = roomService.getRoomById(roomId)
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

            // Assign the room to the student
            student.setRoom(room);
            studentService.saveStudent(student);

            // Update the room occupancy
            room.setOccupied(room.getOccupied() + 1);
            roomService.saveRoom(room);

            return ResponseEntity.ok("Student assigned to room successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning student to room: " + e.getMessage());
        }
    }

    // Endpoint to get leave requests of a student
    @GetMapping("/{id}/leave-requests")
    public List<LeaveRequest> getLeaveRequests(@PathVariable("id") Long id) {
        Optional<Student> studentOpt = studentService.getStudentById(id);
        return studentOpt.map(leaveRequestService::getLeaveRequestsByStudent)
                         .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }
    
    
    // Endpoint to add a leave request
    @PostMapping("/{id}/leave-request")
    public ResponseEntity<String> addLeaveRequest(@PathVariable("id") Long studentId, @RequestBody LeaveRequest leaveRequest) {
        try {
            // Fetch the student by ID
            Student student = studentService.getStudentById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

            // Set the student to the leave request
            leaveRequest.setStudent(student);

            // Set default leave request status to PENDING
            leaveRequest.setStatus(LeaveStatus.PENDING);

            // Save the leave request
            leaveRequestService.createLeaveRequest(leaveRequest);

            return ResponseEntity.ok("Leave request submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding leave request: " + e.getMessage());
        }}
    


 // Endpoint to add a complaint
    @PostMapping("/{id}/complaint")
    public ResponseEntity<String> addComplaint(@PathVariable("id") Long studentId, @RequestBody Complaint complaint) {
        try {
            Student student = studentService.getStudentById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
            complaint.setStudent(student);
            complaint.setDate(new Date());
            complaintService.createComplaint(complaint);
            return ResponseEntity.ok("Complaint submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding complaint: " + e.getMessage());
        }
    }

 // Endpoint to get complaints of a student
    @GetMapping("/{id}/complaints")
    public List<Complaint> getComplaints(@PathVariable("id") Long id) {
        Optional<Student> studentOpt = studentService.getStudentById(id);
        return studentOpt.map(complaintService::getComplaintsByStudent)
                         .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    // Endpoint for wardens to respond to a complaint
    @PutMapping("/complaint/{complaintId}/response")
    public ResponseEntity<String> respondToComplaint(@PathVariable("complaintId") Long complaintId, @RequestBody String response) {
        try {
            Complaint updatedComplaint = complaintService.respondToComplaint(complaintId, response);
            return ResponseEntity.ok("Complaint responded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error responding to complaint: " + e.getMessage());
        }
    }


    // Endpoint to get all complaints for warden
    @GetMapping("/complaints")
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }
}
