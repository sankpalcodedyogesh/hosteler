import React from 'react';

const LeaveRequestItem = ({ leaveRequest, updateLeaveRequestStatus }) => {
    return (
        <li className="leave-request-item">
            <p>Student ID: {leaveRequest.student ? leaveRequest.student.id : 'N/A'}</p>
            <p>Student Name: {leaveRequest.student ? leaveRequest.student.name : 'N/A'}</p>
            <p>Reason: {leaveRequest.reason}</p>
            <p>Start Date: {leaveRequest.startDate}</p>
            <p>End Date: {leaveRequest.endDate}</p>
            <p>Status: {leaveRequest.status}</p>
            <button onClick={() => updateLeaveRequestStatus(leaveRequest.id, 'APPROVED')}>Approve</button>
            <button onClick={() => updateLeaveRequestStatus(leaveRequest.id, 'REJECTED')}>Reject</button>
        </li>
    );
};

export default LeaveRequestItem;
