package com.trongvinh.paymentserver.model;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface PaymentRepository extends MongoRepository<Payment, String> {
}
