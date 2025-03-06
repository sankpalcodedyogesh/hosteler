package com.hms.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Long> {
}
