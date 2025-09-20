package com.example.demo.repository;

import com.example.demo.entity.LocationShare;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocationShareRepository extends JpaRepository<LocationShare, Long> {
    List<LocationShare> findAllByOrderBySharedAtDesc();
}
