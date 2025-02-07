package com.hms.sevice;
import com.hms.sevice.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.DAO.RoomRepository;
import com.hms.entity.Room;
import com.hms.entity.Student;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }
    
    // Method to get room by ID
    public Optional<Room> getRoomById(Long roomId) {
        return roomRepository.findById(roomId);  // Return the room if found, else Optional.empty()
    }
    
}