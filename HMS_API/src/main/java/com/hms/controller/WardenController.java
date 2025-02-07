package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.entity.LeaveRequest;
import com.hms.entity.LeaveStatus;
import com.hms.entity.Room;
import com.hms.entity.Student;
import com.hms.exception.ResourceNotFoundException;
import com.hms.sevice.LeaveRequestService;
import com.hms.sevice.RoomService;
import com.hms.sevice.StudentService;

@RestController
@RequestMapping("/wardens")
@CrossOrigin(origins = "http://localhost:3000")
public class WardenController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private StudentService studentService;  // Added to allow fetching students for the warden

    @PutMapping("/leave-requests/{id}")
    public ResponseEntity<LeaveRequest> updateLeaveRequestStatus(
        @PathVariable("id") Long id,
        @RequestParam("status") LeaveStatus status) {
        try {
            LeaveRequest updatedLeaveRequest = leaveRequestService.updateLeaveRequestStatus(id, status);
            return ResponseEntity.ok(updatedLeaveRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/leave-requests")
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }
    // Endpoint to add a new room
    @PostMapping(path = "/addroom", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        Room newRoom = roomService.saveRoom(room);
        return ResponseEntity.ok(newRoom);
    }

    // Endpoint to get all rooms
    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PutMapping("/students/{studentId}/assign-room/{roomId}")
    public ResponseEntity<String> assignStudentToRoom(
            @PathVariable("studentId") Long studentId,
            @PathVariable("roomId") Long roomId) {
        try {
            // Fetch student by ID
            Student student = studentService.getStudentById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

            // Fetch room by ID
            Room room = roomService.getRoomById(roomId)
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

            // Assign the room to the student
            student.setRoom(room);
            studentService.saveStudent(student);

            // Update room occupancy
            room.setOccupied(room.getOccupied() + 1);
            roomService.saveRoom(room);

            return ResponseEntity.ok("Student assigned to room successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning student to room: " + e.getMessage());
        }
    }

    @GetMapping("/students/{studentId}/leave-requests")
    public List<LeaveRequest> getLeaveRequestsByStudent(@PathVariable("studentId") Long studentId) {
        Student student = studentService.getStudentById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return leaveRequestService.getLeaveRequestsByStudent(student);
    }

    
    @PostMapping(path = "/add-student", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student newStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(newStudent);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
        try {
            studentService.deleteStudentById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable("id") Long id, @RequestBody Student studentDetails) {
        try {
            Student updatedStudent = studentService.updateStudent(id, studentDetails);
            return ResponseEntity.ok(updatedStudent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    
    }
}
