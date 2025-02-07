package com.hms.sevice;



import com.hms.DAO.FoodMenuRepository;
import com.hms.entity.FoodMenu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodMenuService {

    @Autowired
    private FoodMenuRepository foodMenuRepository;

    public List<FoodMenu> getAllFoodMenus() {
        return foodMenuRepository.findAll();
    }

    public FoodMenu getFoodMenuById(Long id) {
        Optional<FoodMenu> foodMenu = foodMenuRepository.findById(id);
        return foodMenu.orElseThrow(() -> new RuntimeException("Food menu not found"));
    }

    public FoodMenu saveFoodMenu(FoodMenu foodMenu) {
        return foodMenuRepository.save(foodMenu);
    }

    public FoodMenu updateFoodMenu(Long id, FoodMenu foodMenu) {
        Optional<FoodMenu> existingMenu = foodMenuRepository.findById(id);
        if (existingMenu.isPresent()) {
            FoodMenu menu = existingMenu.get();
            menu.setDayOfWeek(foodMenu.getDayOfWeek());
            menu.setBreakfast(foodMenu.getBreakfast());
            menu.setLunch(foodMenu.getLunch());
            menu.setDinner(foodMenu.getDinner());
            return foodMenuRepository.save(menu);
        } else {
            throw new RuntimeException("Food menu not found");
        }
    }

    public void deleteFoodMenu(Long id) {
        foodMenuRepository.deleteById(id);
    }

}
