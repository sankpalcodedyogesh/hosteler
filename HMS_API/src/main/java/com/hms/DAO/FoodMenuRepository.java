package com.hms.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entity.FoodMenu;

public interface FoodMenuRepository extends JpaRepository<FoodMenu, Long> {
}
