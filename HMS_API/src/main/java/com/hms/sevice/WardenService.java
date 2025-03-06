package com.hms.sevice;
import com.hms.entity.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.DAO.WardenRepository;

@Service
public class WardenService {

    @Autowired
    private WardenRepository wardenRepository;

    // Get all Wardens
    public List<Warden> getAllWardens() {
        return wardenRepository.findAll();
    }

    // You can add other Warden-related methods as needed (e.g., assigning students, managing rooms, etc.)
}
