package com.predicto.auth.repository;

import com.predicto.auth.entity.Project;
import com.predicto.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);

    List<Project> findByUserId(Long userId);

    List<Project> findByUserAndStatus(User user, String status);

    List<Project> findByStatus(String status);
}
