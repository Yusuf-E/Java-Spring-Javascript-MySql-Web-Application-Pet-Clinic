package com.works.repositories;

import com.works.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill,String> {
    List<Bill> findByOpestatusEqualsAllIgnoreCaseOrderByDateDesc(Boolean opestatus);

    List<Bill> findByPaymenttypeEqualsOrderByDateDesc(Integer paymenttype);

    List<Bill> findByOpestatusEqualsOrderByDateDesc(Boolean opestatus);

    List<Bill> findByDateBetweenAndOpestatusEqualsAllIgnoreCaseOrderByAmountDesc(Date dateStart, Date dateEnd, Boolean opestatus);





}
