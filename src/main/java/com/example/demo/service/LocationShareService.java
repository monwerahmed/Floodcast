package com.example.demo.service;

import com.example.demo.entity.LocationShare;
import com.example.demo.repository.LocationShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocationShareService {

    @Autowired
    private LocationShareRepository locationShareRepository;

    public LocationShare saveLocation(LocationShare location) {
        return locationShareRepository.save(location);
    }

    public List<LocationShare> getAllLocations() {
        return locationShareRepository.findAll();
    }
}
