package com.hms.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.Bus;
import com.hms.entity.FoodMenu;
import com.hms.sevice.BusService;
import com.hms.sevice.FoodMenuService;

import java.util.List;
@RestController
@RequestMapping("/services")
public class ServicesController {
    @Autowired
    private BusService busService;

    @Autowired
    private FoodMenuService foodMenuService;

    // Bus endpoints
    @GetMapping("/buses")
    public List<Bus> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/buses/{id}")
    public Bus getBusById(@PathVariable("id") Long id) {
        return busService.getBusById(id);
    }
    @PostMapping("/buses")
    public Bus createBus(@RequestBody Bus bus) {
        return busService.saveBus(bus);
    }

    @PutMapping("/buses/{id}")
    public ResponseEntity<?> updateBus(@PathVariable("id") Long id, @RequestBody Bus bus) {
        try {
            bus.setId(id);
            Bus updatedBus = busService.saveBus(bus);
            return ResponseEntity.ok(updatedBus);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating bus: " + e.getMessage());
        }
    }
    @DeleteMapping("/buses/{id}")
    public ResponseEntity<?> deleteBus(@PathVariable("id") Long id) {
        try {
            busService.deleteBus(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bus: " + e.getMessage());
        }
    }

    // Food Menu endpoints
    @GetMapping("/food-menus")
    public List<FoodMenu> getAllFoodMenus() {
        return foodMenuService.getAllFoodMenus();
    }

    @GetMapping("/food-menus/{id}")
    public FoodMenu getFoodMenuById(@PathVariable("id") Long id) {
        return foodMenuService.getFoodMenuById(id);
    }

    @PostMapping("/food-menus")
    public FoodMenu createFoodMenu(@RequestBody FoodMenu foodMenu) {
        return foodMenuService.saveFoodMenu(foodMenu);
    }

    @PutMapping("/food-menus/{id}")
    public ResponseEntity<?> updateFoodMenu(@PathVariable("id") Long id, @RequestBody FoodMenu foodMenu) {
        try {
            FoodMenu updatedMenu = foodMenuService.updateFoodMenu(id, foodMenu);
            return ResponseEntity.ok(updatedMenu);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating food menu: " + e.getMessage());
        }
    }

    @DeleteMapping("/food-menus/{id}")
    public ResponseEntity<?> deleteFoodMenu(@PathVariable("id") Long id) {
        try {
            foodMenuService.deleteFoodMenu(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting food menu: " + e.getMessage());
        }
    }
}
