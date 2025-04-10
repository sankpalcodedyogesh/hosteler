package com.hms.DAO;
import com.hms.entity.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByEmail(String email);
}