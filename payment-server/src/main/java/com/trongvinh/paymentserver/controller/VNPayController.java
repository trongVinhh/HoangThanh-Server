package com.trongvinh.paymentserver.controller;

import com.trongvinh.paymentserver.config.vnpay.VNPayService;
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

    public VNPayController(VNPayService vnPayService) {
        this.vnPayService = vnPayService;
    }

    @PostMapping("/submitOrder")
    public String submitOrder(@RequestParam("amount") int orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              HttpServletRequest request){
        System.out.println(orderTotal - 1);
        System.out.println(orderInfo);
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        System.out.println(vnpayUrl);
        return "redirect:" + vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public JSONObject GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        JSONObject paymentInfo = new JSONObject();
        paymentInfo.put("orderId", orderInfo);
        paymentInfo.put("totalPrice", totalPrice);
        paymentInfo.put("paymentTime", paymentTime);
        paymentInfo.put("transactionId", transactionId);

        return paymentInfo;
    }
}
