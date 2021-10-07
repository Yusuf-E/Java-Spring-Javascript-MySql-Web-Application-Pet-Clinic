package com.works.properties;

import lombok.Data;

import java.util.List;

@Data
public class CustomerPetsInlayer {


    private CustomerLayer cus;
    private List<PetLayer> pets;
}
