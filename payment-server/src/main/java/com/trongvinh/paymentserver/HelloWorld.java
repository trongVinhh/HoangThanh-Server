package com.trongvinh.paymentserver;

// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class HelloWorld {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int size = nums1.length + nums2.length;
        int res[] = new int[size];
        int size1 = nums1.length;
        int size2 = nums2.length;
        int id = 0;
        int i1 = 0;
        int i2 = 0;
        while (i1 < size1 && i2 < size2) {
            if (nums1[i1] < nums2[i2]) {
                res[id++] = nums1[i1++];
            } else {
                res[id++] = nums2[i2++];
            }
        }
        return 0;
    }

    public static int removeElement(int[] nums, int val) {
        int id = 0;
        for (int i = 0; i < nums.length ; i++) {
            if (nums[i] != val) {
                nums[id] = nums[i];
                id++;
            }
        }
        System.out.println(nums.length);
        return id;
    }

    public static void main(String[] args) {
        int[] arr1 = {1,2,3,5};
        int[] arr2 = {4,6};
//        System.out.println(findMedianSortedArrays(arr1, arr2));
        System.out.println(removeElement(arr1, 3));
    }
}