package com.hms.sevice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.DAO.LeaveRequestRepository;
import com.hms.entity.LeaveRequest;
import com.hms.entity.LeaveStatus;
import com.hms.entity.Student;
import com.hms.exception.ResourceNotFoundException;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        leaveRequest.setStatus(LeaveStatus.PENDING);  // Set default status to PENDING
        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest updateLeaveRequestStatus(Long id, LeaveStatus status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));
        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeaveRequestsByStudent(Student student) {
        return leaveRequestRepository.findByStudent(student);
    }

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }
}
