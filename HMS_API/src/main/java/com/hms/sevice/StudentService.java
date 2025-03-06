package com.hms.sevice;
import com.hms.DAO.*;
import com.hms.entity.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {


    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private StudentRepository studentRepository;

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public void assignRoomToStudent(Long studentId, Long roomId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Ensure room has capacity
        if (room.getOccupied() >= room.getCapacity()) {
            throw new RuntimeException("Room is full!");
        }

        student.setRoom(room);
        room.setOccupied(room.getOccupied() + 1); // Increase occupancy count

        studentRepository.save(student);
        roomRepository.save(room);
    }
    
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
    public void deleteStudentById(Long id) {
        // Check if student exists before deletion
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
    

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        student.setName(studentDetails.getName());
        student.setAddress(studentDetails.getAddress());
        student.setContactNumber(studentDetails.getContactNumber());
        student.setEmail(studentDetails.getEmail());
        student.setJoiningDate(studentDetails.getJoiningDate());
        student.setLeavingDate(studentDetails.getLeavingDate());
        student.setRoom(studentDetails.getRoom());

        return studentRepository.save(student);
    }
}
