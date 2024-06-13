package com.trongvinh.paymentserver.controller;

import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.trongvinh.paymentserver.config.vnpay.VNPayService;
import com.trongvinh.paymentserver.model.Payment;
import com.trongvinh.paymentserver.model.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VNPayController {
    @Autowired
    private final VNPayService vnPayService;

    @Autowired
    private final PaymentService paymentService;

    public VNPayController(VNPayService vnPayService, PaymentService paymentService) {
        this.vnPayService = vnPayService;
        this.paymentService = paymentService;
    }

    @PostMapping("/submitOrder")
    public String submitOrder(@RequestParam("amount") int orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              @RequestParam("userID") String userID,
                              HttpServletRequest request,
                              Model model){
        System.out.println(orderTotal - 1);
        System.out.println(orderInfo);
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        model.addAttribute("userID", userID);
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return "redirect:" + vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");
        String userId = model.getAttribute("userID").toString();
        String uri = "mongodb+srv://trongvinh:2905@cluster0.fucqrsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("ThangLongTourism");
            MongoCollection<Document> collection = database.getCollection("payments");
            // payment to be saved
            System.out.println(uri);
            Document doc = new Document("transactionId", transactionId)
                    .append("amount", Double.parseDouble(totalPrice))
                    .append("orderInfo", orderInfo)
                    .append("paymentTime", paymentTime)
                    .append("userId", userId);

            collection.insertOne(doc);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "success";
    }
    @GetMapping("/test")
    public String test() {
        String uri = "mongodb+srv://trongvinh:2905@cluster0.fucqrsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("ThangLongTourism");
            MongoCollection<Document> collection = database.getCollection("payments");
            // payment to be saved
            Document doc = new Document("transactionId", "1111")
                    .append("amount", Double.parseDouble("100"))
                    .append("orderInfo", "test")
                    .append("paymentTime", "test");
            collection.insertOne(doc);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "test";
    }
}
