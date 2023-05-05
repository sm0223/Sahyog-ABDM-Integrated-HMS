package com.sahyog.backend.repo;

import com.sahyog.backend.entities.Appointment;
import com.sahyog.backend.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.print.Doc;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    public List<Appointment> findAppointmentsByDoctorAndDate(Doctor doctor, String date);
    public List<Appointment> findAppointmentsByDoctor(Doctor doctor);
}
